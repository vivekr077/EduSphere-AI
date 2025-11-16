import React from 'react'
import ReactCardFlip from 'react-card-flip'

const FlashCardItem = ({ isFlipped, handleClick, flashcard}) => {
  return (
    <div>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div>
                <h2 className='p-4 bg-blue-600 dark:bg-gray-800 text-white shadow-lg 
                flex items-center justify-center rounded-lg cursor-pointer 
                h-[250px] w-[200px] md:h-[350px] md:w-[300px] dark:border-2 dark:border-blue-600' onClick={handleClick}>
                   {flashcard?.front}
                </h2>
            </div>

            <div>
                <h2 className=' p-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-lg 
                flex items-center justify-center rounded-lg cursor-pointer 
                h-[250px] w-[200px] md:h-[350px] md:w-[300px] dark:border-2 dark:border-blue-600' onClick={handleClick}>
                      {flashcard?.back}
                 </h2>
            </div>
      </ReactCardFlip>
    </div>
  )
}

export default FlashCardItem