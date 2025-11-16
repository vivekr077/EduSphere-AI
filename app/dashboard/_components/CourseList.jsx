"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { CourseCountContext } from '@/app/_context/CourseCountContext';
import Link from 'next/link';

const CourseList = () => {
    const { user } = useUser();
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { totalCourse, setTotalCourse } = useContext(CourseCountContext);

    useEffect(()=>{
       user && getCourseList();
    },[user])
    const getCourseList = async () =>{
         setLoading(true);
         const result = await axios.post('/api/courses', {
            createdBy: user?.primaryEmailAddress?.emailAddress
         })
         console.log(result);
         setCourseList(result?.data?.result)
         setTotalCourse(result?.data?.result?.length)
         setLoading(false)
    }
  return (
    <div className='mt-10'>
          <h2 className='font-bold text-2xl max-sm:text-xl flex justify-between items-center'>Your Study Material
          <Button variant='outline' 
            onClick={getCourseList}
            className='border-primary text-primary max-sm:text-base'><RefreshCw />Refresh</Button>
          </h2>
          
          {loading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5'>
              {[1,2,3,4,5,6].map((item, index)=>(
                <div key={index} className='h-56 w-full bg-slate-200 rounded-lg animate-pulse'></div>
              ))}
            </div>
          ) : courseList?.length ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5'>
              {courseList.map((course, idx)=>(
                <CourseCardItem  course={course} key={idx}/>
              ))}
            </div>
          ) : (
            <div className='mt-8 border border-dashed rounded-lg p-10 text-center bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
              <h3 className='text-lg font-semibold dark:text-gray-100'>No courses yet</h3>
              <p className='text-gray-600 dark:text-gray-400 mt-1'>Create your first personalized study material to get started.</p>
              <Link href='/create'>
                <Button className='mt-4'>+ Create New</Button>
              </Link>
            </div>
          )}
    </div>
  )
}

export default CourseList