import React from 'react'
import { MdOutlineCategory } from 'react-icons/md'
import { usePos } from '../../../shared/hooks/usePos'

interface Props {
  categoryId: string
  categoryName: string
  categoryIcon: string
}

export const CategoryItemMenu: React.FC<Props> = ({
  categoryIcon,
  categoryId,
  categoryName
}) => {

    const { onSetCategoryActive, categoryActive } = usePos()
        
    return (
        <div
            onClick={ () => onSetCategoryActive(categoryId) }    
            className={`
                relative flex flex-col justify-center items-center gap-2
                bg-white p-2 py-4 border border-gray-100 rounded-xl
                shadow-sm transition-all cursor-pointer
                ${categoryId === categoryActive ? 'shadow-md' : 'shadow'}
            `}
        >

        {categoryIcon === 'Categoría sin ícono' ? (
            <MdOutlineCategory className={`${categoryId === categoryActive ? 'text-black' : 'text-gray-400'}`} size={20} />
        ) : (
            <img className="w-6 h-6 object-contain" src={categoryIcon} alt={categoryName} />
        )}

        <p className="text-sm font-semibold text-gray-700 text-center">
            {categoryName}
        </p>

        {categoryId === categoryActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-green-500 rounded-r-md"></span>
        )}
        </div>
  )
}
