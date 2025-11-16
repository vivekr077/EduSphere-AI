"use client"
import React, { useEffect, useState } from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader'
import SideBar from '../dashboard/_components/SideBar'
import { CourseCountContext } from '../_context/CourseCountContext'

const CourseViewLayout = ({children}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [totalCourse, setTotalCourse] = useState(0)

  useEffect(()=>{
    const handler = ()=> setMobileOpen(false)
    if (typeof window !== 'undefined') {
      window.addEventListener('close-mobile-drawer', handler)
      return ()=> window.removeEventListener('close-mobile-drawer', handler)
    }
  }, [])

  return (
    <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors min-h-screen">
        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className='fixed inset-0 z-40 md:hidden'>
            <div className='absolute inset-0 bg-black/30' onClick={()=>setMobileOpen(false)}></div>
            <div className='absolute left-0 top-0 h-full w-64 bg-white shadow-lg'>
              <SideBar />
            </div>
          </div>
        )}
        <DashboardHeader onMenuClick={()=>setMobileOpen(true)} />
        <div className='mx-10 md:mx-36 lg:px-60 mt-10'>
          {children}
        </div>
      </div>
    </CourseCountContext.Provider>
  )
}

export default CourseViewLayout