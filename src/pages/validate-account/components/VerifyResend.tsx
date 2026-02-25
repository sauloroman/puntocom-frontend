import React from 'react'
import { useTheme } from '../../../shared/hooks'

interface Props {
  onResend: () => void
}

export const VerifyResend: React.FC<Props> = ({ onResend }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className='flex justify-center'>
      <p className={`
        text-md transition-colors duration-200
        ${isDark ? 'text-gray-400' : 'text-gray-600'}
      `}>
        ¿No recibiste el código?{' '}
        <span
          onClick={onResend}
          className={`
            border-b-2 pb-1 cursor-pointer transition-colors duration-200
            ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-500 hover:text-indigo-600'}
          `}
        >
          Reenviar
        </span>
      </p>
    </div>
  )
}