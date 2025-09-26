import React from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { CreateProduct } from '../../../../../interfaces/product.interface'
import { useSuppliers } from '../../../../../shared/hooks'

interface SelectActiveSuppliersProps {
    register: UseFormRegister<CreateProduct>,
    errors: FieldErrors<CreateProduct>
}

export const SelectActiveSuppliers: React.FC<SelectActiveSuppliersProps> = ({ errors, register }) => {

    const { suppliers } = useSuppliers()
    const activeSuppliers = suppliers?.filter( sup => sup.isActive ) ?? []

    return (
        <div className='w-full'>
            <select 
                id="productSupplier"
                {
                    ...register('supplierId', {
                        required: { value: true, message: 'El proveedor es obligatorio' }
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
            >
                <option value="">Seleccione un proveedor</option>
                {
                    activeSuppliers.map(supp => (
                        <option value={supp.id} key={supp.id}>{supp.name} {supp.lastname}</option>
                    ))
                }
            </select>           
            { errors.supplierId && <p className='text-red-600 mt-1 text-right text-xs'>{errors.supplierId.message}</p>}
        </div>
    )
}
