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
      <div className={`
        absolute bottom-10 left-1/3 w-80 h-80 rounded-full blur-3xl animate-pulse
        ${isDark
          ? 'bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 opacity-15'
          : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 opacity-25'
        }
      `}></div>

      <div className='relative flex flex-col justify-center w-full md:w-1/2 px-8 md:px-16 lg:px-20 z-10'>
        <div className='absolute right-[50%] top-5 translate-x-[50%]'>
          <img 
            className={`w-[150px] transition-all duration-200 ${isDark ? 'brightness-0 invert' : ''}`}
            src="https://res.cloudinary.com/dlamufioy/image/upload/v1755733945/puntocom/3_paawzo.png" 
            alt="PuntoCom Logo" 
          />
        </div>
        { children }
      </div>

      <div className='hidden md:flex w-1/2 relative z-10'>
        <img 
          src="https://source.unsplash.com/800x600/?coffee,technology"
          alt="Imagen de login"
          className={`
            object-cover w-full h-full transition-all duration-200
            ${isDark ? 'opacity-40 grayscale-[30%]' : 'opacity-100'}
          `}
        />
        {isDark && (
          <div className="absolute inset-0 bg-gray-900/60"></div>
        )}
      </div>
    </div>
  )
}