import React from 'react'
import { LayoutAuth } from '../../layouts/LayoutAuth'
import { Button, Input, Label } from '../../shared/components'
import { useForm } from 'react-hook-form'

interface LoginFormInputs {
  email: string,
  password: string
}

export const Login: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>()

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Login Data:', data )
  }

  return (
   <LayoutAuth>
    <div className='flex flex-col justify-center w-full px-8 md:px-10 lg:px-16'>
      <h2 className='text-3xl font-bold text-gray-900 mb-6'>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div>
          <Label htmlFor='email'>Correo electrónico</Label>
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
          { errors.email && (<p className='text-sm text-red-600 mt-1 text-right text-xs'>{errors.email.message}</p>)}
        </div>

        <div>
          <Label htmlFor='password'>Contraseña</Label>
          <Input 
            id='password'
            type='password'
            placeholder='Ingresa tu contraseña'
            {
              ...register('password', {
                required: "La contraseña es obligatorio"
              })
            }
          />
          { errors.password && (<p className='text-sm text-red-600 mt-1 text-right text-xs'>{errors.password.message}</p>)}
        </div>

        <Button className='cursor-pointer' type='submit'>Ingresar</Button>
      </form>
    </div>
   </LayoutAuth>
  )
}
