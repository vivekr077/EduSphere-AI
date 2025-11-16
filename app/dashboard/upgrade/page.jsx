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
    <div className="flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary dark:from-secondary dark:to-primary"> Plans & Pricing </h1>

        <p className="text-muted-foreground text-lg">Choose the perfect plan for your learning journey</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-10">
        {/* Free Plan */}
        <div className={`bg-card border-2 p-6 rounded-lg shadow-md flex flex-col items-center transition-all duration-300 ${
          !userDetails?.isMember ? 'border-gray/60 shadow-lg' : 'border-border'
        }`}>
          <h2 className="text-2xl font-bold text-foreground">Free</h2>
          <p className="text-4xl font-bold my-4 text-primary">
            $0 <span className="text-base font-normal text-muted-foreground">/month</span>
          </p>
          <ul className="space-y-3 text-muted-foreground w-full">
            <li className="flex items-center gap-2">
              <span className="font-bold">✓</span>
              <span>5 Courses Generate</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold">✓</span>
              <span>Basic Features</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold">✓</span>
              <span>Email Support</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold">✓</span>
              <span>Community Access</span>
            </li>
          </ul>
          <button className={`mt-6 w-full py-2 rounded-lg font-semibold transition-all ${
            !userDetails?.isMember ? ' bg-gray-400 text-white border-2 border-gray-300 cursor-default' 
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}>
            {!userDetails?.isMember ? '✓ Current Plan' : 'Free Plan'}
          </button>
        </div>

        {/* Monthly Plan */}
        <div className="bg-card border-2 border-primary/50 p-6 rounded-lg shadow-lg flex flex-col items-center hover:shadow-xl hover:border-primary transition-all duration-300 relative overflow-hidden">
          <span className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">POPULAR</span>
          <h2 className="text-2xl font-bold text-foreground">Monthly</h2>
          <p className="text-4xl font-bold my-4 text-primary">
            $9.99 <span className="text-base font-normal text-muted-foreground">/month</span>
          </p>
          <ul className="space-y-3 text-muted-foreground w-full">
            <li className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>100 Monthly Credits</span>
            </li>
            <li className="flex items-center gap-2">
              <span className=" text-blue-600 font-bold">✓</span>
              <span>Priority Support</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Advanced Features</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Cancel Anytime</span>
            </li>
             <li className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Customer Support</span>
            </li>
          </ul>
          <button 
            className={`mt-6 w-full py-2 rounded-lg font-semibold transition-all ${getPlanButton('monthly').className.includes('cursor-not-allowed') 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30'
            }`}
            onClick={getPlanButton('monthly').action}
          >
            {getPlanButton('monthly').text}
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="bg-card border-2 border-yellow-300 p-6 rounded-lg shadow-lg flex flex-col items-center hover:shadow-xl hover:border-yellow-500 transition-all duration-300 relative overflow-hidden">
          <span className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">BEST VALUE</span>
          <h2 className="text-2xl font-bold text-foreground">Yearly</h2>
          <p className="text-4xl font-bold my-4 text-yellow-400">
            $99.99 <span className="text-base font-normal text-muted-foreground">/yearly</span>
          </p>
          <p className="text-sm text-purple-500 font-semibold mb-3">Save 17% vs monthly</p>
          <ul className="space-y-3 text-muted-foreground w-full">
            <li className="flex items-center gap-2">
              <span className=" text-yellow-300 font-bold">✓</span>
              <span>Unlimited Credits</span>
            </li>
            <li className="flex items-center gap-2">
              <span className=" text-yellow-300 font-bold">✓</span>
              <span>24/7 Premium Support</span>
            </li>
            <li className="flex items-center gap-2">
              <span className=" text-yellow-300 font-bold">✓</span>
              <span>All Features Unlocked</span>
            </li>
            <li className="flex items-center gap-2">
              <span className=" text-yellow-300 font-bold">✓</span>
              <span>Priority Queue</span>
            </li>
          </ul>
          <button 
            className={`mt-6 w-full py-2 rounded-lg font-semibold transition-all ${getPlanButton('yearly').className.includes('cursor-not-allowed')
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-accent text-accent-foreground hover:bg-accent hover:shadow-lg hover:shadow-accent'
            }`}
            onClick={getPlanButton('yearly').action}
          >
            {getPlanButton('yearly').text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Upgrade