import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { Input, Label } from '../../../shared/components/form'
import { ErrorMessageForm } from '../../../shared/components/error-message'
import type { ChangePasswordRequest } from '../../../interfaces/dto/auth.interface'
import { SaveButton } from '../../../shared/components/button'
import { useAuth, useTheme } from '../../../shared/hooks'

export const ChangePasswordForm: React.FC = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Omit<ChangePasswordRequest, 'token'>>({
        defaultValues: {
            newPassword: ''
        }
    })

    const params = useParams()
    const { changePassword } = useAuth()

    const onChangePassword = (data: Omit<ChangePasswordRequest, 'token'>) => {
        const { token } = params
        if (!token) return

        changePassword({
            token: token,
            newPassword: data.newPassword
        })
    }

    return (
        <form onSubmit={handleSubmit(onChangePassword)} className='space-y-6'>
            <div>
                <Label className='mb-3' htmlFor='password'>Contraseña</Label>
                <div className={`
                          border rounded-lg pr-4 flex justify-between items-center transition-colors duration-200
                          ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'}
                        `}>
                    <Input
                        className='border-none mr-2 bg-transparent'
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Ingresa tu contraseña'
                        {
                        ...register('newPassword', {
                            required: "La contraseña es obligatorio"
                        })
                        }
                    />
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className={`
                              cursor-pointer transition-colors duration-200
                              ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}
                            `}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>
                {errors.newPassword && <ErrorMessageForm message={errors.newPassword.message} />}
            </div>
            <div className="w-full">
                <SaveButton className='w-full p-4' text='Cambiar Contraseña' submit />
            </div>
        </form>
    )
}
