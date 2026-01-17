import React from 'react'
import { MdOutlineCategory } from 'react-icons/md'
import { useTheme, usePos } from '../../../shared/hooks'

interface Props {
    categoryId: string
    categoryName: string
    categoryIcon: string
    onSelect?: () => void
}

export const CategoryItemMenu: React.FC<Props> = ({
    categoryIcon,
    categoryId,
    categoryName,
    onSelect
}) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { onSetCategoryActive, categoryActive } = usePos()
    const isActive = categoryId === categoryActive

    const handleClick = () => {
        onSetCategoryActive(categoryId)
        if (onSelect) {
            setTimeout(() => onSelect(), 300)
        }
    }
        
    return (
        <div
            onClick={handleClick}    
            className={`
                relative flex items-center md:flex-col md:justify-center gap-3 md:gap-2
                p-3 md:p-2 md:py-4 border rounded-xl
                shadow-sm transition-all cursor-pointer
                ${isDark 
                    ? `bg-gray-800 border-gray-700 ${isActive ? 'shadow-lg shadow-gray-900/50' : 'hover:bg-gray-750'}` 
                    : `bg-white border-gray-100 ${isActive ? 'shadow-md' : 'shadow hover:shadow-md'}`
                }
            `}
        >

            {categoryIcon === 'Categoría sin ícono' ? (
                <MdOutlineCategory 
                    className={`flex-shrink-0 transition-colors ${
                        isDark 
                            ? (isActive ? 'text-indigo-400' : 'text-gray-500')
                            : (isActive ? 'text-black' : 'text-gray-400')
                    }`} 
                    size={20} 
                />
            ) : (
                <img 
                    className="w-6 h-6 md:w-6 md:h-6 object-contain flex-shrink-0" 
                    src={categoryIcon} 
                    alt={categoryName} 
                />
            )}

            <p className={`
                text-sm font-semibold md:text-center transition-colors flex-1 md:flex-none
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