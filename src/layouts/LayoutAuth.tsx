import React from 'react'

interface LayoutAuthProps {
    children: React.ReactNode
}

export const LayoutAuth: React.FC<LayoutAuthProps> = ({ children }) => {
  return (
     <div className='min-h-screen flex bg-white'>
      <div className='flex flex-col justify-center w-full md:w-1/2 px-8 md:px-16 lg:px-24'>
        { children }
      </div>
      <div className='hidden md:flex w-1/2'>
        <img 
          src="https://source.unsplash.com/800x600/?coffee,technology"
          alt="Imagen de login"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )
}
