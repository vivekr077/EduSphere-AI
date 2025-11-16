import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import React from 'react'

const CourseIntroCard = ({course}) => {
  return (
    <div className='flex gap-5 item-center p-10 max-sm:p-4 border shadow-md rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700'>
       <Image src={'/knowledge.png'} alt='other' width={70} height={70} className=' max-sm:hidden'/>
       <div>
         <h2 className='font-bold text-2xl max-sm:text-xl dark:text-white'>{course?.courseLayout?.course_title}</h2>
         <p className='line-clamp-2 dark:text-gray-300'>{course?.courseLayout?.course_summary}</p>
         <Progress className='mt-3' />
         <h2 className='mt-3 text-lg text-blue-600 dark:text-blue-400'>Total Chapter: {course?.courseLayout?.chapters?.length}</h2>
       </div>
    </div>
  )
}

export default CourseIntroCard