"use client"
import React, { useEffect, useState } from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader'
import SideBar from '../dashboard/_components/SideBar'
import { CourseCountContext } from '../_context/CourseCountContext'

const CreateLayout = ({children}) => {
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
      <div>
        {mobileOpen && (
          <div className='fixed inset-0 z-40 md:hidden'>
            <div className='absolute inset-0 bg-black/30' onClick={()=>setMobileOpen(false)}></div>
            <div className='absolute left-0 top-0 h-full w-64 bg-white shadow-lg'>
              <SideBar />
            </div>
          </div>
        )}
        <DashboardHeader onMenuClick={()=>setMobileOpen(true)} />
        {children}
      </div>
    </CourseCountContext.Provider>
  )
}

export default CreateLayout


