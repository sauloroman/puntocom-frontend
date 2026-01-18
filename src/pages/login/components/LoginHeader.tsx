import React from 'react'
import { useTheme } from '../../../shared/hooks'

export const LoginHeader: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <>
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
    </>
  )
}