import React, { useEffect } from 'react'
import { FaAngleDoubleLeft } from "react-icons/fa";
import { LocationTab, Menu } from '../shared/components';
import { useMenu } from '../shared/hooks';

interface PuntoComLayoutProps {
  children: React.ReactNode
}

export const PuntoComLayout: React.FC<PuntoComLayoutProps> = ({ children }) => {
  
  const { collapsed, closeMenu, openMenu } = useMenu()
  const toggleMenu = () => collapsed ? closeMenu() : openMenu()

  return (
    <div className="flex min-h-screen bg-white">
      
      <aside
        className={`
          bg-gray-50 border-r border-gray-200 shadow-sm flex flex-col
          transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}
        `}
      >

        <div className={`h-14 flex items-center justify-between px-3 border-b border-gray-200 ${collapsed && 'text-xl justify-center'}`}>
          {!collapsed && (
            <div className="bg-gray-50 inline-block">
              <img
                className="w-25 mix-blend-multiply"
                src="https://res.cloudinary.com/dlamufioy/image/upload/v1755733945/puntocom/3_paawzo.png"
                alt="Logo PuntoCom"
              />
            </div>
          )}
          <div
            className='cursor-pointer p-1 hover:bg-gray-200 rounded-md transition-colors'
            onClick={toggleMenu}
          >
            <FaAngleDoubleLeft className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </div>
        </div>

        <div className="flex-1 p-4">
          <Menu collapsed={collapsed} />
        </div>

      </aside>

      <main className="flex-1 p-6 md:p-4">
        <LocationTab />
        {children}
      </main>
    </div>
  )
}
