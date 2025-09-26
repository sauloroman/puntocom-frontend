import React from 'react'
import { useCategories } from '../../../../../shared/hooks'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { CreateProduct } from '../../../../../interfaces/product.interface'

interface SelectActiveCategoriesProps {
    register: UseFormRegister<CreateProduct>,
    errors: FieldErrors<CreateProduct>,

    selectedCategory?: string
}

export const SelectActiveCategories: React.FC<SelectActiveCategoriesProps> = ({ register, errors, selectedCategory = '' }) => {
    
    const {categories} = useCategories()
    const activeCategories = categories?.filter( cat => cat.isActive ) ?? [] 

    return (
        <div className='w-full'>
            <select 
                id="productSupplier"
                {
                    ...register('categoryId', {
                        required: { value: true, message: 'La categoría es obligatorio' }
                    })
                }
                className="
                    text-sm
                    appearance-none w-full px-4 py-2 pr-10 rounded-lg
                    bg-white text-gray-600
                    border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200
                    transition-all cursor-pointer
                "
                defaultValue={selectedCategory}
            >
                <option value="">Seleccione una categoría</option>
                {
                    activeCategories.map(cat => (
                        <option value={cat.id} key={cat.id}>{cat.name}</option>
                    ))
                }
            </select> 
            { errors.categoryId && <p className='text-red-600 mt-1 text-right text-xs'>{errors.categoryId.message}</p>}
        </div>
    )
}
