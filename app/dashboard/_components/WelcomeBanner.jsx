"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const WelcomeBanner = () => {
     const { user } = useUser();
  return (
    <div className='p-5 w-full text-white rounded-lg flex items-center gap-6 bg-primary dark:bg-gray-800 shadow-lg dark:shadow-none dark:border dark:border-gray-700'>
         <Image  src={'/laptop.png'} alt='laptop' className=' hidden sm:block' width={100} height={100}/>
         <div>
             <h2 className='font-bold text-3xl max-sm:text-xl'>Hello, {user?.fullName}</h2>
             <p className='text-white/90'>Welcome Back, Its time to get back and start learning</p>
         </div>
    </div>
  )
}

export default WelcomeBanner