import React from 'react'
import { Link } from 'react-router-dom'
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
    <div className="w-full px-8 md:px-10 lg:px-16">
      <div>
        <img className="w-[200px]" src="https://res.cloudinary.com/dlamufioy/image/upload/v1755733945/puntocom/3_paawzo.png" alt="PuntoCom Logo" />
      </div>
      <div className='flex flex-col justify-center'>  
        <div className="mb-8">
          <h2 className='text-3xl font-bold text-gray-900 mb-1'>Bievenido de vuelta</h2>
          <p>Comienza iniciando sesión con tus credenciales</p>
        </div>

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
            <div className="flex justify-between items-center">
              <Label htmlFor='password'>Contraseña</Label>
              <Link to='/auth/forgot-password'>
                <p className="text-sm underline text-indigo-500 cursor-pointer">Olvidé mi contraseña</p>
              </Link>
            </div>
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

          <Button className='
            cursor-pointer
            bg-[linear-gradient(to_right,#005C97_0%,#363795_51%,#005C97_100%)]
            bg-[length:200%_auto]
            hover:bg-[position:right_center]
            transition-all duration-1000
            text-white
            shadow-[0_0_20px_#eee]
            rounded-lg
            w-full
          ' type='submit'>Ingresar</Button>
        </form>
      </div>

    </div>
   </LayoutAuth>
  )
}
