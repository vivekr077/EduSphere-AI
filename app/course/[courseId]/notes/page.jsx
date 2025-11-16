"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ViewNotes = () => {

    const { courseId } = useParams();
    const [notes, setNotes] = useState();
    const [stepCount, setStepCount] = useState(0)
    const route = useRouter();

    useEffect(()=>{
        GetNotes();
        const idxParam = new URLSearchParams(window.location.search).get('idx');
        if (idxParam) {
          const parsed = parseInt(idxParam);
          if (!isNaN(parsed)) setStepCount(parsed);
        }
    },[])

    useEffect(()=>{
      if (!notes || notes.length === 0) {
        const id = setInterval(()=>{
          GetNotes()
        }, 4000)
        return ()=> clearInterval(id)
      }
    }, [notes])

    const GetNotes = async ()=>{
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType: 'notes'
        });
        console.log(result?.data);
        setNotes(result?.data)
        
    }

  return (
    <div>
        {/* Back to Course Button */}
        <div className='mb-6'>
            <Link href={`/course/${courseId}`}>
                <Button variant='outline' className='flex items-center gap-2'>
                    <ArrowLeft className='h-4 w-4' />
                    Back to Course
                </Button>
            </Link>
        </div>

        {!notes || notes.length===0 ? (
          <div className='text-sm light:text-gray-600 mt-6'>
            Generating notes... You can check back in a few seconds if total chapters is less than 7.
          </div>
        ) : (
          <div className='flex gap-5 max-sm:gap-3 items-center'>
            {stepCount!=0 && <Button variant='outline' size='sm' onClick={()=>setStepCount(stepCount-1)}>Previous</Button>}
              {notes?.map((item, index)=>(
                  <div key={index} className={`w-full h-2 rounded-full ${index<stepCount?'bg-primary':'bg-gray-200'}`}></div>
              ))}
              {stepCount<notes?.length && <Button variant='outline' size='sm' onClick={()=>setStepCount(stepCount+1)}>Next</Button>}
          </div>
        )}

        <div className='mt-10'>
            {notes && notes.length>0 && (
              <>
                <div className='prose' dangerouslySetInnerHTML={{__html:(notes[stepCount]?.notes)?.replace('```html', "").replace('```',"")}}></div>
                {notes?.length==stepCount && <div className='flex items-center gap-10 flex-col justify-center'>
                  <h2>End of Notes</h2>
                  <Button onClick={()=>{route.back()}}>Go to Course Page</Button>
                 </div>}
              </>
            )}
        </div>
    </div>
  )
}

export default ViewNotes