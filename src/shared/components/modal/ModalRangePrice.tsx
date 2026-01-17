import React from 'react'
import { useForm } from 'react-hook-form'
import { LuAsterisk } from 'react-icons/lu'
import type { PriceRange } from '../../../interfaces/ui/filter.interface'
import { ModalLayout } from '../../../layouts'
import { useModal } from '../../../shared/hooks'
import { CancelButton, SaveButton } from '../button'
import { Input, Label } from '../form'
import { ErrorMessageForm } from '../error-message'

interface Props {
    onSetFilterPrices: ( minPrice: number, maxPrice: number ) => void
}

export const ModalRangePrices: React.FC<Props> = ({ onSetFilterPrices }) => {

    const { onCloseModal } = useModal()

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
        onSetFilterPrices(Number(minPrice), Number(maxPrice))
        handleCancel()
    }   

    const handleCancel = () => {
        reset()
        onCloseModal()
    }

    return (
        <ModalLayout width='w-xl'>
            <div className='space-y-7'>
                <div className='flex flex-col md:flex-row gap-4 md:gap-5 w-full items-stretch md:items-center'>
                    
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
                        {errors.minPrice && <ErrorMessageForm message={errors.minPrice.message} />}
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
                        {errors.maxPrice && <ErrorMessageForm message={errors.maxPrice.message} />}
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-3 sm:gap-7 w-full sm:justify-end'>
                    <SaveButton
                        className='p-2 w-full sm:flex-1'
                        text='Aplicar Filtro'
                        onClick={handleSubmit(onApplyFilter)}
                    />
                    <CancelButton
                        className='p-2 w-full sm:flex-1'
                        onClick={handleCancel}
                        text='Cancelar'
                    />
                </div>
            </div>
        </ModalLayout>
    )
}