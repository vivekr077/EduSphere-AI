"use client"
import React, { useState, useEffect } from "react";
import SideBar from "./_components/SideBar";
import DashboardHeader from "./_components/DashboardHeader";
import WelcomeBanner from "./_components/WelcomeBanner";
import { CourseCountContext } from "../_context/CourseCountContext";

const DashboardLayout = ({ children }) => {
  const [totalCourse, setTotalCourse] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(()=>{
    const handler = ()=> setMobileOpen(false)
    if (typeof window !== 'undefined') {
      window.addEventListener('close-mobile-drawer', handler)
      return ()=> window.removeEventListener('close-mobile-drawer', handler)
    }
  }, [])
  return (
    <CourseCountContext.Provider value={{totalCourse, setTotalCourse}}  >
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <div  className='md:w-64 hidden md:block fixed'>
            <SideBar/>
        </div>
        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/30" onClick={()=>setMobileOpen(false)}></div>
            <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
              <SideBar />
            </div>
          </div>
        )}
        <div className="md:ml-64">
            <DashboardHeader onMenuClick={()=>setMobileOpen(true)} />
            <div className="p-5">
                {children}
            </div>
        </div>
    </div>
    </CourseCountContext.Provider>
  );
};

export default DashboardLayout;
