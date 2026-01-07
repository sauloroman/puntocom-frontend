import React from 'react'
import { IoMdArrowBack } from "react-icons/io"
import { useNavPage, useTheme } from '../../../shared/hooks'
import { SearchProductPos } from './'

export const Header: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { goToPage } = useNavPage()

    return (
        <header className={`
            flex p-4 justify-between items-center border-b transition-colors
            ${isDark 
                ? 'border-b-gray-700 bg-gray-900' 
                : 'border-b-gray-300 bg-white'
            }
        `}>
            <div className='flex items-center gap-5'>
                <IoMdArrowBack 
                    onClick={() => goToPage('/')} 
                    className={`
                        cursor-pointer transition-colors
                        ${isDark 
                            ? 'text-gray-300 hover:text-gray-100' 
                            : 'text-gray-700 hover:text-gray-900'
                        }
                    `}
                    size={30} 
                />
            </div>
            <SearchProductPos />
        </header>
    )
}