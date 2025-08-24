import React from 'react'
import { Spinner } from './Spinner'

interface SpinnerContainerProps {
    size:  "sm" | "md" | "lg" | "xl",
    color: string
}

export const SpinnerContainer: React.FC<SpinnerContainerProps> = ({ size, color }) => {
    return (
        <div className='flex justify-center items-center'>
            <Spinner size={size} color={color}/>
        </div>
    )
}
