import React from 'react'
import { useForm } from 'react-hook-form'
import { useModal, useSuppliers } from '../../../../../shared/hooks'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { Input, Label } from '../../../../../shared/components'
import { LuAsterisk } from "react-icons/lu";
import { SaveButton } from '../../../../../shared/components/button/SaveButton'
import { CancelButton } from '../../../../../shared/components/button/CancelButton'
import type { CreateSupplier } from '../../../../../interfaces/supplier.interface'

const EmailRegEx: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegEx: RegExp = /^[0-9\s\-()+]*$/

export const ModalCreateSupplier: React.FC = () => {

    const {
        handleSubmit,
        register,
        formState: {errors}        
    } = useForm<CreateSupplier>()
    const { onCloseModal } = useModal()
    const { createSupplier } = useSuppliers()

    const onCreateSupplier = ( data: CreateSupplier ) => {
        createSupplier(data)
        onCloseModal()
    }

    return (
        <ModalLayout width={'w-2xl'}>
            <form onSubmit={handleSubmit(onCreateSupplier)} className='space-y-4'>

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
                        { errors.name && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.name.message}</p>)}
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
                        { errors.lastname && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.lastname.message}</p>)}
                    </div>
                </div>
                
                <div className="flex items-center gap-5 w-full">
                    <div className='w-80'>
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
                        { errors.phone && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.phone.message}</p>)}
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
                        { errors.email && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.email.message}</p>)}
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
                            placeholder='Calle 1. No. #1, Fraccionamiento A, Bloque B'
                            {
                                ...register('company', {
                                    required: 'La empresa es obligatoria'
                                })
                            }
                        />
                        { errors.company && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.company.message}</p>)}
                </div>

                <div className='flex items-center gap-5 justify-end mt-6'>
                    <div>
                        <SaveButton text='Guardar Proveedor' />
                    </div>
                    <div onClick={ onCloseModal }>
                        <CancelButton text='Cancelar' />
                    </div>
                </div>
            </form>
        </ModalLayout>
    )
}
