"use client"
import { db } from '@/configs/db'
import { USER_TABLE } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
        const result = await axios.post('/api/payment/checkout', {
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLT
        });
        window.open(result?.data?.url)
        console.log(result?.data);
        
    }

    const onPaymentManage= async()=>{
     const result =await axios.post('/api/payment/manage-payment', {
        customerId: userDetails?.customerId 
     })
     window.open(result?.data?.url)
     console.log(result?.data);
     
    }

  return (
    <div className=" flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Plans</h1>
        <p className="text-gray-600">Update your plan to generate unlimited courses for your exam</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-10">
        {/* Free Plan */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
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
          <button className="mt-6 w-full bg-gray-200 text-gray-700 py-2 rounded-lg cursor-not-allowed">
            Current Plan
          </button>
        </div>

        {/* Monthly Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold">Monthly</h2>
          <p className="text-4xl font-bold my-4">
            9.99$ <span className="text-base font-normal">/month</span>
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>&#10003; Unlimited PDF Upload</li>
            <li>&#10003; Unlimited Notes Taking</li>
            <li>&#10003; Email support</li>
            <li>&#10003; Help center access</li>
          </ul>
          {
            userDetails?.isMember=='FALSE' ? 
            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" onClick={onCheckoutClick}>
                Get Started
            </button>
            :
            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" onClick={onPaymentManage}>
                Manage Payment
            </button>
          }
          
        </div>

        {/* Yearly Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center border-2 border-yellow-500">
          <h2 className="text-xl font-semibold text-yellow-600">Yearly</h2>
          <p className="text-4xl font-bold my-4 text-yellow-600">
            100$ <span className="text-base font-normal">/yearly</span>
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>&#10003; Unlimited PDF Upload</li>
            <li>&#10003; Unlimited Notes Taking</li>
            <li>&#10003; Email support</li>
            <li>&#10003; Help center access</li>
          </ul>
          <button className="mt-6 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 shadow-lg transform hover:scale-105">
            Premium Plan
          </button>
        </div>
      </div>
    </div>
  )
}

export default Upgrade