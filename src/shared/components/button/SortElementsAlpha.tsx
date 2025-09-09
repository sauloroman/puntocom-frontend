import React from 'react'
import { BsSortAlphaDown } from "react-icons/bs";
import { BsSortAlphaUp } from "react-icons/bs";

interface SortElementsAlphaProps {
    onToggle: (status: boolean) => void,
    desc: boolean, 
}

export const SortElementsAlpha: React.FC<SortElementsAlphaProps> = ({ onToggle, desc }) => {
  return (
    <button className='cursor-pointer border border-gray-300 p-2 rounded-lg' onClick={() => onToggle(!desc)}>
        {
            !desc
            ? (<BsSortAlphaDown size={20} />)
            : (<BsSortAlphaUp size={20} />)
        }
    </button>
  )
}
