import React, { useEffect } from 'react'
import { useAlert, useDrawer, useUsers } from '../../../../../shared/hooks'
import { useForm } from 'react-hook-form'
import { Roles, type UpdateUser } from '../../../../../interfaces/user.interface'
import { CancelButton, Input, Label, SaveButton } from '../../../../../shared/components'
import { LuAsterisk } from 'react-icons/lu'
import { AlertType } from '../../../../../interfaces/ui/alert.interface'

export const FormEditUser: React.FC = () => {

    const { userSelected, updateUser } = useUsers()
    const { onCloseDrawers } = useDrawer()
    const { activateAlert } = useAlert()

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
        }
    })

    const onEditUser = (data: UpdateUser) => {
        if (!userSelected) return

        if ( data.name === userSelected.name &&
            data.lastname === userSelected.lastname &&
            data.role === userSelected.role
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
        if ( userSelected ) {
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
                        <LuAsterisk size={15} className='text-indigo-600' />
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
                    {errors.name && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.name.message}</p>)}
                </div>
                <div className="flex-1 w-full">
                    <Label htmlFor='userLastname' className='mb-3 flex items-center justify-between gap-2'>
                        Apellido del usuario
                        <LuAsterisk size={15} className='text-indigo-600' />
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
                    {errors.lastname && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.lastname.message}</p>)}
                </div>
                <div className="flex-1 w-full">
                    <Label htmlFor='userLastname' className='mb-3 flex items-center justify-between gap-2'>
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
                    {errors.role && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.role.message}</p>)}
                </div>
                <div className='flex items-center gap-5 justify-end mt-6 w-full'>
                    <div>
                        <SaveButton submit text='Editar Usuario' />
                    </div>
                    <div onClick={onCloseDrawers}>
                        <CancelButton text='Cancelar' />
                    </div>
                </div>
            </div>
        </form>
    )
}
