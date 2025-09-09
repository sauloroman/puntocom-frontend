import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { ConfirmButton, Input, Label } from '../../../../../shared/components'
import { useAuth, useModal, useUsers } from '../../../../../shared/hooks';
import type { CheckAdminPassword } from '../../../../../interfaces/user.interface';
import { ModalNames } from '../../../../../interfaces/ui/modal.interface';

export const ModalRequestPasswordAdmin: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false)

    const { user } = useAuth()
    const { checkAdminPassword, hasEnteredPasswordCorrectly } = useUsers()
    const { handleSubmit, register, formState: { errors } } = useForm<CheckAdminPassword>()
    const { onOpenModal } = useModal()

    const onCheckAdminCredentials = ( data: CheckAdminPassword ) => {
        checkAdminPassword({ 
            id: user!.id,
            adminPassword: data.adminPassword 
        })
    }

    useEffect(() => {
        if ( hasEnteredPasswordCorrectly ) {
            onOpenModal(ModalNames.createUser)
        }
    }, [hasEnteredPasswordCorrectly])

    return (
        <ModalLayout width='w-xl'>
            <div className="flex flex-col items-center justify-center text-center space-y-4 p-6">
                    <div className="flex items-center justify-center w-full gap-5 p-2 rounded-full bg-yellow-100 text-yellow-600">
                        <RiLockPasswordLine size={32} />
                        <h2 className="text-xl font-semibold text-gray-800">Contraseña</h2>
                    </div>
                    <p>Ingresa la contraseña de administrador para realizar esta acción</p>

                    <form className='w-full' onSubmit={ handleSubmit(onCheckAdminCredentials) }>
                        <div className='mb-5'>
                            <Label htmlFor='adminPass7word' className='mb-5 flex items-center justify-between w-full'>
                                Ingrese su contraseña
                                <div className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}>{ showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} /> }</div>
                            </Label>
                            <Input 
                                id='adminPassword'
                                placeholder='***************'
                                type={showPassword ? 'text' : 'password'}
                                {
                                    ...register('adminPassword', {
                                        required: 'La contraseña es obligatoria'
                                    })
                                }
                            />
                            { errors.adminPassword && (<p className='text-red-600 mt-1 text-right text-xs'>{errors.adminPassword.message}</p>)}
                        </div>
                        <div className='w-full flex justify-end items-center'>
                            <ConfirmButton text='Ingresar contraseña' />
                        </div>
                    </form>

                </div>
        </ModalLayout>
    )
}
