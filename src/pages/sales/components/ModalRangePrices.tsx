import React from 'react'
import { ModalLayout } from '../../../layouts/ModalLayout'
import { useForm } from 'react-hook-form'
import { CancelButton, Input, Label, SaveButton } from '../../../shared/components'
import { LuAsterisk } from 'react-icons/lu'
import { useAlert, useModal, useSale } from '../../../shared/hooks'
import { AlertType } from '../../../interfaces/ui/alert.interface'
import type { PriceRange } from '../../../interfaces/sale.interface'

export const ModalRangePrices: React.FC = () => {

    const { filterSalesByPrice, onSetFilterUser } = useSale()
    const { onCloseModal } = useModal()
    const { activateAlert } = useAlert()

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        watch
    } = useForm<PriceRange>()

    const minPrice = watch('minPrice')

    const onApplyFilter = (data: PriceRange) => {
        const { minPrice, maxPrice } = data

        if (minPrice < 0 || maxPrice < 0) {
            return activateAlert({ 
                title: 'Límites no validos',
                text: 'No es posible colocar un valor negativo',
                type: AlertType.warning
            })
        }

        filterSalesByPrice(Number(minPrice), Number(maxPrice))
        onSetFilterUser(null, null, true)
        handleCancel()
    }   

    const handleCancel = () => {
        reset()
        onCloseModal()
    }

    return (
        <ModalLayout width='w-xl'>
            <div className='space-y-7'>
                <div className='flex gap-5 w-full items-center'>
                    
                    <div className='flex-1'>
                        <Label
                            htmlFor='minPrice'
                            className='mb-3 flex items-center justify-between gap-2'
                        >
                            Precio Mínimo $
                            <LuAsterisk size={15} className='text-indigo-600' />
                        </Label>
                        <Input
                            id='minPrice'
                            placeholder='$0.00'
                            type='number'
                            step='0.01'
                            min={0}
                            {
                                ...register('minPrice', {
                                    required: 'El precio mínimo es obligatorio',
                                    min: { value: 0, message: 'El precio no puede ser negativo' }
                                })
                            }
                        />
                        {errors.minPrice && <p className='text-red-600 mt-1 text-right text-xs'>{errors.minPrice.message}</p>}
                    </div>

                    <div className='flex-1'>
                        <Label
                            htmlFor='maxPrice'
                            className='mb-3 flex items-center justify-between gap-2'
                        >
                            Precio Máximo $
                            <LuAsterisk size={15} className='text-indigo-600' />
                        </Label>
                        <Input
                            id='maxPrice'
                            placeholder='$0.00'
                            type='number'
                            step='0.01'
                            min={0}
                            {
                                ...register('maxPrice', {
                                    required: 'El precio máximo es obligatorio',
                                    min: { value: 0, message: 'El precio no puede ser negativo' },
                                    validate: {
                                        greaterThanMin: (value) => {
                                            const min = Number(minPrice)
                                            const max = Number(value)
                                            if (!isNaN(min) && !isNaN(max)) {
                                                return max >= min || 'El precio máximo debe ser mayor o igual al mínimo'
                                            }
                                            return true
                                        }
                                    }
                                })
                            }
                        />
                        {errors.maxPrice && <p className='text-red-600 mt-1 text-right text-xs'>{errors.maxPrice.message}</p>}
                    </div>
                </div>

                <div className='flex gap-7 w-full justify-end'>
                    <SaveButton
                        className='p-2 w-54'
                        text='Aplicar Filtro'
                        onClick={handleSubmit(onApplyFilter)}
                    />
                    <CancelButton
                        className='p-2'
                        onClick={handleCancel}
                        text='Cancelar'
                    />
                </div>
            </div>
        </ModalLayout>
    )
}