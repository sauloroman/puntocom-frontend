import React from 'react'
import { CiGrid41 } from "react-icons/ci"
import { CiBoxList } from "react-icons/ci"
import { useTheme } from '../../hooks'

interface ToggleGridTableViewProps {
    status: boolean,
    onToggle: ( status: boolean ) => void
}

export const ToggleGridTableViewButton: React.FC<ToggleGridTableViewProps> = ({ onToggle, status }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
        <button 
            className={`
                cursor-pointer border p-2 rounded-lg transition-colors duration-200
                ${isDark
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }
            `}
            onClick={() => onToggle(!status)}
        >
            {
                status
                ? (<CiGrid41 size={20} />)
                : (<CiBoxList size={20} />)
            }
        </button>
    )
}