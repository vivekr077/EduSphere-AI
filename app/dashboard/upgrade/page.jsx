"use client"
import { db } from '@/configs/db'
import { USER_TABLE } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Upgrade = () => {

    const {user} = useUser();
    const [userDetails, setUserDetails ] = useState();

    useEffect(()=>{
        user&&GetDetails();
    },[user])
    const GetDetails = async() => {
        const result = await db.select().from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))

        setUserDetails(result[0]);
        console.log(result);
        
    }
  
    const onCheckoutClick = async()=>{
        try{
          if(!process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY){
            toast.error('Monthly price ID is not configured')
            return;
          }
          const result = await axios.post('/api/payment/checkout', {
              priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
              userEmail: user?.primaryEmailAddress?.emailAddress
          });
          window.open(result?.data?.url)
        }catch(err){
          console.error(err);
          toast.error('Unable to start monthly checkout')
        }
    }

    const onCheckoutYearlyClick = async()=>{
        try{
          if(!process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY){
            toast.error('Yearly price ID is not configured')
            return;
          }
          const result = await axios.post('/api/payment/checkout', {
              priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY,
              userEmail: user?.primaryEmailAddress?.emailAddress
          });
          window.open(result?.data?.url)
        }catch(err){
          console.error(err);
          toast.error('Unable to start yearly checkout')
        }
    }

    const onPaymentManage= async()=>{
      try {
        if (!userDetails?.customerId) {
          toast.error('No active subscription found')
          return;
        }
        
        const result = await axios.post('/api/payment/manage-payment', {
          customerId: userDetails.customerId 
        })
        
        if (result?.data?.url) {
          window.open(result.data.url)
        } else {
          toast.error('Unable to open billing portal')
        }
      } catch (error) {
        console.error('Manage payment error:', error)
        toast.error('Unable to access billing portal')
      }
    }

    // Function to handle plan selection
    const handlePlanSelection = (planType) => {
      if (userDetails?.isMember) {
        toast.error(`You already have an active subscription. Please manage your current plan instead.`)
        return;
      }
      
      if (planType === 'monthly') {
        onCheckoutClick();
      } else if (planType === 'yearly') {
        onCheckoutYearlyClick();
      }
    }

    // Function to get button text and action for each plan
    const getPlanButton = (planType) => {
      // If user is subscribed and this is their current plan, show Manage Payment
      if (userDetails?.isMember && userDetails.planType === planType) {
        return {
          text: 'Manage Payment',
          action: onPaymentManage,
          className: 'bg-blue-600 text-white hover:bg-blue-700'
        };
      }
      
      // If user is subscribed but this is NOT their current plan, show Get Started but disable it
      if (userDetails?.isMember && userDetails.planType !== planType) {
        return {
          text: 'Get Started',
          action: () => toast.error(`You currently have a ${userDetails.planType || 'Premium'} plan. Please manage your current plan instead.`),
          className: 'bg-gray-400 text-white cursor-not-allowed'
        };
      }
      
      // Default: show Get Started for free users
      return {
        text: 'Get Started',
        action: () => handlePlanSelection(planType),
        className: 'bg-blue-600 text-white hover:bg-blue-700'
      };
    };

  return (
    <div className=" flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Plans</h1>
        <p className="text-gray-600">Choose a plan: Free (5 credits), Monthly (100 credits), Yearly (Unlimited)</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-10">
        {/* Free Plan */}
        <div className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-center ${
          !userDetails?.isMember ? 'border-2 border-green-500' : ''
        }`}>
          <h2 className="text-xl font-semibold">Free</h2>
          <p className="text-4xl font-bold my-4">
            0$ <span className="text-base font-normal">/month</span>
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>&#10003; 5 PDF Upload</li>
            <li>&#10003; Unlimited Notes Taking</li>
            <li>&#10003; Email support</li>
            <li>&#10003; Help center access</li>
          </ul>
          <button className={`mt-6 w-full py-2 rounded-lg ${
            !userDetails?.isMember ? 'bg-green-500 text-white cursor-not-allowed' 
              : 'bg-gray-200 text-gray-700 cursor-not-allowed'
          }`}>
            {!userDetails?.isMember ? 'Current Plan' : 'Free Plan'}
          </button>
        </div>

        {/* Monthly Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold">Monthly</h2>
          <p className="text-4xl font-bold my-4">
            9.99$ <span className="text-base font-normal">/month</span>
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>&#10003; 100 Monthly Credits</li>
            <li>&#10003; Unlimited PDF Upload</li>
            <li>&#10003; Unlimited Notes Taking</li>
            <li>&#10003; Email support</li>
            <li>&#10003; Help center access</li>
          </ul>
          <button 
            className={`mt-6 w-full py-2 rounded-lg ${getPlanButton('monthly').className}`}
            onClick={getPlanButton('monthly').action}
          >
            {getPlanButton('monthly').text}
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center border-2 border-yellow-500">
          <h2 className="text-xl font-semibold text-yellow-600">Yearly</h2>
          <p className="text-4xl font-bold my-4 text-yellow-600">
            99.99$ <span className="text-base font-normal">/yearly</span>
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>&#10003; Unlimited Credits</li>
            <li>&#10003; Unlimited PDF Upload</li>
            <li>&#10003; Unlimited Notes Taking</li>
            <li>&#10003; Email support</li>
            <li>&#10003; Help center access</li>
          </ul>
          <button 
            className={`mt-6 w-full py-2 rounded-lg ${getPlanButton('yearly').className}`}
            onClick={getPlanButton('yearly').action}
          >
            {getPlanButton('yearly').text}
          </button>
        </div>
        {/* Current Plan Display */}
        {/* {userDetails && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-semibold text-blue-800">Current Plan</h3>
            <p className="text-blue-600">
              {userDetails.isMember ? `${userDetails.planType || 'Premium'} Plan` : 'Free Plan'}
            </p>
            {userDetails.isMember && (
              <p className="text-sm text-blue-500 mt-1">
                You have unlimited access to all features
              </p>
            )}
          </div>
        )} */}
      </div>
    </div>
  )
}

export default Upgrade