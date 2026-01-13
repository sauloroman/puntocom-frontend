import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { AuthLayout } from '../../layouts'
import { useAuth, useTheme } from '../../shared/hooks'
import { Input, Label } from '../../shared/components/form'
import { LoginButton } from '../../shared/components/button'
import { ErrorMessageForm } from '../../shared/components/error-message'
import { SpinnerContainer } from '../../shared/components/spinner'

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
            flex items-center gap-2
            text-3xl font-bold mb-1 transition-colors duration-200
            ${isDark ? 'text-gray-100' : 'text-gray-900'}
          `}>
            <div className="w-7 h-7 bg-indigo-700 rounded-full"></div>
            <p>Bienvenido de vuelta</p>
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
            { errors.email && <ErrorMessageForm message={errors.email.message} />}
          </div>

          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor='password'>Contraseña</Label>
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
            { errors.password && <ErrorMessageForm message={errors.password.message} />}
          </div>
          
          <Link to='/auth/forgot-password'>
            <p className={`
              text-sm cursor-pointer transition-colors duration-200 text-right
              ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-500 hover:text-indigo-600'}
            `}>
              Olvidé mi contraseña
            </p>
          </Link>

          {
            isLoading
            ? <SpinnerContainer size='md' color='border-white' />
            : <LoginButton className='w-full p-4 mt-8' submit text='Iniciar Sesión' /> 
          }

        </form>
      </div>

    </div>
   </AuthLayout>
  )
}