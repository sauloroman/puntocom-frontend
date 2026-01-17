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
   <AuthLayout
    imageDark='https://res.cloudinary.com/dlamufioy/image/upload/v1768278902/puntocom/Dise%C3%B1o_sin_t%C3%ADtulo_4_oswdzm.png'
    imageWhite='https://res.cloudinary.com/dlamufioy/image/upload/v1768278903/puntocom/Dise%C3%B1o_sin_t%C3%ADtulo_3_beh20d.png'
   >
    <div className="w-full px-2 md:px-10 lg:px-8">
      <div className='flex flex-col justify-center'>  
        
        <div className="flex justify-center">
          <img
            src={`${
                  isDark
                  ? "https://res.cloudinary.com/dlamufioy/image/upload/v1768623303/puntocom/Blue_and_Black_Minimalist_Brand_Logo_2_hlv0zb.png"
                  : "https://res.cloudinary.com/dlamufioy/image/upload/v1755733945/puntocom/3_paawzo.png"
                }`}
            alt="Imagen de login"
            className='fixed top-5 right-5 w-36 md:right-15 md:top-0 md:absolute md:w-42 mb-2'
          />
        </div>

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
            { errors.email && <ErrorMessageForm message={errors.email.message} />}
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
            <div className="flex justify-end w-full">
              <p className={`
                text-md border-b-2 pb-1 cursor-pointer transition-colors duration-200
                ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-500 hover:text-indigo-600'}
              `}>
                Olvidé mi contraseña
              </p>
            </div>
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