"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import StepProgress from '../_components/StepProgress'
import QuizCardItem from './_components/QuizCardItem'
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
         const payload = result?.data;
         setQuizData(payload);
         const content = payload?.content;
         const questions = Array.isArray(content) ? content : (content?.questions || []);
         setQuiz(questions || [])
    }

    const checkAnswer = (userAnswer, currentQuestion) => {
        if(userAnswer==currentQuestion?.answer){
            setIsCorrectAns(true)
        }else{
            setIsCorrectAns(false)
            // setCorrectAns(currentQuestion?.answer)
        }       
    }

    useEffect(()=>{
         setIsCorrectAns(null);
        //  setCorrectAns(null);
    },[stepCount])
    
  const hasQuestions = Array.isArray(quiz) && quiz.length > 0;

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

        <h2 className='font-bold text-2xl text-center mb-4 dark:text-white'>Quiz</h2>
        <StepProgress data={quiz} stepCount={stepCount} setStepCount={setStepCount}/>

        <div>
            {hasQuestions ? (
              <QuizCardItem quiz={quiz[stepCount] || quiz[0]} userSelectedOption={(v)=>checkAnswer(v, quiz[stepCount] || quiz[0])}/>
            ) : (
              <div className='text-center text-sm text-gray-600 dark:text-gray-400 mt-6'>
                Generating quiz... Please check again in a few seconds.
              </div>
            )}
        </div>
          <div className=' mt-10 max-sm:mb-20 mb-10'>
              {isCorrectAns==false&& hasQuestions && 
                <div className='border p-3 border-red-700 dark:border-red-600 bg-red-200 dark:bg-red-900/30 rounded-lg'>
                      <h2 className='font-bold text-lg text-red-600 dark:text-red-400'>Incorrect 😔</h2>
                      <p className='text-red-600 dark:text-red-400'>Correct answer is: {quiz?.[stepCount]?.answer}</p>
              </div>}
              {isCorrectAns==true&& hasQuestions && <div>
                  <div className='border p-3 border-green-700 dark:border-green-600 bg-green-200 dark:bg-green-900/30 rounded-lg'>
                      <h2 className='font-bold text-lg text-green-600 dark:text-green-400'>Correct 👏</h2>
                      <p className='text-green-600 dark:text-green-400'>Your Answer is Correct</p>
                  </div>
              </div>}
          </div>
    </div>
    
  )
} 

export default Quiz