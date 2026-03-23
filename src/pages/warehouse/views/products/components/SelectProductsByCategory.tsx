import React from 'react'
import { Select } from '../../../../../shared/components/select'
import { useCategories, useProducts } from '../../../../../shared/hooks'

export const SelectProductsByCategory: React.FC = () => {
    const { activeCategories } = useCategories()
    if ( !activeCategories ) return null

    const { onSetFilterProductsByCategory } = useProducts()

    const categoryNames = activeCategories.map( c => c.name )

    const onChange = ( categoryName: string ) => {
        if ( categoryName === 'Categorías') return null
        
        const categoryId = activeCategories.find( c => c.name === categoryName)?.id

        onSetFilterProductsByCategory({
            id: categoryId!,
            name: categoryName,
        })
    }
    
    return (
        <Select 
            onChange={onChange}
            placeholder='Categorías'
            options={categoryNames}
        />
    )
}
