"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

const ChapterList = ({ course }) => {
    const Chapters = course?.courseLayout?.chapters;
    const courseId = course?.courseId;
    const [notes, setNotes] = useState([])

    useEffect(()=>{
      const fetchNotes = async()=>{
        if (!courseId) return;
        const res = await axios.post('/api/study-type', { courseId, studyType: 'notes' })
        setNotes(Array.isArray(res?.data) ? res.data : [])
      }
      fetchNotes()
      // poll until all chapters are ready
      const id = setInterval(fetchNotes, 4000)
      return ()=> clearInterval(id)
    }, [courseId])

    const isChapterReady = (idx)=> {
      if (!Array.isArray(notes)) return false;
      // notes created with chapterId index
      return Boolean(notes.find(n => Number(n?.chapterId) === idx))
    }

  return  ( 
    <div className='mt-5'>
         <h2 className='font-medium text-xl'>Chapters</h2>

         <div className='mt-3'>
             {Chapters?.map((chapter, index)=>(
                <div className='flex justify-between items-center p-4 shadow-md mb-2 rounded-lg' key={index}>
                    <div className='flex gap-5 items-center'>
                      <h2 className='text-2xl max-sm:hidden'>{chapter?.emoji}</h2>
                      <div>
                          <h2 className='font-medium'>{chapter?.chapter_title}</h2>
                          <p className='text-gray-400 text-sm line-clamp-2'>{chapter?.chapter_summary}</p>
                      </div>
                    </div>
                    <div>
                      {isChapterReady(index) ? (
                        <Link href={`/course/${courseId}/notes?idx=${index}`}>
                          <span className='text-blue-600 text-sm hover:underline cursor-pointer'>View</span>
                        </Link>
                      ) : (
                        <span className='text-gray-500 text-sm'>Generating...</span>
                      )}
                    </div>
                </div>
             ))}
         </div>
    </div>
  )
}

export default ChapterList