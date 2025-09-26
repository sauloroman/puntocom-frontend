import React from 'react'
import { FilterProductsByCategories } from './FilterProductsByCategories'
import { CategoryItemFilter } from './CategoryItemFilter'
import { useCategories, useProducts } from '../../../../../shared/hooks'

export const SelectFilterCategory: React.FC = () => {
    const { filter: {category}, onSetFilterCategory, getProducts } = useProducts()
    const { categories } = useCategories()

    const categorySelected = categories?.find(cat => cat.id === category.id)

    const onResetCategoryFilter = () => {
        onSetFilterCategory('', '', true)
        getProducts()
    }

    return (
        <div className={`flex gap-2`}>
            {
                category.id &&  
                <div onClick={onResetCategoryFilter}>
                    <CategoryItemFilter 
                        categoryId={categorySelected?.id ?? ''}
                        categoryName={categorySelected?.name ?? ''}
                        categoryIcon={categorySelected?.icon ?? ''}
                    />
                </div>
            }
            <FilterProductsByCategories />
        </div>
    )
}
