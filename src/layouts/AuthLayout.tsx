import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='relative min-h-screen flex bg-white overflow-hidden'>
      
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full blur-3xl opacity-25 animate-pulse"></div>

      <div className='relative flex flex-col justify-center w-full md:w-1/2 px-8 md:px-16 lg:px-20 z-10'>
        <div className='absolute right-[50%] top-5 translate-x-[50%]'>
          <img 
            className="w-[150px]" 
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
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )
}
