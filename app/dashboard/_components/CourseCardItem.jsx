import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RefreshCcw } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CourseCardItem = ({course}) => {
  return (
    <div className='border rounded-lg shadow-md p-5'>
        <div>
             <div className='flex justify-between items-center'>
                <Image src={'/knowledge.png'} alt='other' width={50} height={50}/>
                <h2 className='text-[10px] p-1 px-2 rounded-full bg-blue-600 text-white'>20 Dec 2024</h2>
             </div>
             <h2 className='mt-3 font-medium text-lg line-clamp-2'>{course?.courseLayout.course_title}</h2>
             <p className='text-xs line-clamp-2 text-gray-500 mt-2'>{course?.courseLayout?.course_summary
             }</p>

             <div className='mt-3'>
                 <Progress value={0}/>
             </div>

             <div className='mt-3 flex justify-end'>
                 {course?.status=='Generating'? 
                    <h2 className='text-sm text-[12px] p-1 px-2 rounded-full bg-gray-400 text-white flex gap-2 items-center'>
                        <RefreshCcw className='h-5 w-5 animate-spin'/>Generating...
                    </h2> 
                    : 
                    <Link href={'/course/'+course?.courseId} >
                    <Button>View</Button>
                    </Link>
                    }
             </div>
        </div>
    </div>
  )
}

export default CourseCardItem