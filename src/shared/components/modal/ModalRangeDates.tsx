import React from 'react'
import { ModalLayout } from '../../../layouts/ModalLayout'
import { useForm } from 'react-hook-form'
import { CancelButton, Input, Label, SaveButton } from '../../../shared/components'
import { LuAsterisk } from 'react-icons/lu'
import { useAlert, useModal } from '../../../shared/hooks'
import { AlertType } from '../../../interfaces/ui/alert.interface'
import { today } from '../../../shared/helpers/format-dates'
import type { DateRange } from '../../../interfaces/ui/filter.interface'

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

    const dateFrom = watch('dateFrom')

    const onApplyFilter = (data: DateRange) => {
        const { dateFrom, dateTo } = data

        const fromDate = new Date(dateFrom)
        const toDate = new Date(dateTo)

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
                                ...register('dateFrom', {
                                    required: 'La fecha inicial es obligatoria'
                                })
                            }
                        />
                        {errors.dateFrom && <p className='text-red-600 mt-1 text-right text-xs'>{errors.dateFrom.message}</p>}
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
                                ...register('dateTo', {
                                    required: 'La fecha final es obligatoria',
                                    validate: {
                                        greaterThanFrom: (value) => {
                                            if (!dateFrom) return true
                                            return value >= dateFrom || 'La fecha final debe ser mayor o igual a la inicial'
                                        }
                                    }
                                })
                            }
                        />
                        {errors.dateTo && <p className='text-red-600 mt-1 text-right text-xs'>{errors.dateTo.message}</p>}
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