import React from 'react'
import { MdOutlineCategory } from "react-icons/md";
import { useDrawer, useProducts, useTheme } from '../../../../../shared/hooks';

interface Props {
    categoryId: string,
    categoryName: string,
    categoryIcon: string,
}

export const CategoryItemFilter: React.FC<Props> = ({ categoryId, categoryIcon, categoryName }) => {
    
    const { filter: { category }, filterProductsByCategory } = useProducts()
    const { onCloseDrawers } = useDrawer()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const onSelectCategory = () => {
        filterProductsByCategory(categoryId, categoryName)
        onCloseDrawers()
    }

    const isActive = categoryName === category.name

    return (
        <button 
            onClick={onSelectCategory}
            className={`
                w-full rounded-4xl px-4 py-2 border transition-all duration-200
                flex items-center gap-2
                ${isDark 
                    ? `
                        border-gray-700 text-gray-300 hover:bg-indigo-600/30 hover:text-indigo-200
                        ${isActive ? 'bg-indigo-600/40 border-indigo-500 text-indigo-100' : ''}
                    `
                    : `
                        border-gray-300 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700
                        ${isActive ? 'bg-indigo-500 text-white border-indigo-500' : ''}
                    `
                }
            `}
        >
            {
                categoryIcon === 'Categoría sin ícono'
                ? (<MdOutlineCategory 
                      size={20} 
                      className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`} 
                   />)
                : (<img 
                      className="w-6 h-6 object-contain" 
                      src={categoryIcon} 
                      alt={categoryName} 
                   />)
            }
            <p className="truncate text-sm font-medium">{categoryName}</p>
        </button>
    )
}
