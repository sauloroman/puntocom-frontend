import React from 'react'

interface Props {
    username: string
}

export const FilterUserTag: React.FC<Props> = ({ username }) => {
    if ( !username ) return null
        
    return (
        <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg text-sm'>
            <div className='flex items-center gap-2'>
                <span className='text-yellow-900 font-medium'>Usuario:</span>
                <span className='text-yellow-700'>{username}</span>
            </div>
        </div>
    )
}
