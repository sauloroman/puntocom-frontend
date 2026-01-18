import React from 'react'
import { BsInfoCircle } from "react-icons/bs"
import { useTheme } from '../../../shared/hooks'

export const TestCredentialsBanner: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={`
      mb-6 p-4 rounded-lg border-l-4 transition-colors
      ${isDark 
        ? 'bg-blue-900/20 border-blue-500' 
        : 'bg-blue-50 border-blue-500'
      }
    `}>
      <div className="flex items-start gap-3">
        <BsInfoCircle className={`
          mt-0.5 flex-shrink-0
          ${isDark ? 'text-blue-400' : 'text-blue-600'}
        `} size={20} />
        <div className="flex-1">
          <p className={`
            text-sm font-semibold mb-2
            ${isDark ? 'text-blue-300' : 'text-blue-800'}
          `}>
            Credenciales de prueba
          </p>
          <div className={`
            text-xs space-y-1
            ${isDark ? 'text-blue-200' : 'text-blue-700'}
          `}>
            <p><span className="font-medium">Usuario:</span> test@correo.com</p>
            <p><span className="font-medium">Contraseña:</span> testPass123..</p>
          </div>
        </div>
      </div>
    </div>
  )
}
