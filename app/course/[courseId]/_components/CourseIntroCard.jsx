import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import React from 'react'

const CourseIntroCard = ({course}) => {
  return (
    <div className='flex gap-5 item-center p-10 max-sm:p-4 border shadow-md rounded-lg'>
       <Image src={'/knowledge.png'} alt='other' className=' max-sm:hidden' width={70} height={70}/>
       <div>
         <h2 className='font-bold text-2xl max-sm:text-xl'>{course?.courseLayout?.course_title}</h2>
         <p className='line-clamp-2'>{course?.courseLayout?.course_summary}</p>
         <Progress className='mt-3' />
         <h2 className='mt-3 text-lg text-primary'>Total Chapter: {course?.courseLayout?.chapters?.length}</h2>
       </div>
    </div>
  )
}

export default CourseIntroCard