import React from 'react'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { useForm } from 'react-hook-form'
import { type CreateProduct } from '../../../../../interfaces/product.interface'
import { CancelButton, Input, Label, SaveButton, Textarea } from '../../../../../shared/components'
import { LuAsterisk } from 'react-icons/lu'
import { useCategories, useModal, useSuppliers } from '../../../../../shared/hooks'
import { useProducts } from '../../../../../shared/hooks/useProducts'

export const ModalCreateProduct: React.FC = () => {

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<CreateProduct>()

    const { onCloseModal } = useModal()
    const { onCreateProduct } = useProducts()
    const { allCategories } = useCategories()
    const { allSuppliers } = useSuppliers()

    const onCreateProductAc = (data: CreateProduct) => {
        const { stock, stockMin, sellingPrice } = data
        if (sellingPrice < 0 || stock < 0 || stockMin < 0) return

        const productData = {
            ...data,
            stock: Number(stock),
            stockMin: Number(stockMin),
            sellingPrice: Number(sellingPrice),
        }

        onCreateProduct(productData)
        onCloseModal()
        reset()
    }

    return (
        <ModalLayout width='w-3xl'>
            <form onSubmit={handleSubmit(onCreateProductAc)} className='space-y-7'>
                <div>
                    <Label
                        htmlFor='productName'
                        className='mb-3 flex items-center justify-between gap-2'
                    >
                        Nombre del producto
                        <LuAsterisk size={15} className='text-indigo-600' />
                    </Label>
                    <Input
                        id='productName'
                        placeholder='CocaCola 600ml'
                        type='text'
                        {
                        ...register('name', {
                            required: 'El nombre del producto es obligatorio',
                            minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                            maxLength: { value: 100, message: 'Máximo 100 caracteres' }
                        })
                        }
                    />
                    {errors.name && <p className='text-red-600 mt-1 text-right text-xs'>{errors.name.message}</p>}
                </div>

                <div className='flex gap-5 w-full items-center'>
                    <div className='flex-1'>
                        <Label
                            htmlFor='productSellingPrice'
                            className='mb-3 flex items-center justify-between gap-2'
                        >
                            Precio de venta $
                            <LuAsterisk size={15} className='text-indigo-600' />
                        </Label>
                        <Input
                            id='productSellingPrice'
                            placeholder='$25.00'
                            min={1}
                            {
                            ...register('sellingPrice', {
                                required: 'Obligatorio',
                                min: 1,
                            })
                            }
                        />
                        {errors.sellingPrice && <p className='text-red-600 mt-1 text-right text-xs'>{errors.sellingPrice.message}</p>}
                    </div>
                    <div className='flex-1'>
                        <Label
                            htmlFor='stock'
                            className='mb-3 flex items-center justify-between gap-2'
                        >
                            Stock
                            <LuAsterisk size={15} className='text-indigo-600' />
                        </Label>
                        <Input
                            id='stock'
                            placeholder='15'
                            min={1}
                            {
                            ...register('stock', {
                                required: 'Obligatorio',
                                min: 1,
                            })
                            }
                        />
                        {errors.stock && <p className='text-red-600 mt-1 text-right text-xs'>{errors.stock.message}</p>}
                    </div>
                    <div className='flex-1'>
                        <Label
                            htmlFor='stockMin'
                            className='mb-3 flex items-center justify-between gap-2'
                        >
                            Stock Mínimo
                            <LuAsterisk size={15} className='text-indigo-600' />
                        </Label>
                        <Input
                            id='stockMin'
                            placeholder='5'
                            min={1}
                            {
                            ...register('stockMin', {
                                required: 'Obligatorio',
                                min: 1,
                            })
                            }
                        />
                        {errors.stockMin && <p className='text-red-600 mt-1 text-right text-xs'>{errors.stockMin.message}</p>}
                    </div>
                </div>
                <div className='flex items-center gap-7'>

                    <div className='w-full'>
                        <Label htmlFor='productCategory' className='mb-3 flex items-center justify-between gap-2'>
                            Categoría del producto
                            <LuAsterisk size={15} className='text-indigo-600' />
                        </Label>
                        <select
                            id="productCategory"
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
                        >
                            <option value="">Seleccione una categoría</option>
                            {allCategories?.map(cat => (<option value={cat.id} key={cat.id}>{cat.name}</option>))}
                        </select>
                        {errors.categoryId && <p className='text-red-600 mt-1 text-right text-xs'>{errors.categoryId.message}</p>}
                    </div>

                    <div className='w-full'>
                        <Label htmlFor='productSupplier' className='mb-3 flex items-center justify-between gap-2'>
                            Proveedor del producto
                            <LuAsterisk size={15} className='text-indigo-600' />
                        </Label>
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
                                allSuppliers?.map(supp => (
                                    <option value={supp.id} key={supp.id}>{supp.name} {supp.lastname} - {supp.company}</option>
                                ))
                            }
                        </select>           
                        { errors.supplierId && <p className='text-red-600 mt-1 text-right text-xs'>{errors.supplierId.message}</p>}
                    </div>
                </div>
                <div>
                    <Label className='mb-3 flex items-center justify-between gap-2'>Descripción del producto</Label>
                    <Textarea
                        placeholder='Coloca la descripción del producto'
                        rows={4}
                        {
                        ...register('description', {
                            maxLength: { value: 220, message: 'Máximo 220 caracteres' }
                        })
                        }
                    />
                    {errors.description && <p className='text-red-600 mt-1 text-right text-xs'>{errors.description.message}</p>}
                </div>
                <div className='flex gap-7 w-full justify-end'>
                    <SaveButton text='Guardar Producto' submit />
                    <div onClick={onCloseModal}><CancelButton text='Cancelar' /></div>
                </div>

            </form>
        </ModalLayout>
    )
}
