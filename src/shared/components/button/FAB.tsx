import React from 'react'
import { BsPlus } from 'react-icons/bs'

interface Props {
    onClick?: () => void
}

export const FAB: React.FC<Props> = ({ onClick = () => {} }) => {
    return (
        <button
            onClick={onClick}
            className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 active:scale-95"
            aria-label="Crear categoría"
        >
            <BsPlus size={32} />
        </button>
    )
}
