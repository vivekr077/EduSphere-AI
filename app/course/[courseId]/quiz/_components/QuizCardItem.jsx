import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const QuizCardItem = ({quiz, userSelectedOption}) => {
    const [selectedOption, setSelectedOption] = useState();
  return quiz && (
    <div className='mt-10 p-5'>
        <h2 className='font-medium text-3xl text-center'>{quiz?.question}</h2>
        <div className='grid grid-cols-2 gap-5 mt-6'>
            {quiz?.options.map((option, index)=>(
                <h2 variant='outline' key={index} 
                onClick={()=>{setSelectedOption(option);userSelectedOption(option)}}
                className={`w-full border rounded-full p-3 px-4 text-center text-lg hover:bg-gray-200 cursor-pointer ${selectedOption===option&&'bg-primary text-white hover:bg-primary'}`} >{option}</h2>
            ))}
            
        </div>
    </div>
  )
}

export default QuizCardItem