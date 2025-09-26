import React from 'react'

interface Props {
    text: string,
}

export const SmallButton: React.FC<Props> = ({ text }) => {
    return (
        <button
            type='button'
            className='border border-indigo-600 text-indigo-600 font-bold p-2 text-xs rounded-full cursor-pointer'
        >
            { text }
        </button>
    )
}
