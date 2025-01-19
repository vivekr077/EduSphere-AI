import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import axios from 'axios'
import Link from 'next/link';

const StudyMaterialSection = ({courseId, course}) => {
   const [studyTypeContent, setStudyTypeContent] = useState();
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
            type: 'flashCard'
         },
         {
            name: 'Quiz',
            desc: 'Great way to test your knowledge',
            icon: '/quiz.png',
            path: '/quiz',
            type: 'quiz'
         },
         {
            name: 'Question/Answer',
            desc: 'Help to practice your learning',
            icon: '/qa.png',
            path: '/qa',
            type: 'quiz'
         },
         
        ]

   useEffect(()=>{
      GetStudyMaterial();
   },[])

   const GetStudyMaterial = async ()=>{
       const result = await axios.post('/api/study-type',{
         courseId: courseId,
         studyType: 'ALL'
       });
       console.log("finalyyy reault is: ", result?.data)
       setStudyTypeContent(result?.data)
   }
  return (
    <div>
        <h2 className='font-medium text-xl mt-3'>Study Material</h2>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
            {MaterialList.map((item,index)=>(               
                <MaterialCardItem item={item} key={index}
                  studyTypeContent = {studyTypeContent}
                  course ={course}
                  refreshData={GetStudyMaterial}
                />    
            ))}
        </div>
    </div>
  )
}

export default StudyMaterialSection