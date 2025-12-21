import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { AuthLayout } from '../../layouts/AuthLayout'
import { Button, Input, Label, SpinnerContainer } from '../../shared/components'
import { useForm } from 'react-hook-form'
import { useAuth, useTheme } from '../../shared/hooks'

interface LoginFormInputs {
  email: string,
  password: string
}

export const Login: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [showPassword, setShowPassword] = useState<boolean>(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>()

  const { isLoading, onLoginEmailPassword } = useAuth()

  const onSubmit = (data: LoginFormInputs) => {
    onLoginEmailPassword( data )
  }

  return (
   <AuthLayout>
    <div className="w-full px-8 md:px-10 lg:px-16">
      <div className='flex flex-col justify-center'>  
        <div className="mb-8">
          <h2 className={`
            text-3xl font-bold mb-1 transition-colors duration-200
            ${isDark ? 'text-gray-100' : 'text-gray-900'}
          `}>
            Bienvenido de vuelta
          </h2>
          <p className={`
            transition-colors duration-200
            ${isDark ? 'text-gray-400' : 'text-gray-600'}
          `}>
            Comienza iniciando sesión con tus credenciales
          </p>
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
            { errors.email && (<p className='text-red-600 mt-1 text-right text-xs'>{errors.email.message}</p>)}
          </div>

          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor='password'>Contraseña</Label>
              <Link to='/auth/forgot-password'>
                <p className={`
                  text-sm cursor-pointer transition-colors duration-200
                  ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-500 hover:text-indigo-600'}
                `}>
                  Olvidé mi contraseña
                </p>
              </Link>
            </div>
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
                  ...register('password', {
                    required: "La contraseña es obligatorio"
                  })
                }
              />
              <div 
                onClick={ () => setShowPassword(!showPassword) } 
                className={`
                  cursor-pointer transition-colors duration-200
                  ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}
                `}
              >
                { showPassword ? <FaEyeSlash /> : <FaEye /> }
              </div>
            </div>
            { errors.password && (<p className='text-red-600 mt-1 text-right text-xs'>{errors.password.message}</p>)}
          </div>

          <Button 
            className={`
              cursor-pointer rounded-lg w-full p-2
              bg-[length:200%_auto] hover:bg-[position:right_center]
              transition-all duration-1000 text-white
              ${isDark
                ? 'bg-[linear-gradient(to_right,#4C1D95_0%,#5B21B6_51%,#6D28D9_100%)] shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                : 'bg-[linear-gradient(to_right,#005C97_0%,#363795_51%,#005C97_100%)] shadow-[0_0_20px_#eee]'
              }
            `}
            type='submit'
          >
            { isLoading ? <SpinnerContainer size='md' color='border-white' /> : 'Iniciar sesión'}
          </Button>
        </form>
      </div>

    </div>
   </AuthLayout>
  )
}