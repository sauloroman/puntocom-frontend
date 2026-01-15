import React, { useEffect } from 'react'
import { usePageName } from '../../hooks/usePageName'
import { useTabs, useTheme } from '../../hooks'
import { FaAngleRight } from "react-icons/fa";

export const LocationTab: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const { getPage } = usePageName()
    const [page, location] = getPage()
    const { tab, setActiveTab } = useTabs()
    const locationPath = `${location}${tab ? (' - ' + tab) : ''}`

    useEffect(() => {
        setActiveTab(undefined)
    }, [])

    return (
        <div className='flex justify-end md:justify-between items-center h-20 md:h-10 mb-4'>
            <h1 className={`text-xl font-bold uppercase md:ml-3 md:mr-0 mr-3 ${isDark && 'text-white'}`}>{page}</h1>
            <div className='hidden md:flex items-center gap-2'>
                <FaAngleRight className='text-indigo-400' />
                <p className='text-xs uppercase text-indigo-400 font-semibold'>{locationPath}</p>
            </div>
        </div>
    )
}
