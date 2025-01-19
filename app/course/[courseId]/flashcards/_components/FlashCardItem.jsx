import React from 'react'
import ReactCardFlip from 'react-card-flip'

const FlashCardItem = ({ isFlipped, handleClick, flashcard}) => {
  return (
    <div>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div>
                <h2 className='p-4 bg-primary text-white shadow-lg 
                flex items-center justify-center rounded-lg cursor-pointer 
                h-[250px] w-[200px] md:h-[350px] md:w-[300px]' onClick={handleClick}>
                   {flashcard?.front}
                </h2>
            </div>

            <div>
                <h2 className=' p-4 bg-white text-primary shadow-lg 
                flex items-center justify-center rounded-lg cursor-pointer 
                h-[250px] w-[200px] md:h-[350px] md:w-[300px]' onClick={handleClick}>
                      {flashcard?.back}
                 </h2>
            </div>
      </ReactCardFlip>
    </div>
  )
}

export default FlashCardItem