import React from 'react'
import { Button } from './Button'
import { FaPlus } from 'react-icons/fa'

interface CreateButtonProps {
    text: string
}

export const CreateButton: React.FC<CreateButtonProps> = ({ text }) => {
    return (
        <Button className='
                text-sm flex items-center gap-2 justify-center cursor-pointer 
                bg-[linear-gradient(to_right,#005C97_0%,#363795_51%,#005C97_100%)]
                bg-[length:200%_auto]
                hover:bg-[position:right_center]
                transition-all duration-1000
                text-white
                shadow-[0_0_20px_#eee]
                rounded-full'>
            <FaPlus />
            {text}
        </Button>

    )
}
