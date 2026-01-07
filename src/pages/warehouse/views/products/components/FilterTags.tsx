import React from 'react'
import { useCategories, useProducts } from '../../../../../shared/hooks'
import { OutlineButton } from '../../../../../shared/components/button'
import { CategoryItemFilter, SupplierItemFilter } from './'

export const FilterTags: React.FC = () => {

    const { filter: { category, supplier }, onSetFilterCategory, onSetFilterSupplier, getProducts } = useProducts()
    const { categories } = useCategories()
    const categorySelected = categories?.find(cat => cat.id === category.id)

    const onResetFilter = () => {
        onSetFilterCategory(null, null, true)
        onSetFilterSupplier(null, null, true)
        getProducts()
    }

    return (
        <div className='flex justify-between items-center'>
            <div className='flex flex-wrap gap-5 mb-5'>
                {
                    category.id &&
                    <CategoryItemFilter
                        categoryId={categorySelected?.id ?? ''}
                        categoryName={categorySelected?.name ?? ''}
                        categoryIcon={categorySelected?.icon ?? ''}
                    />

                }
                {
                    supplier.id &&
                    <SupplierItemFilter
                        supplierId={supplier?.id ?? ''}
                        supplierName={supplier?.name ?? ''}
                    />

                }
            </div>
            {
                (category.id || supplier.id) && <OutlineButton onClick={onResetFilter}>
                    Eliminar filtros
                </OutlineButton> 
            }
        </div>
    )
}
