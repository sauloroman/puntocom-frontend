import React from 'react'
import { useTheme } from '../shared/hooks'

interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={`
      relative min-h-screen flex overflow-hidden transition-colors duration-200
      ${isDark ? 'bg-gray-900' : 'bg-white'}
    `}>

      <div className={`
        absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl animate-pulse
        ${isDark
          ? 'bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 opacity-20'
          : 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-30'
        }
      `}></div>
      <div className={`
        absolute top-1/3 -right-32 w-96 h-96 rounded-full blur-3xl animate-pulse
        ${isDark
          ? 'bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 opacity-20'
          : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30'
        }
      `}></div>

      <div className='relative flex flex-col justify-center w-full md:w-5/12 px-8 md:px-8 z-10'>
        {children}
      </div>

      <div className={`hidden md:flex w-7/12 relative z-10 border-l-2 ${ isDark ? 'border-l-gray-700' : 'border-l-gray-300'}`}>

        <div className="w-[90%] absolute z-10 top-[4%] left-[6%]">
          <div className='w-fit mb-4'>
            <span className='w-5 h-5 bg-indigo-700 rounded-full'></span> 
            <p className='bg-indigo-600 text-white rounded-full py-1 px-2'>PuntoCom</p>
          </div>
          <div className="">
            <h2 className={`font-bold text-3xl mb-3 ${isDark ? 'text-white' : 'text-gray-700'}`}>Impulsa tu negocio digital</h2>
            <p className={`text-lg ${isDark ? 'text-white' : 'text-gray-700'}`}>Con PuntoCom tienes acceso a todas las herramientas profesionales que necesitas <br /> para hacer crecer tu comercio electrónico</p>
          </div>
        </div>

        <img
          src={`${
                isDark
                ? "https://res.cloudinary.com/dlamufioy/image/upload/v1768278902/puntocom/Dise%C3%B1o_sin_t%C3%ADtulo_4_oswdzm.png"
                : "https://res.cloudinary.com/dlamufioy/image/upload/v1768278903/puntocom/Dise%C3%B1o_sin_t%C3%ADtulo_3_beh20d.png"
              }`}
          alt="Imagen de login"
          className={`w-full h-[600px] transition-all duration-200 rounded-4xl absolute left-[6%] bottom-[-2%] z-10`}
        />
        {isDark && (
          <div className="absolute inset-0 bg-gray-800/60"></div>
        )}
      </div>
    </div>
  )
}