"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import StepProgress from '../_components/StepProgress'
import QuizCardItem from './_components/QuizCardItem'

const Quiz = () => { 
  const { courseId } = useParams();
  const [quizData, setQuizData] = useState();
  const [quiz, setQuiz] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [isCorrectAns, setIsCorrectAns] = useState(null);
  // const [correctAns, setCorrectAns] = useState(null)

    useEffect(()=>{
        GetQuiz();
    },[])
    const GetQuiz =  async() => {
         const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType: 'Quiz'
            
         })
         console.log(result)
         setQuizData(result?.data);
         setQuiz(result.data.content.questions)  // for counting of Qs so that no. of div can be shown on upper side
    }

    const checkAnswer = (userAnswer, currentQuestion) => {
        if(userAnswer==currentQuestion?.correctAnswer){
            setIsCorrectAns(true)
            // setCorrectAns(currentQuestion?.correctAnswer)
        }else{
            setIsCorrectAns(false)
        }       
    }

    useEffect(()=>{
         setIsCorrectAns(null);
        //  setCorrectAns(null);
    },[stepCount])
    
  return (
    <div>
        <h2 className='font-bold text-2xl text-center mb-4'>Quiz</h2>
        <StepProgress data={quiz} stepCount={stepCount} setStepCount={setStepCount}/>

        <div>
            {/* {quiz && quiz?.map((item, index)=>( */}
                 <QuizCardItem quiz={quiz[stepCount]} userSelectedOption={(v)=>checkAnswer(v, quiz[stepCount])}/>
            {/* ))} */}
        </div>
          <div className=' mt-10'>
              {isCorrectAns==false&& 
                <div className='border p-3 border-red-700 bg-red-200 rounded-lg'>
                      <h2 className='font-bold text-lg text-red-600'>Incorrect 😔</h2>
                      <p className='text-red-600'>Correct answer is: {quiz?.[stepCount]?.correctAnswer}</p>
              </div>}
              {isCorrectAns==true&& <div>
                  <div className='border p-3 border-green-700 bg-green-200 rounded-lg'>
                      <h2 className='font-bold text-lg text-green-600'>Correct 👏</h2>
                      <p className='text-green-600'>Your Answer is Correct</p>
                  </div>
              </div>}
          </div>
    </div>
    
  )
} 

export default Quiz