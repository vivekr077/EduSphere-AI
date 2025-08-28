"use client"
import React, { useState } from 'react'
import SelectOption from './_components/SelectOption'
import { Button } from '@/components/ui/button';
import TopicInput from './_components/TopicInput';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Create = () => {
 
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState([]);
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handleUserInput = (fieldName, fieldValue)=>{
            setFormData(prev=>({
                ...prev,
                [fieldName]:fieldValue
            }))
            console.log(formData);
            
    }

    /**
     * Used to save user input and generate AI Course using AI
     */

    const handleGenerateCourseOutline = async () => {
        const courseId = uuidv4();
        setLoading(true)
        const result = await axios.post('/api/generate-course-outline', {
          courseId: courseId,
          ...formData,
          createdBy: user.primaryEmailAddress?.emailAddress
        });
        setLoading(false);
        router.replace('/dashboard')
        // Toast Notification of course generated
        toast("Your course content is generating, please click on refresh button.")

        console.log(result);     
    };


  return (
    <div className='flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20'>
        <h2 className='font-bold text-4xl text-primary'>Start Generating Your Personal Study Material</h2>
        <p className='text-gray-500 text-lg'>Fill All details in order to generate study material for your next project</p>

        <div className='mt-10'>
             { step==0 ? <SelectOption selectedStudyType={(value)=>{handleUserInput('courseType', value)}}/> : <TopicInput setTopic={(value)=>{handleUserInput('topic', value)}} setDifficultyLevel={(value)=>{handleUserInput('difficultyLevel', value)}}/>}
        </div>

        <div className='flex justify-between w-full mt-32'>
             {step!=0 ? <Button variant='outline' onClick={()=>setStep(step-1)}>Previous</Button> : <Button variant='outline' onClick={()=>router.back()}>Back</Button>}
             {step==0? <Button onClick={()=>formData?.courseType ? setStep(step+1) : null} disabled={!formData?.courseType}>Next</Button> : 
             <Button onClick={()=> (formData?.topic && formData?.difficultyLevel) ? handleGenerateCourseOutline() : null} disabled={loading || !formData?.topic || !formData?.difficultyLevel}> {loading? <Loader className=' animate-spin'/> : 'Generate'}</Button>}
        </div>

    </div>
  )
}

export default Create