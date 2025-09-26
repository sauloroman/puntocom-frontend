import React from 'react'
import { LeftDrawerLayout } from '../../../../../layouts/LeftDrawerLayout'
import { useCategories } from '../../../../../shared/hooks'
import { CategoryItemFilter } from './CategoryItemFilter'

export const FilterProductsByCategoryDrawer: React.FC = () => {
    const { categories } = useCategories()
    const activeCategories = categories?.filter( cat => cat.isActive ) ?? [] 

    return (
        <LeftDrawerLayout width='w-xl' title='Filtrar productos por categoría'>
            <h2 className="text-xl mb-8 font-semibold">Categorías de productos</h2>
            <ul className='flex flex-wrap gap-4'>
                {
                    activeCategories.map((cat) => (
                        <CategoryItemFilter
                            categoryId={cat.id}
                            categoryName={cat.name}
                            categoryIcon={cat.icon} 
                        />
                    ))
                }
            </ul>
        </LeftDrawerLayout>
    )
}
