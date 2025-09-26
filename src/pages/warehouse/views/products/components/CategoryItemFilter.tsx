import React from 'react'
import { MdOutlineCategory } from "react-icons/md";
import { useDrawer, useProducts } from '../../../../../shared/hooks';

interface Props {
    categoryId: string,
    categoryName: string,
    categoryIcon: string,
}

export const CategoryItemFilter: React.FC<Props> = ({ categoryId, categoryIcon, categoryName }) => {
    
    const { filter: {category}, filterProductsByCategory } = useProducts()
    const { onCloseDrawers } = useDrawer()

    const onSelectCategory = () => {
        filterProductsByCategory(categoryId, categoryName)
        onCloseDrawers()
    }

    return (
        <button 
            onClick={onSelectCategory} 
            className={`border border-gray-300 px-4 py-2 rounded-4xl hover:bg-indigo-400 cursor-pointer hover:text-white w-full 
            ${categoryName === category.name && 'bg-indigo-400 text-white'}`}
        >
            <div className="flex items-center gap-2 w-64">
                {
                    categoryIcon === 'Categoría sin ícono'
                    ? (<MdOutlineCategory size={20} />)
                    : (<img className='w-6' src={categoryIcon} alt={categoryName}/>)
                }
                <p>{categoryName}</p>
            </div>
        </button>
    )
}
