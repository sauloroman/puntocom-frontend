import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuAsterisk } from "react-icons/lu";

import type { CreateSupplier } from '../../../../../interfaces/dto/supplier.interface'
import { AlertType } from '../../../../../interfaces/ui/alert.interface'
import { ModalLayout } from '../../../../../layouts'
import { useAlert, useModal, useSuppliers, useTheme } from '../../../../../shared/hooks'
import { EmailRegEx, phoneRegEx } from '../../../../../shared/utils/regexp'
import { Input, Label } from '../../../../../shared/components/form'
import { CancelButton, SaveButton, SmallButton } from '../../../../../shared/components/button';
import { ErrorMessageForm } from '../../../../../shared/components/error-message';

export const ModalCreateSupplier: React.FC = () => {

    const [createNewCompany, setCreateNewCompany] = useState<boolean>(false)
    const [newCompany, setNewCompany] = useState<string>('')

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<CreateSupplier>()

    const { onCloseModal } = useModal()
    const { activateAlert } = useAlert()
    const { createSupplier, getUniqueCompanies, companies } = useSuppliers()
    const { theme } = useTheme()

    const onCreateSupplier = (data: CreateSupplier) => {

        if (newCompany && companies?.includes(newCompany)) {
            activateAlert({
                title: 'Empresa Existente',
                text: 'La empresa que intentas crear ya está entre las opciones',
                type: AlertType.warning
            })
            return
        }

        if (newCompany) {
            createSupplier({
                ...data,
                company: newCompany
            })
        } else {
            createSupplier(data)
        }

        onCloseModal()
    }

    useEffect(() => {
        getUniqueCompanies()
    }, [])

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
                        {errors.name && <ErrorMessageForm message={errors.name.message} />}
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
                        {errors.lastname && <ErrorMessageForm message={errors.lastname.message} />}
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
                        {errors.phone && <ErrorMessageForm message={errors.phone.message} />}
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
                        {errors.email && <ErrorMessageForm message={errors.email.message} />}
                    </div>
                </div>

                {
                    createNewCompany
                        ? (
                            <div className='w-full'>
                                <Label htmlFor='supplierCompany' className='mb-3 flex items-center justify-between gap-2'>
                                    Nueva Empresa
                                    <LuAsterisk size={15} className='text-indigo-600' />
                                </Label>
                                <Input
                                    id='supplierCompany'
                                    type='text'
                                    placeholder='RomanCode'
                                    name='newCompany'
                                    value={newCompany}
                                    onChange={e => setNewCompany(e.target.value)}
                                />
                            </div>
                        )
                        : (
                            <div className='w-full'>
                                <Label htmlFor='supplierCompany' className='mb-3 flex items-center justify-between gap-2'>
                                    Empresa
                                    <LuAsterisk size={15} className='text-indigo-600' />
                                </Label>
                                <select
                                    className={`
                                        text-sm appearance-none w-full px-4 py-2 pr-10 rounded-lg
                                        border focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200
                                        transition-all cursor-pointer
                                        ${theme === 'light'
                                            ? 'bg-white text-gray-600 border-gray-300'
                                            : 'bg-gray-800 text-gray-200 border-gray-700'}
                                    `}
                                    id="selectSupplierCompany"
                                    {
                                        ...register('company', {
                                            required: 'La empresa es obligatoria'
                                        })
                                    }
                                >
                                    {
                                        companies?.map(com => (
                                            <option
                                                key={com}
                                                value={com}
                                                className={theme === 'light' ? 'bg-white text-gray-700' : 'bg-gray-800 text-gray-100'}
                                            >
                                                {com}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        )
                }
                {errors.company && <ErrorMessageForm message={errors.company.message} />}

                <div className='w-fit' onClick={() => setCreateNewCompany(!createNewCompany)}>
                    <SmallButton text={!createNewCompany ? 'Crear Nueva Empresa' : 'Seleccionar Empresa'} />
                </div>

                <div className='flex items-center gap-5 justify-end mt-6'>
                    <SaveButton className='p-2 w-52' submit text='Guardar Proveedor' />
                    <CancelButton onClick={onCloseModal} className='p-2 w-48' text='Cancelar' />
                </div>
            </form>
        </ModalLayout>
    )
}
