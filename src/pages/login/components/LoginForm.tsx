import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useAuth, useTheme } from '../../../shared/hooks'
import { Input, Label } from '../../../shared/components/form'
import { ErrorMessageForm } from '../../../shared/components/error-message'
import { SpinnerContainer } from '../../../shared/components/spinner'
import { LoginButton } from '../../../shared/components/button'
import { TestCredentialsBanner } from './LoginTestCredentials'


interface LoginFormInputs {
  email: string
  password: string
}

export const LoginForm: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [showPassword, setShowPassword] = useState<boolean>(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: 'test@correo.com',
      password: 'testPass123..'
    }
  })

  const { isLoading, onLoginEmailPassword } = useAuth()

  const onSubmit = (data: LoginFormInputs) => {
    onLoginEmailPassword(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div>
        <Label className='mb-3' htmlFor='email'>Correo electrónico</Label>
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
        {errors.email && <ErrorMessageForm message={errors.email.message} />}
      </div>

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
              ...register('password', {
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
        {errors.password && <ErrorMessageForm message={errors.password.message} />}
      </div>

      <TestCredentialsBanner />
      
      
      <Link to='/auth/forgot-password'>
        <div className="flex justify-end w-full">
          <p className={`
            text-md border-b-2 pb-1 cursor-pointer transition-colors duration-200
            ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-500 hover:text-indigo-600'}
          `}>
            Olvidé mi contraseña
          </p>
        </div>
      </Link>

      {isLoading ? (
        <SpinnerContainer size='md' color='border-white' />
      ) : (
        <LoginButton className='w-full p-4 mt-8' submit text='Iniciar Sesión' /> 
      )}
    </form>
  )
}
