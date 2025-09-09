import React from 'react'

interface Props {
    initial: string
}

export const AvatarInitial: React.FC<Props> = ({ initial }) => {
    return (

        <div className={`text-lg font-semibold w-full h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center`}>
            {initial}
        </div>

    )
}
