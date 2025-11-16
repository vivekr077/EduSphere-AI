"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Menu } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

const DashboardHeader = ({ onMenuClick }) => {
  const {user} = useUser();
  const route = useRouter();
  return (
    <div className='sticky top-0 z-50 p-5 shadow-md flex justify-between items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'>
        <div className='flex gap-2 items-center'>
          <button className='md:hidden mr-2 p-2 rounded hover:bg-secondary/50 dark:hover:bg-secondary/40 transition-colors' onClick={onMenuClick} aria-label='Open menu'>
            <Menu className='h-5 w-5'/>
          </button>
          <div className='flex gap-2 items-center cursor-pointer' onClick={()=>route.push('/dashboard')}>
            <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
            <h2 className='font-bold text-large'>EduSphere-AI</h2>
          </div>
        </div>
        <div className=' flex gap-5'>
            <ThemeToggle />
            {user? <UserButton className=' text-4xl h-48 w-8'/>: <Button className=' rounded-lg' onClick={()=>{route.push('sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F')}}>Sign In</Button>}
        </div>
    </div>
  )
}

export default DashboardHeader;