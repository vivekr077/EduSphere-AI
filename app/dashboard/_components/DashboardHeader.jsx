"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const DashboardHeader = () => {
  const {user} = useUser();
  const route = useRouter();
  return (
    <div className='p-5 shadow-md flex justify-between'>
        <div className='flex gap-2 items-center'>
                         <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
                         <h2 className='font-bold text-large'>EduSphere-AI</h2>
                     </div>
        
        {user? <UserButton  className=' text-4xl'/>: <Button className=' rounded-lg' onClick={()=>{route.push('sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F')}}>Sign In</Button>}
    </div>
  )
}

export default DashboardHeader;