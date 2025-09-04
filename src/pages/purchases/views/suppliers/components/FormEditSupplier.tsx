import React, { useEffect } from 'react'
import { useAlert, useDrawer, useSuppliers } from '../../../../../shared/hooks'
import { useForm } from 'react-hook-form'
import { type UpdateSupplier } from '../../../../../interfaces/supplier.interface'
import { CancelButton, Input, Label, SaveButton } from '../../../../../shared/components'
import { LuAsterisk } from 'react-icons/lu'
import { EmailRegEx, phoneRegEx } from '../../../../../shared/utils/regexp'
import { AlertType } from '../../../../../interfaces/ui/alert.interface'

export const FormEditSupplier: React.FC = () => {

    const { supplierSelected, updateSupplier } = useSuppliers()
    const { onCloseDrawers } = useDrawer()
    const { activateAlert } = useAlert()

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<UpdateSupplier>({
        defaultValues: {
            name: supplierSelected?.name,
            address: supplierSelected?.address,
            company: supplierSelected?.company,
            email: supplierSelected?.email,
            lastname: supplierSelected?.lastname,
            phone: supplierSelected?.phone
        }
    })

    const onEditSupplier = (data: UpdateSupplier) => {
        if (!supplierSelected) return

        if (
            data.name === supplierSelected.name &&
            data.address === supplierSelected.address &&
            data.company === supplierSelected.company &&
            data.email === supplierSelected.email &&
            data.lastname === supplierSelected.lastname &&
            data.phone === supplierSelected.phone
        ) {
            activateAlert({
                title: 'No hay cambios',
                text: 'No has actualizado la información del proveedor',
                type: AlertType.warning
            })
            return
        }

        // construir el payload dinámico
        const payload: Partial<UpdateSupplier> = {
            name: data.name,
            lastname: data.lastname,
            phone: data.phone,
            company: data.company,
            address: data.address,
        }

        // solo agregamos email si cambió
        if (data.email !== supplierSelected.email) {
            payload.email = data.email
        }

        updateSupplier(supplierSelected.id!, payload)
        onCloseDrawers()
    }


    useEffect(() => {
        if (supplierSelected) {
            reset({
                name: supplierSelected.name,
                lastname: supplierSelected.lastname,
                address: supplierSelected.address,
                company: supplierSelected.company,
                email: supplierSelected.email,
                phone: supplierSelected.phone,
            })
        }
    }, [supplierSelected, reset])

    return (
        <form onSubmit={handleSubmit(onEditSupplier)} className='space-y-6'>
            <div className="flex items-center gap-5 w-full">
                <div className='flex-1'>
                    <Label htmlFor='supplierName' className='mb-3 flex items-center justify-between gap-2'>
                        Nombre del proveedor
                        <LuAsterisk size={15} className='text-indigo-600' />
                    </Label>
                    <Input
                        autoComplete='off'
                        id='supplierName'
                        type='text'
                        placeholder='Ej. Saulo Román'
                        {
                        ...register('name', {
                            required: 'El nombre es obligatorio',
                            minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                            maxLength: { value: 100, message: 'Máximo 100 caracteres' }
                        })
                        }
                    />
                    {errors.name && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.name.message}</p>)}
                </div>
                <div className='flex-1'>
                    <Label htmlFor='supplierLastname' className='mb-3 flex items-center justify-between gap-2'>
                        Apellido del proveedor
                        <LuAsterisk size={15} className='text-indigo-600' />
                    </Label>
                    <Input
                        autoComplete='off'
                        id='supplierLastname'
                        type='text'
                        placeholder='Ej. Santillán Nava'
                        {
                        ...register('lastname', {
                            required: 'El apellido es obligatorio',
                            minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                            maxLength: { value: 100, message: 'Máximo 100 caracteres' }
                        })
                        }
                    />
                    {errors.lastname && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.lastname.message}</p>)}
                </div>
            </div>

            <div className="flex items-center gap-5 w-full">
                <div className='w-full'>
                    <Label htmlFor='supplierPhone' className='mb-3 flex items-center justify-between gap-2'>
                        Teléfono
                        <LuAsterisk size={15} className='text-indigo-600' />
                    </Label>
                    <Input
                        id='supplierPhone'
                        type='tel'
                        placeholder='449-654-80-73'
                        {
                        ...register('phone', {
                            required: 'El teléfono es obligatorio',
                            pattern: {
                                value: phoneRegEx,
                                message: 'El teléfono no tiene un formato válido'
                            }
                        })
                        }
                    />
                    {errors.phone && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.phone.message}</p>)}
                </div>
                <div className='w-full'>
                    <Label htmlFor='supplierEmail' className='mb-3 flex items-center justify-between gap-2'>
                        Email
                        <LuAsterisk size={15} className='text-indigo-600' />
                    </Label>
                    <Input
                        id='supplierEmail'
                        type='email'
                        placeholder='correo@correo.com'
                        {
                        ...register('email', {
                            required: 'El email es obligatorio',
                            pattern: {
                                value: EmailRegEx,
                                message: 'El correo no tiene un formato válido'
                            }
                        })
                        }
                    />
                    {errors.email && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.email.message}</p>)}
                </div>
            </div>

            <div className='w-full'>
                <Label htmlFor='supplierCompany' className='mb-3 flex items-center justify-between gap-2'>
                    Empresa
                    <LuAsterisk size={15} className='text-indigo-600' />
                </Label>
                <Input
                    id='supplierCompany'
                    type='text'
                    placeholder='RomanCode'
                    {
                    ...register('company', {
                        required: 'La empresa es obligatoria'
                    })
                    }
                />
                {errors.company && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.company.message}</p>)}
            </div>

            <div className='w-full'>
                <Label htmlFor='supplierAddress' className='mb-3 flex items-center justify-between gap-2'>
                    Dirección
                    <LuAsterisk size={15} className='text-indigo-600' />
                </Label>
                <Input
                    id='supplierAddress'
                    type='text'
                    placeholder='Calle A, Colonia B, Ciudad C'
                    {
                    ...register('address', {
                        maxLength: { value: 200, message: 'La dirección no puede ser mayor a 200 caracteres' }
                    })
                    }
                />
                {errors.address && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.address.message}</p>)}
            </div>

            <div className='flex items-center gap-5 justify-end mt-8'>
                <div>
                    <SaveButton text='Editar Proveedor' />
                </div>
                <div onClick={onCloseDrawers}>
                    <CancelButton text='Cancelar' />
                </div>
            </div>
        </form>
    )
}
