import React from 'react'
import { FaAngleDoubleLeft } from "react-icons/fa"
import { IoMenuOutline } from "react-icons/io5"
import { LocationTab } from '../shared/components/location-tab'
import { useMenu, useTheme } from '../shared/hooks'
import { Menu } from '../shared/components/menu'

interface PuntoComLayoutProps {
  children: React.ReactNode
}

export const PuntoComLayout: React.FC<PuntoComLayoutProps> = ({ children }) => {

  const { collapsed, closeMenu, openMenu, openMenuMobile, closeMenuMobile, isMobileMenuOpen } = useMenu()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const toggleMenu = () => collapsed ? closeMenu() : openMenu()

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>

      <button
        onClick={openMenuMobile}
        className={`
          lg:hidden fixed top-4 left-4 z-30 p-2 rounded-md shadow-lg cursor-pointer border-2 border-gray-300
          ${isDark
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            : 'bg-white text-gray-700 hover:bg-gray-100'
          }
        `}
      >
        <IoMenuOutline className="w-6 h-6" />
      </button>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-70 z-40 lg:hidden"
          onClick={closeMenuMobile}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen z-50
          border-r shadow-sm flex flex-col
          transition-all duration-300          
          lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          ${collapsed ? 'w-64 lg:w-20' : 'w-[300px] md:w-64'}
          ${isDark
            ? 'bg-gray-800 border-gray-700'
            : 'bg-gray-50 border-gray-200'
          }
        `}
      >
        <div
          className={`
            h-14 flex items-center justify-between px-3 border-b
            ${collapsed && 'lg:text-xl lg:justify-center'}
            ${isDark ? 'border-gray-700' : 'border-gray-200'}
          `}
        >
          {(!collapsed || isMobileMenuOpen) && (
            <div className={`inline-block ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <img
                className="w-24 object-contain"
                src={`${
                  !isDark 
                  ? "https://res.cloudinary.com/dlamufioy/image/upload/v1755733945/puntocom/3_paawzo.png"
                  : "https://res.cloudinary.com/dlamufioy/image/upload/v1762972429/puntocom/PUNTOCAF%C3%89_3_njxbc4.png"
                }`}
                alt="Logo PuntoCom"
              />
            </div>
          )}
          <div
            className={`
              cursor-pointer p-1 rounded-md transition-colors
              ${isDark
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-200 text-gray-700'
              }
            `}
            onClick={toggleMenu}
          >
            <FaAngleDoubleLeft
              className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <Menu 
            collapsed={collapsed} 
            mobileOpen={isMobileMenuOpen}
            onMobileClose={closeMenuMobile}
          />
        </div>
      </aside>

      <main
        className={`
          md:p-6 transition-all duration-300          
          ml-0
          ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}
        `}
      >
        <LocationTab />
        {children}
      </main>
    </div>
  )
}