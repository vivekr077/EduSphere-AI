import React from 'react'

const ChapterList = ({ course }) => {
    const Chapters = course?.courseLayout?.chapters;
    console.log("chapters are:" , Chapters);
    
  return  ( 
    <div className='mt-5'>
         <h2 className='font-medium text-xl dark:text-white'>Chapters</h2>

         <div className='mt-3'>
             {Chapters?.map((chapter, index)=>(
                <div className='flex gap-5 items-center p-4 shadow-md mb-2 rounded-lg cursor-pointer bg-white dark:bg-gray-800 border dark:border-gray-700 hover:shadow-lg transition-all duration-300' key={index}>
                    <h2 className='text-2xl'>{chapter?.emoji}</h2>
                    <div>
                        <h2 className='font-medium dark:text-white'>{chapter?.chapter_title}</h2>
                        <p className='text-gray-500 dark:text-gray-400 text-sm line-clamp-2'>{chapter?.chapter_summary}</p>
                    </div>
                </div>
             ))

             }
         </div>
    </div>
  )
}

export default ChapterList