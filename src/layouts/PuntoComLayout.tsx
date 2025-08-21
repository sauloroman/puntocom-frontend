import React from 'react'
import { FaAngleDoubleLeft } from "react-icons/fa";
import { Menu } from '../shared/components';

interface PuntoComLayoutProps {
  children: React.ReactNode
}

export const PuntoComLayout: React.FC<PuntoComLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      
      <aside className="w-64 bg-gray-50 border-r border-gray-200 shadow-sm flex flex-col">
        <div className="h-14 flex items-center justify-between px-5 border-b border-gray-200">
          <div className="bg-gray-50 inline-block">
            <img
              className="w-25 mix-blend-multiply"
              src="https://res.cloudinary.com/dlamufioy/image/upload/v1755733945/puntocom/3_paawzo.png"
              alt="Logo PuntoCom"
            />
          </div>
          <div><FaAngleDoubleLeft /></div>
        </div>

        <div className="flex-1 px-6 py-4">
          <Menu />
        </div>
      </aside>

      <main className="flex-1">
        <header className='h-14 border-b border-blue-200'>
          <p>PuntoCom &gt; <span>Sales</span></p>
        </header>
        <p className='p-6 md:p-10'>
          {children}
        </p>
      </main>
    </div>
  )
}
