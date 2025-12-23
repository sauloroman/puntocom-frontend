import React from 'react'
import { CancelButton, ErrorMessageForm, Input, Label, SaveButton } from '../../../../../shared/components'
import { useModal, usePurchase, useTheme } from '../../../../../shared/hooks'
import { useForm } from 'react-hook-form'
import type { AddProduct, ProductInPurchase } from '../../../../../interfaces/purchase.interface'

interface Props {
    sellingPrice: number
}

export const FormAddProductPurchase: React.FC<Props> = ({ sellingPrice }) => {

    const { theme } = useTheme()
    const { onCloseModal } = useModal()
    const { onSelectProductToAddPurchase, onAddProductInPurchase, productSelectedToAdd } = usePurchase()
    const isDark = theme === 'dark'

    const { 
        handleSubmit, 
        register, 
        formState: { errors } 
    } = useForm<AddProduct>()

    const addProductToPurchase = ({ unitPrice, quantity }: AddProduct) => {
        const productInPurchase: ProductInPurchase = {
            product: productSelectedToAdd!,
            quantity: +quantity,
            unitPrice: +unitPrice
        }

        onAddProductInPurchase(productInPurchase)
        onCloseModal()
    }

    const closeModal = () => {
        onSelectProductToAddPurchase(null)
        onCloseModal()
    }

    return (
        <form onSubmit={handleSubmit(addProductToPurchase)} className="w-full">
            <div className="flex gap-7">

                <div className="flex-1">
                    <Label>Precio de Compra</Label>
                    <Input
                        {
                        ...register('unitPrice', {
                            required: 'El precio es requerido',
                            min: {
                                value: 0.01,
                                message: 'Precio mínimo $0.01'
                            }
                        })
                        }
                        className='h-20 font-semibold text-4xl no-scrollbar'
                        type='number'
                        step="0.01"
                    />
                    {errors.unitPrice && <ErrorMessageForm message={errors.unitPrice.message} />}
                    <span className={`
                                text-xs mt-1 block transition-colors
                                ${isDark ? 'text-gray-400' : 'text-gray-500'}
                            `}>
                        Precio de venta: ${sellingPrice.toFixed(2)}
                    </span>
                </div>

                <div className="flex-1">
                    <Label>Cantidad</Label>
                    <Input
                        {
                        ...register('quantity', {
                            required: 'La cantidad es requerida',
                            min: {
                                value: 1,
                                message: 'Mínimo 1'
                            }
                        })
                        }
                        className='h-20 font-semibold text-4xl no-scrollbar'
                        type='number'
                    />
                    {errors.quantity && <ErrorMessageForm message={errors.quantity.message} />}
                </div>
            </div>

            <div className='mt-6 flex items-center gap-4 w-full'>
                <SaveButton 
                    submit={true}
                    className='p-4 flex-1'
                    text='Agregar a compra'
                />
                <CancelButton
                    onClick={closeModal}
                    className='p-4 flex-1'
                    text='Cancelar'
                />
            </div>
        </form>
    )
}
