import React from 'react'
import { useReports, useTheme } from '../../../shared/hooks'
import { IoDocumentTextOutline } from "react-icons/io5"

export const ViewReport: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const { urlReportSelected } = useReports()

  return (
    <div className='mt-5 w-full h-full'>
      {urlReportSelected ? (
        <iframe
          src={urlReportSelected}
          className={`
            w-full h-[85vh] no-scrollbar overflow-y-scroll border rounded transition-colors
            ${isDark ? 'border-gray-700' : 'border-gray-200'}
          `}
        />
      ) : (
        <div className={`
          flex flex-col gap-5 h-full justify-center items-center border rounded-lg transition-colors
          ${isDark 
            ? 'border-gray-700 bg-gray-800/50' 
            : 'border-gray-200 bg-white'
          }
        `}>
          <IoDocumentTextOutline 
            size={100} 
            color={isDark ? '#6b7280' : 'gray'} 
          />
          <p className={`
            transition-colors
            ${isDark ? 'text-gray-400' : 'text-gray-700'}
          `}>
            No hay reporte seleccionado
          </p>
        </div>
      )}
    </div>
  )
}