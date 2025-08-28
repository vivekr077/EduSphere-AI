"use client"
import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PaymentSuccessInner = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [countdown, setCountdown] = useState(5)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // If we have a session ID, try to manually update user status as fallback
    if (sessionId) {
      updateUserMembership(sessionId)
    }
  }, [sessionId])

  const updateUserMembership = async (sessionId) => {
    setIsUpdating(true)
    try {
      const response = await fetch('/api/payment/manage-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })

      if (response.ok) {
        console.log('User membership updated successfully')
      } else {
        console.error('Failed to update user membership')
      }
    } catch (error) {
      console.error('Error updating user membership:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      router.push('/dashboard')
    }
  }, [countdown, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for upgrading to EduSphere-AI Pro! You now have unlimited access to generate study materials.
        </p>

        {sessionId && (
          <p className="text-sm text-gray-500 mb-6">
            Session ID: {sessionId}
          </p>
        )}

        {isUpdating && (
          <p className="text-sm text-blue-600 mb-4">
            Updating your membership status...
          </p>
        )}

        <div className="space-y-4">
          <Button 
            onClick={() => router.push('/dashboard')}
            className="w-full"
            disabled={isUpdating}
          >
            Go to Dashboard
          </Button>
          
          <p className="text-sm text-gray-500">
            Redirecting automatically in {countdown} seconds...
          </p>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-gray-600">Loading payment status...</div></div>}>
      <PaymentSuccessInner />
    </Suspense>
  )
}
