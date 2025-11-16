"use client"
import { useContext, useEffect, useMemo, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CourseCountContext } from '@/app/_context/CourseCountContext'
import { db } from '@/configs/db'
import { USER_TABLE } from '@/configs/schema'
import { eq } from 'drizzle-orm'

const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const { totalCourse } = useContext(CourseCountContext) || {};
  const [isMember, setIsMember] = useState(false)
  const [planType, setPlanType] = useState('free')

  const email = useMemo(() => user?.primaryEmailAddress?.emailAddress || '', [user])

  useEffect(() => {
    const getUserDetails = async () => {
      if (!email) return;
      const result = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, email))
      setIsMember(Boolean(result?.[0]?.isMember))
      setPlanType(result?.[0]?.planType || 'free')
    }
    getUserDetails()
  }, [email])

  if (!isLoaded) return null;

  const creditsUsed = Number(totalCourse || 0)
  const monthlyLimit = 100
  const creditsLeft = !isMember
    ? Math.max(0, 5 - creditsUsed)
    : (planType === 'monthly' ? Math.max(0, monthlyLimit - creditsUsed) : 'Unlimited')

  return (
    <div className='p-6 max-sm:p-0'>
      {/* Header */}
      <div className='p-5 w-full text-white rounded-lg flex items-center gap-6 bg-primary dark:bg-gray-800 shadow-lg dark:shadow-none dark:border dark:border-gray-700'>
        <div className='p-6 md:p-8 flex items-center gap-4 md:gap-6'>
          <Image src={user?.imageUrl || '/logo.svg'} alt='avatar' width={64} height={64} className='rounded-full border-2 border-white' />
          <div>
            <h1 className='text-2xl md:text-3xl font-bold text-white'>{user?.fullName || 'User'}</h1>
            <p className='text-white/90 text-sm md:text-base'>{email}</p>
            <div className='mt-2'>
              <span className={`px-2 py-1 text-xs rounded-md font-semibold ${isMember ? 'bg-emerald-500/90' : 'bg-white/20'}`}>
                {isMember ? 'Pro Member' : 'Free Plan'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='border border-border rounded-lg p-5 bg-card shadow-md hover:shadow-lg transition-shadow dark:bg-card/50 dark:backdrop-blur'>
          <h3 className='text-sm text-muted-foreground font-medium'>Courses Generated</h3>
          <p className='text-2xl font-bold mt-2 text-foreground'>{creditsUsed}</p>
        </div>
        <div className='border border-border rounded-lg p-5 bg-card shadow-md hover:shadow-lg transition-shadow dark:bg-card/50 dark:backdrop-blur'>
          <h3 className='text-sm text-muted-foreground font-medium'>Available Credits</h3>
          <div className='mt-2 flex items-end justify-between'>
            <p className='text-2xl font-bold text-foreground'>{creditsLeft}</p>
            {!isMember && (
              <span className='text-xs text-muted-foreground'>of 5</span>
            )}
            {isMember && planType === 'monthly' && (
              <span className='text-xs text-muted-foreground'>of {monthlyLimit}</span>
            )}
          </div>
          {!isMember && (
            <div className='mt-3'>
              <Progress value={(creditsUsed / 5) * 100} />
              <p className='text-xs text-muted-foreground mt-1'>{creditsUsed} used</p>
            </div>
          )}
          {isMember && planType === 'monthly' && (
            <div className='mt-3'>
              <Progress value={Math.min(100, (creditsUsed / monthlyLimit) * 100)} />
              <p className='text-xs text-muted-foreground mt-1'>{creditsUsed} used</p>
            </div>
          )}
        </div>
        <div className='border border-border rounded-lg p-5 bg-card shadow-md hover:shadow-lg transition-shadow dark:bg-card/50 dark:backdrop-blur'>
          <h3 className='text-sm text-muted-foreground font-medium'>Membership</h3>
          <p className='text-2xl font-bold mt-2 text-foreground'>{isMember ? 'Pro' : 'Free'}</p>
        </div>
      </div>

      {/* Membership Card */}
      <div className='mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 border border-border rounded-lg p-6 bg-card shadow-md dark:bg-card/50 dark:backdrop-blur'>
          <h2 className='font-bold text-lg text-foreground'>Account Details</h2>
          <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='border border-border rounded-md p-4 bg-secondary/20 dark:bg-secondary/10'>
              <p className='text-xs text-muted-foreground font-medium'>Full Name</p>
              <p className='font-semibold mt-1 text-foreground'>{user?.fullName || '-'}</p>
            </div>
            <div className='border border-border rounded-md p-4 bg-secondary/20 dark:bg-secondary/10'>
              <p className='text-xs text-muted-foreground font-medium'>Email</p>
              <p className='font-semibold mt-1 text-foreground'>{email || '-'}</p>
            </div>
            <div className='border border-border rounded-md p-4 bg-secondary/20 dark:bg-secondary/10'>
              <p className='text-xs text-muted-foreground font-medium'>User ID</p>
              <p className='font-semibold mt-1 break-all text-foreground text-sm'>{user?.id}</p>
            </div>
            <div className='border border-border rounded-md p-4 bg-secondary/20 dark:bg-secondary/10'>
              <p className='text-xs text-muted-foreground font-medium'>Member Since</p>
              <p className='font-semibold mt-1 text-foreground'>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</p>
            </div>
          </div>
        </div>

        <div className='border border-accent/40 rounded-lg p-6 bg-gradient-to-br from-accent/20 to-primary/10 shadow-md dark:from-accent/15 dark:to-primary/5 dark:bg-card/40'>
          <h2 className='font-bold text-lg text-foreground'>Membership</h2>
          <p className='text-sm text-muted-foreground mt-2'>
            {isMember 
              ? (planType === 'monthly' ? 'You have 100 monthly credits and priority generation.' : 'You have unlimited credits and priority generation.')
              : 'Upgrade to Pro for more credits and faster generation.'}
          </p>
          <div className='mt-4'>
            {isMember ? (
              <Link href='/dashboard/upgrade'>
                <Button variant='outline' className='w-full border-border hover:bg-secondary/20'>Manage Plan</Button>
              </Link>
            ) : (
              <Link href='/dashboard/upgrade'>
                <Button className='w-full bg-accent hover:bg-accent/90 text-accent-foreground'>Upgrade to Pro</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage


