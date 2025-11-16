import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const QuizCardItem = ({quiz, userSelectedOption}) => {
    const [selectedOption, setSelectedOption] = useState();
  return quiz && (
    <div className='mt-10 p-5 max-sm:p-0'>
        <h2 className='font-medium text-3xl max-md:text-2xl max-sm:text-xl text-center'>{quiz?.question}</h2>
        <div className='grid max-sm:grid-cols-1 grid-cols-2 gap-5 mt-6'>
            {quiz?.options.map((option, index)=>(
                <div variant='outline' key={index} 
                onClick={()=>{setSelectedOption(option); userSelectedOption(option)}}
                className={`w-full border rounded-full p-3 px-4 text-center text-lg hover:bg-blue-500 cursor-pointer ${selectedOption===option&&'bg-primary text-white hover:bg-primary'} flex justify-center items-center`} >{option}</div>
            ))}
            
        </div>
    </div>
  )
}

export default QuizCardItem