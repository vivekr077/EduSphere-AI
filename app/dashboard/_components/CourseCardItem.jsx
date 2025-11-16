import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RefreshCcw } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CourseCardItem = ({course}) => {
  // Format the creation date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className='border border-border rounded-lg shadow-sm p-5 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 dark:border-gray-700 dark:hover:border-gray-600'>
        <div>
             <div className='flex justify-between items-center'>
                <Image src={'/knowledge.png'} alt='other' width={50} height={50}/>
                <h2 className='text-[10px] p-1 px-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold'>
                  {formatDate(course?.createdAt)}
                </h2>
             </div>
             <h2 className='mt-3 font-medium text-lg line-clamp-2 text-foreground'>{course?.courseLayout.course_title}</h2>
             <p className='text-xs line-clamp-2 text-muted-foreground mt-2'>{course?.courseLayout?.course_summary}</p>

             <div className='mt-3'>
                 <Progress value={0}/>
             </div>

             <div className='mt-3 flex justify-end'>
                 {course?.status=='Generating'? 
                    <h2 className='text-sm text-[12px] p-1 px-2 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-semibold flex gap-2 items-center'>
                        <RefreshCcw className='h-5 w-5 animate-spin'/>Generating...
                    </h2> 
                    : 
                    <Link href={'/course/'+course?.courseId} >
                    <Button className='bg-primary dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 hover:bg-primary/90'>View</Button>
                    </Link>
                    }
             </div>
        </div>
    </div>
  )
}

export default CourseCardItem