import React, { useEffect } from 'react'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { useForm } from 'react-hook-form'
import { Roles, type CreateUser } from '../../../../../interfaces/user.interface'
import { CancelButton, Input, Label, SaveButton } from '../../../../../shared/components'
import { LuAsterisk } from 'react-icons/lu'
import { EmailRegEx, PasswordRegEx } from '../../../../../shared/utils/regexp'
import { useModal, useUsers } from '../../../../../shared/hooks'

export const ModalCreateUser: React.FC = () => {

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<CreateUser>()
    
    const { createUser } = useUsers()
    const { onCloseModal } = useModal()

    const onCreateUser = (data: CreateUser) => {
        createUser(data)
        onCloseModal()
    }

    return (
        <ModalLayout width={'w-xl'} >
            <form onSubmit={handleSubmit(onCreateUser)} className='flex-2 space-y-4 mb-4'>
                <div className="flex items-center gap-5 w-full">
                    <div className='flex-1'>
                        <Label htmlFor='userName' className='mb-3 flex items-center justify-between gap-2'>
                            Nombre del usuario
                            <LuAsterisk size={15} className='text-indigo-600' />
                        </Label>
                        <Input
                            autoComplete='off'
                            id='userName'
                            type='text'
                            placeholder='Ej. Carlos Salvador'
                            {
                                ...register('name', {
                                    required: 'El nombre es obligatorio',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                                    maxLength: { value: 60, message: 'Máximo 60 caracteres' }
                                })
                            }
                        />
                        {errors.name && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.name.message}</p>)}
                    </div>
                    <div className='flex-1'>
                        <Label htmlFor='userLastname' className='mb-3 flex items-center justify-between gap-2'>
                            Apellido del usuario
                            <LuAsterisk size={15} className='text-indigo-600' />
                        </Label>
                        <Input
                            autoComplete='off'
                            id='userLastname'
                            type='text'
                            placeholder='Ej. Santillán Nava'
                            {
                                ...register('lastname', {
                                    required: 'El apellido es obligatorio',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                                    maxLength: { value: 60, message: 'Máximo 60 caracteres' }
                                })
                            }
                        />
                        {errors.lastname && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.lastname.message}</p>)}
                    </div>
                </div>
                <div className="w-full">
                    <Label htmlFor='userRole' className='mb-3 flex items-center justify-between gap-2'>
                        Rol del usuario
                        <LuAsterisk size={15} className='text-indigo-600' />
                    </Label>
                    <select
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                        id='userRole'
                        {
                            ...register('role', {
                                required: 'El rol es obligatorio'
                            })
                        }
                    >
                        <option value="" defaultValue={"Selecciona un rol"}>Selecciona un rol</option>
                        <option value={Roles.ADMINISTRADOR}>
                            
                            Administrador
                        </option>
                        <option value={Roles.SUPERVISOR}>Supervisor</option>
                        <option value={Roles.VENDEDOR}>Vendedor</option>
                    </select>
                    { errors.role && (<p className='text-red-600 mt-1 text-right text-xs'>{errors.role.message}</p>)}
                </div>
                <div className='w-full'>
                    <Label htmlFor='userEmail' className='mb-3 flex items-center justify-between gap-2'>
                        Email
                        <LuAsterisk size={15} className='text-indigo-600' />
                    </Label>
                    <Input
                        id='userEmail'
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
                <div className='w-full'>
                    <Label htmlFor='userPassword' className='mb-3 flex items-center justify-between gap-2'>
                        Contraseña
                        <LuAsterisk size={15} className='text-indigo-600' />
                    </Label>
                    <Input
                        id='userPassword'
                        type='password'
                        placeholder='Crea una contraseña'
                        {
                            ...register('password', {
                                required: 'El password es obligatorio',
                                pattern: {
                                    value: PasswordRegEx,
                                    message: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un caracter especial'
                                }
                            })
                        }
                    />
                    {errors.password && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.password.message}</p>)}
                </div>
                
                <div className='flex items-center gap-5 justify-end mt-6 w-full'>
                    <SaveButton className='p-2 flex-1' submit text='Guardar Usuario' />
                    <CancelButton className='p-2 flex-1' onClick={onCloseModal} text='Cancelar' />
                </div>
            </form>
        </ModalLayout>
    )
}
