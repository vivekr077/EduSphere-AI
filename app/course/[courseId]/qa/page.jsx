"use client"
import axios  from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

const QA = () => {
  const { courseId } = useParams();
  const [qa, setQa] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      GetQA();
  },[])

  const GetQA = async()=>{
      const result = await axios.post('/api/study-type', {
         courseId: courseId,
         studyType: 'qa'
      });
      setQa(result?.data);
  }

  const onGenerate = async()=>{
    setLoading(true)
    await axios.post('/api/generate-study-type-content', {
      courseId,
      type: 'qa'
    })
    setLoading(false)
    GetQA()
  }

  return (
    <div>
       {/* Back to Course Button */}
       <div className='mb-6'>
           <Link href={`/course/${courseId}`}>
               <Button className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 text-white border-0'>
                   <ArrowLeft className='h-4 w-4' />
                   Back to Course
               </Button>
           </Link>
       </div>

       <h2 className='font-bold text-2xl dark:text-white'>Question & Answer</h2>
       <p className='dark:text-gray-300'>Quick Q/A to reinforce understanding.</p>

       {!qa ? (
         <div className='mt-6'>
           <Button onClick={onGenerate} disabled={loading} className='bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 text-white border-0'>
             {loading && <RefreshCcw className='animate-spin mr-2'/>}
             Generate Q/A
           </Button>
         </div>
       ) : (
         <div className='mt-6 space-y-4'>
           {qa?.content?.map((item, index)=>(
              <div key={index} className='border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm'>
                <p className='font-medium text-gray-950 dark:text-white'>Q{index+1}. {item.question}</p>
                <p className='text-gray-700 dark:text-gray-300 mt-2'>{item.answer}</p>
              </div>
           ))}
         </div>
       )}
    </div>
  )
}

export default QA


