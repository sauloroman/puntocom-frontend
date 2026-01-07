import React from 'react'
import { useForm } from 'react-hook-form'
import { LuAsterisk } from 'react-icons/lu'
import { AlertType } from '../../../interfaces/ui/alert.interface'
import type { DateRange } from '../../../interfaces/ui/filter.interface'
import { ModalLayout } from '../../../layouts'
import { today } from '../../../shared/helpers'
import { useAlert, useModal } from '../../../shared/hooks'
import { CancelButton, SaveButton } from '../button'
import { Input, Label } from '../form'
import { ErrorMessageForm } from '../error-message'

interface Props {
    onSetFilterDates: (dateFrom: string, dateTo: string) => void
}

export const ModalRangeDates: React.FC<Props> = ({ onSetFilterDates }) => {

    const { onCloseModal } = useModal()
    const { activateAlert } = useAlert()

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        watch
    } = useForm<DateRange>()

    const dateStart = watch('dateStart')

    const onApplyFilter = (data: DateRange) => {
        const { dateStart, dateEnd } = data

        const fromDate = new Date(dateStart as string)
        const toDate = new Date(dateEnd as string)

        if (toDate < fromDate) {
            return activateAlert({ 
                title: 'Fechas no válidas',
                text: 'La fecha final debe ser mayor o igual a la inicial',
                type: AlertType.warning
            })
        }

        onSetFilterDates(fromDate.toISOString(), toDate.toISOString())
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
                            htmlFor='dateFrom'
                            className='mb-3 flex items-center justify-between gap-2'
                        >
                            Fecha Desde
                            <LuAsterisk size={15} className='text-indigo-600' />
                        </Label>
                        <Input
                            id='dateFrom'
                            type='date'
                            className='cursor-pointer'
                            max={today}
                            {
                                ...register('dateStart', {
                                    required: 'La fecha inicial es obligatoria'
                                })
                            }
                        />
                        {errors.dateStart && <ErrorMessageForm message={errors.dateStart.message} />}
                    </div>

                    <div className='flex-1'>
                        <Label
                            htmlFor='dateTo'
                            className='mb-3 flex items-center justify-between gap-2'
                        >
                            Fecha Hasta
                            <LuAsterisk size={15} className='text-indigo-600' />
                        </Label>
                        <Input
                            id='dateTo'
                            type='date'
                            className='cursor-pointer'
                            max={today}
                            {
                                ...register('dateEnd', {
                                    required: 'La fecha final es obligatoria',
                                    validate: {
                                        greaterThanFrom: (value) => {
                                            if (!dateStart ) return true
                                            return value! >= dateStart || 'La fecha final debe ser mayor o igual a la inicial'
                                        }
                                    }
                                })
                            }
                        />
                        {errors.dateEnd && <p className='text-red-600 mt-1 text-right text-xs'>{errors.dateEnd.message}</p>}
                    </div>
                </div>

                <div className='flex gap-7 w-full justify-end'>
                    <SaveButton
                        className='p-2 flex-1'
                        text='Aplicar Filtro'
                        onClick={handleSubmit(onApplyFilter)}
                    />
                    <CancelButton
                        className='p-2 flex-1'
                        onClick={handleCancel}
                        text='Cancelar'
                    />
                </div>
            </div>
        </ModalLayout>
    )
}