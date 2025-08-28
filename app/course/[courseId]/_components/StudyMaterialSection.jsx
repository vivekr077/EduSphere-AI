import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import axios from 'axios'
import Link from 'next/link';

const StudyMaterialSection = ({courseId, course}) => {
   const [studyTypeContent, setStudyTypeContent] = useState();
   const [loading, setLoading] = useState(true)
   const MaterialList = [
         {
            name: 'Notes/Chapters',
            desc: 'Read notes to prepare it',
            icon: '/notes.png',
            path: '/notes',
            type: 'notes'
         },
         {
            name: 'Flashcard',
            desc: 'Flashcard to revise the concepts',
            icon: '/flashcard.png',
            path: '/flashcards',
            type: 'Flashcard'
         },
         {
            name: 'Quiz',
            desc: 'Great way to test your knowledge',
            icon: '/quiz.png',
            path: '/quiz',
            type: 'Quiz'
         },
         {
            name: 'Question/Answer',
            desc: 'Help to practice your learning',
            icon: '/qa.png',
            path: '/qa',
            type: 'qa'
         },
         
        ]

   useEffect(()=>{
      GetStudyMaterial();
   },[])

   const GetStudyMaterial = async ()=>{
       setLoading(true);
       const result = await axios.post('/api/study-type',{
         courseId: courseId,
         studyType: 'ALL'
       });
       console.log("finalyyy reault is: ", result?.data)
       setStudyTypeContent(result?.data);
       setLoading(false)
   }
  return (
    <div>
        <h2 className='font-medium text-xl mt-3'>Study Material</h2>

        <div className='grid max-sm:grid-cols-1 grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
            {
               loading==true?
               [1,2,3,4].map((item, index)=>(
                 <div key={index} className='h-56 w-full bg-slate-200 rounded-lg animate-pulse'></div>
              ))
                :
                <>
                {MaterialList.map((item,index)=>(               
                <MaterialCardItem item={item} key={index}
                  studyTypeContent = {studyTypeContent}
                  course ={course}
                  refreshData={GetStudyMaterial}
                />    
            ))} </>
            }
        </div>
    </div>
  )
}

export default StudyMaterialSection