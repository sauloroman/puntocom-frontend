import React, { useEffect } from 'react'
import { useCategories, useProducts } from '../../../../../shared/hooks'
import { CategoryItemFilter } from './CategoryItemFilter'
import { SupplierItemFilter } from './SupplierItemFilter'

export const FilterTags: React.FC = () => {

    const { filter: { category, supplier }, onSetFilterCategory, onSetFilterSupplier, getProducts } = useProducts()
    const { categories } = useCategories()

    const categorySelected = categories?.find(cat => cat.id === category.id)

    const onResetCategoryFilter = () => {
        onSetFilterCategory(null, null, true)
    }

    const onResetSupplierFilter = () => {
        onSetFilterSupplier(null, null, true)
    }

    useEffect(() => {
        if (category.id === null ) {
            getProducts()
        }
    }, [category.id])

    useEffect(() => {
        if (supplier.id === null) {
            getProducts()
        }
    }, [supplier.id])

    return (
        <div className='flex flex-wrap gap-5 mb-5'>
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
            {
                supplier.id &&
                <div onClick={onResetSupplierFilter}>
                    <SupplierItemFilter
                        supplierId={supplier?.id ?? ''}
                        supplierName={supplier?.name ?? ''}
                    />
                </div>
            }
        </div>
    )
}
