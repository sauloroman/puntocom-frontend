import React from 'react'
import { useTheme } from '../../../../../shared/hooks'

interface Props {
    isValidated: boolean
}

export const UserValidateTag: React.FC<Props> = ({ isValidated }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <>
            {isValidated ? (
                <span 
                    className={`
                        px-3 py-1 text-xs font-semibold rounded-full
                        ${isDark 
                            ? "bg-blue-900/40 text-blue-300 border border-blue-700" 
                            : "bg-blue-100 text-blue-700 border border-blue-200"
                        }
                    `}
                >
                    Validado
                </span>
            ) : (
                <span 
                    className={`
                        opacity-70 px-3 py-1 text-xs font-semibold rounded-full
                        ${isDark 
                            ? "bg-blue-900/20 text-blue-400 border border-blue-800" 
                            : "bg-blue-50 text-blue-500 border border-blue-200"
                        }
                    `}
                >
                    No validado
                </span>
            )}
        </>
    )
}