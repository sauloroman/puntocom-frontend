import React from 'react'
import { usePos } from '../../../shared/hooks/usePos'
import { useForm } from 'react-hook-form'
import { CancelButton, Input, Label } from '../../../shared/components'
import { AddToCartButton } from '../../../shared/components/button/AddToListCart'
import { useModal } from '../../../shared/hooks'

interface ProductInCartMeta {
    quantity: number,
    discount: number
}

export const FormAddProduct: React.FC = () => {
    const { productToAdd, onAddProductToCart } = usePos()
    const { onCloseModal } = useModal()
    const { 
        handleSubmit, 
        register, 
        formState: { errors } 
    } = useForm<ProductInCartMeta>()

    const addProductToCart = ({ quantity, discount }: ProductInCartMeta) => {
        onAddProductToCart({
            quantity: +quantity,
            discount: +discount,
            product: productToAdd!,
        })
        onCloseModal()
    }

    return (
        <form onSubmit={handleSubmit(addProductToCart)} className='w-full'>

            <div className="flex gap-7">
                <div>
                    <Label>Cantidad</Label>
                    <Input
                        {
                        ...register('quantity', {
                            required: true,
                            min: {
                                value: 1,
                                message: 'Mínimo 1'
                            },
                            max: {
                                value: productToAdd?.stock ?? 100,
                                message: 'No hay suficiente stock'
                            }
                        })
                        }
                        className='h-20 font-semibold text-4xl'
                        type='number'
                    />
                    {errors.quantity && (<p className=' text-red-600 mt-1 font-bold text-right text-md'>{errors.quantity.message}</p>)}
                </div>
                <div>
                    <Label>Descuento ($)</Label>
                    <Input
                        {
                        ...register('discount', {
                            min: {
                                value: 1,
                                message: 'Descuento no permitido'
                            },
                            max: {
                                value: productToAdd?.sellingPrice ?? 100,
                                message: 'Descuento excesivo'
                            }
                        })
                        }
                        className='h-20 font-semibold text-4xl'
                        type='number'
                    />
                    {errors.discount && (<p className=' text-red-600 mt-1 font-bold text-right text-md'>{errors.discount.message}</p>)}
                </div>
            </div>

            <div className='mt-4 flex items-center gap-4 w-full'>
                <AddToCartButton className='p-2 flex-1' submit text='Agregar al Carrito' />
                <CancelButton onClick={onCloseModal} className='p-2 flex-1' text='Cancelar' />
            </div>
        </form>
    )
}
