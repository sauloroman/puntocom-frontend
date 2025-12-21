import React from 'react'
import { MdOutlineCategory } from 'react-icons/md'
import { usePos } from '../../../shared/hooks/usePos'
import { useTheme } from '../../../shared/hooks'

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
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { onSetCategoryActive, categoryActive } = usePos()
    const isActive = categoryId === categoryActive
        
    return (
        <div
            onClick={() => onSetCategoryActive(categoryId)}    
            className={`
                relative flex flex-col justify-center items-center gap-2
                p-2 py-4 border rounded-xl
                shadow-sm transition-all cursor-pointer
                ${isDark 
                    ? `bg-gray-800 border-gray-700 ${isActive ? 'shadow-lg shadow-gray-900/50' : 'hover:bg-gray-750'}` 
                    : `bg-white border-gray-100 ${isActive ? 'shadow-md' : 'shadow hover:shadow-md'}`
                }
            `}
        >

        {categoryIcon === 'Categoría sin ícono' ? (
            <MdOutlineCategory 
                className={`transition-colors ${
                    isDark 
                        ? (isActive ? 'text-indigo-400' : 'text-gray-500')
                        : (isActive ? 'text-black' : 'text-gray-400')
                }`} 
                size={20} 
            />
        ) : (
            <img className="w-6 h-6 object-contain" src={categoryIcon} alt={categoryName} />
        )}

        <p className={`
            text-sm font-semibold text-center transition-colors
            ${isDark ? 'text-gray-200' : 'text-gray-700'}
        `}>
            {categoryName}
        </p>

        {isActive && (
            <span className={`
                absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-r-md
                ${isDark ? 'bg-indigo-500' : 'bg-green-500'}
            `}></span>
        )}
        </div>
  )
}
