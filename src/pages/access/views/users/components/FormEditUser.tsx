import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LuAsterisk } from 'react-icons/lu'
import { Roles, type UpdateUser } from '../../../../../interfaces/dto/user.interface'
import { AlertType } from '../../../../../interfaces/ui/alert.interface'
import { useAlert, useDrawer, useUsers, useTheme } from '../../../../../shared/hooks'
import { Input, Label } from '../../../../../shared/components/form'
import { CancelButton, SaveButton } from '../../../../../shared/components/button'
import { ErrorMessageForm } from '../../../../../shared/components/error-message'

export const FormEditUser: React.FC = () => {

    const { userSelected, updateUser } = useUsers()
    const { onCloseDrawers } = useDrawer()
    const { activateAlert } = useAlert()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<UpdateUser>({
        defaultValues: {
            name: userSelected?.name,
            lastname: userSelected?.lastname,
            role: userSelected?.role as Roles,
            phone: userSelected?.phone
        }
    })

    const onEditUser = (data: UpdateUser) => {
        if (!userSelected) return

        if (data.name === userSelected.name &&
            data.lastname === userSelected.lastname &&
            data.role === userSelected.role &&
            data.phone === userSelected.phone
        ) {
            activateAlert({
                title: 'No hay cambios',
                text: 'No has actualizado la información del usuario',
                type: AlertType.warning
            })
        }

        updateUser(userSelected.id!, data)
        onCloseDrawers()
    }

    useEffect(() => {
        if (userSelected) {
            reset({
                name: userSelected.name,
                lastname: userSelected.lastname,
                role: userSelected.role as Roles
            })
        }
    }, [userSelected, reset])

    return (
        <form onSubmit={handleSubmit(onEditUser)} className='space-y-6'>
            <div className="flex items-center flex-col gap-5 w-full">
                <div className="flex-1 w-full">
                    <Label htmlFor='userName' className='mb-3 flex items-center justify-between gap-2'>
                        Nombre del usuario
                        <LuAsterisk size={15} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
                    </Label>
                    <Input
                        autoComplete='off'
                        id='userName'
                        type='text'
                        placeholder='Nombre del usuario'
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
                <div className="flex-1 w-full">
                    <Label htmlFor='userLastname' className='mb-3 flex items-center justify-between gap-2'>
                        Apellido del usuario
                        <LuAsterisk size={15} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
                    </Label>
                    <Input
                        autoComplete='off'
                        id='userLastname'
                        type='text'
                        placeholder='Apellido del usuario'
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
                
                <div className="flex-1 w-full">
                    <Label htmlFor='userRole' className='mb-3 flex items-center justify-between gap-2'>
                        Rol del usuario
                        <LuAsterisk size={15} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
                    </Label>
                    <select
                        className={`
                            w-full px-3 py-2 border rounded-lg text-sm 
                            focus:outline-none focus:ring-2 transition-colors
                            ${isDark 
                                ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500' 
                                : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                            }
                        `}
                        id='userRole'
                        {
                        ...register('role', {
                            required: 'El rol es obligatorio'
                        })
                        }
                    >
                        <option value="" className={isDark ? 'bg-gray-700' : 'bg-white'}>
                            Selecciona un rol
                        </option>
                        <option value={Roles.ADMINISTRADOR} className={isDark ? 'bg-gray-700' : 'bg-white'}>
                            Administrador
                        </option>
                        <option value={Roles.SUPERVISOR} className={isDark ? 'bg-gray-700' : 'bg-white'}>
                            Supervisor
                        </option>
                        <option value={Roles.VENDEDOR} className={isDark ? 'bg-gray-700' : 'bg-white'}>
                            Vendedor
                        </option>
                    </select>
                    {errors.role && <ErrorMessageForm message={errors.role.message} />}
                </div>

                <div className='flex items-center gap-5 justify-end mt-6 w-full'>
                    <SaveButton className='w-52 p-2' submit text='Editar Usuario' />
                    <CancelButton onClick={onCloseDrawers} className='w-48 p-2' text='Cancelar' />
                </div>
            </div>
        </form>
    )
}