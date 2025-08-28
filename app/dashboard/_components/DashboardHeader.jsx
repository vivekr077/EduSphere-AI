"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Menu } from 'lucide-react'

const DashboardHeader = ({ onMenuClick }) => {
  const {user} = useUser();
  const route = useRouter();
  return (
    <div className='p-5 shadow-md flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <button className='md:hidden mr-2 p-2 rounded hover:bg-gray-100' onClick={onMenuClick} aria-label='Open menu'>
            <Menu className='h-5 w-5'/>
          </button>
          <div className='flex gap-2 items-center cursor-pointer' onClick={()=>route.push('/dashboard')}>
            <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
            <h2 className='font-bold text-large'>EduSphere-AI</h2>
          </div>
        </div>
        
        {user? <UserButton  className=' text-4xl'/>: <Button className=' rounded-lg' onClick={()=>{route.push('sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F')}}>Sign In</Button>}
    </div>
  )
}

export default DashboardHeader;