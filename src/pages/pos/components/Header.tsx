import React from 'react'
import { SearchProductPos } from './'
import { IoMdArrowBack } from "react-icons/io";
import { useNavPage } from '../../../shared/hooks';

export const Header: React.FC = () => {

  const { goToPage } = useNavPage()

  return (
    <header className='flex p-4 justify-between items-center border-b border-b-gray-300'>
      <div className='flex items-center gap-5'>
        <IoMdArrowBack onClick={() => goToPage('/')} className='cursor-pointer' size={30} />
        
      </div>
      <SearchProductPos />
    </header>
  )
}
