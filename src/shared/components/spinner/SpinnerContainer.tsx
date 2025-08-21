import React from 'react'
import { Spinner } from './Spinner'

export const SpinnerContainer: React.FC = () => {
    return (
        <div className='flex justify-center items-center'><Spinner size='lg' /></div>
    )
}
