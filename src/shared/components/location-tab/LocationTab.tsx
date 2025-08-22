import React, { useEffect } from 'react'
import { usePageName } from '../../hooks/usePageName'
import { useTabs } from '../../hooks'
import { FaAngleRight } from "react-icons/fa";

export const LocationTab: React.FC = () => {
    const { getPage } = usePageName()
    const [page, location] = getPage()
    const { tab, setActiveTab } = useTabs()
    const locationPath = `${location}${tab ? (' - ' + tab) : ''}`

    useEffect(() => {
        setActiveTab(undefined)
    }, [])

    return (
        <div className='flex justify-between items-center mb-2'>
            <h1 className='text-md font-bold uppercase ml-3'>{page}</h1>
            <div className='flex items-center gap-2'>
                <FaAngleRight className='text-indigo-400' />
                <p className='text-xs uppercase text-indigo-400 font-semibold'>{locationPath}</p>
            </div>
        </div>
    )
}
