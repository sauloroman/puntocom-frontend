import React, { useEffect } from 'react'
import { useCategories } from '../../../shared/hooks'
import { CategoryItemMenu } from './CategoryItemMenu'
import { usePos } from '../../../shared/hooks/usePos'

export const AsideMenu: React.FC = () => {

    const { categoryActive, filterProductsByCategory, getProductsToSale } = usePos()
    const { categories } = useCategories()
    const activeCategories = categories?.filter(cat => cat.isActive)

    useEffect(() => {
        if (categoryActive) {
            filterProductsByCategory(categoryActive)
        } else {
            getProductsToSale()
        }
    }, [categoryActive])

    return (
        <div className='border border-gray-300 p-5 h-screen bg-gray-50'>
            <ul className='flex flex-col gap-3 h-full'>
                <CategoryItemMenu
                    categoryId={''}
                    categoryName={'Todos'}
                    categoryIcon={'Categoría sin ícono'}
                />
                {
                    activeCategories?.map(cat => (
                        <CategoryItemMenu
                            categoryId={cat.id}
                            categoryName={cat.name}
                            categoryIcon={cat.icon}
                        />
                    ))
                }
            </ul>
        </div>
    )
}
