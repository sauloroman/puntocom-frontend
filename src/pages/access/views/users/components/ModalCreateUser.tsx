import React from 'react'
import { useForm } from 'react-hook-form'
import { LuAsterisk } from 'react-icons/lu'
import { ModalLayout } from '../../../../../layouts'
import { Roles, type CreateUser } from '../../../../../interfaces/dto/user.interface'
import { EmailRegEx, PasswordRegEx } from '../../../../../shared/utils/regexp'
import { useModal, useUsers, useTheme } from '../../../../../shared/hooks'
import { CancelButton, SaveButton } from '../../../../../shared/components/button'
import { Input, Label } from '../../../../../shared/components/form'
import { ErrorMessageForm } from '../../../../../shared/components/error-message'

export const ModalCreateUser: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

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
                            <LuAsterisk size={15} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
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
                        {errors.name && <ErrorMessageForm message={errors.name.message} />}
                    </div>
                    <div className='flex-1'>
                        <Label htmlFor='userLastname' className='mb-3 flex items-center justify-between gap-2'>
                            Apellido del usuario
                            <LuAsterisk size={15} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
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
                        {errors.lastname && <ErrorMessageForm message={errors.lastname.message} />}
                    </div>
                </div>
                    <div className="flex-1 w-full">
                        <Label htmlFor='userPhone' className='mb-3 flex items-center justify-between gap-2'>
                            Número de teléfono
                            <LuAsterisk size={15} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
                        </Label>
                        <Input
                            autoComplete='off'
                            id='userPhone'
                            type='text'
                            placeholder='Teléfono de contacto'
                            {
                            ...register('phone', {
                                required: 'El número es obligatorio',
                                maxLength: { value: 12, message: 'Máximo 12 caracteres' }
                            })
                            }
                        />
                        {errors.phone && <ErrorMessageForm message={errors.phone.message} />}
                    </div>
                <div className="w-full">
                    <Label htmlFor='userRole' className='mb-3 flex items-center justify-between gap-2'>
                        Rol del usuario
                        <LuAsterisk size={15} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
                    </Label>
                    <select
                        className={`
                            w-full px-3 py-2 border rounded-lg text-sm transition-all
                            focus:outline-none focus:ring-2
                            ${isDark
                                ? 'bg-gray-800 text-gray-200 border-gray-600 focus:ring-indigo-500'
                                : 'bg-white text-gray-600 border-gray-300 focus:ring-indigo-500'
                            }
                        `}
                        id='userRole'
                        {
                        ...register('role', {
                            required: 'El rol es obligatorio'
                        })
                        }
                    >
                        <option value="" defaultValue={"Selecciona un rol"}>Selecciona un rol</option>
                        <option value={Roles.ADMINISTRADOR}>Administrador</option>
                        <option value={Roles.SUPERVISOR}>Supervisor</option>
                        <option value={Roles.VENDEDOR}>Vendedor</option>
                    </select>
                    {errors.role && <ErrorMessageForm message={errors.role.message} />}
                </div>
                <div className='w-full'>
                    <Label htmlFor='userEmail' className='mb-3 flex items-center justify-between gap-2'>
                        Email
                        <LuAsterisk size={15} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
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
                    {errors.email && <ErrorMessageForm message={errors.email.message} />}
                </div>
                <div className='w-full'>
                    <Label htmlFor='userPassword' className='mb-3 flex items-center justify-between gap-2'>
                        Contraseña
                        <LuAsterisk size={15} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
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
                    {errors.password && <ErrorMessageForm message={errors.password.message} />}
                </div>

                <div className='flex items-center gap-5 justify-end mt-6 w-full'>
                    <SaveButton className='p-2 flex-1' submit text='Guardar Usuario' />
                    <CancelButton className='p-2 flex-1' onClick={onCloseModal} text='Cancelar' />
                </div>
            </form>
        </ModalLayout>
    )
}