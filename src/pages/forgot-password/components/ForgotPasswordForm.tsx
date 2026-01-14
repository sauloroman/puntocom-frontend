import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input, Label } from '../../../shared/components/form'
import { SaveButton } from '../../../shared/components/button'
import { ErrorMessageForm } from '../../../shared/components/error-message'
import type { ForgotPasswordRequest } from '../../../interfaces/dto/auth.interface'
import { useAuth } from '../../../shared/hooks'

export const ForgotPasswordForm: React.FC = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ForgotPasswordRequest>({
        defaultValues: {
            email: ''
        }
    })

    const { sendEmailForgotPassword } = useAuth()

    const onSendEmailForgotPassword = ( data: ForgotPasswordRequest ) => {
        sendEmailForgotPassword(data)
        reset()
    }

    return (
        <div className='space-y-10'>
            <form onSubmit={ handleSubmit(onSendEmailForgotPassword) } className='space-y-6'>
                <div className='mb-8'>
                    <Label className='mb-4' htmlFor='email'>Ingresa tu correo electrónico</Label>
                    <Input
                        id='email'
                        type='email'
                        placeholder='Ingresa tu correo electrónico'
                        {
                            ...register('email', {
                                required: "El correo es obligatorio"
                            })
                        }
                    />
                    { errors.email && <ErrorMessageForm message={errors.email.message} /> }
                </div>

                <div className="w-full">
                    <SaveButton className='w-full p-4' text='Enviar Correo' submit />
                </div>
            </form>

            <div className="flex justify-start">
                <Link 
                    to={'/auth/login'} 
                    className={`font-semibold text-indigo-500 pb-1 border-b-2 border-b-indigo-500`}
                >&larr; Regresar a Inicio</Link>
            </div>
        </div>
    )
}
