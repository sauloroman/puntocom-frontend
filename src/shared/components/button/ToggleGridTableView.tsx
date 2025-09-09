import React from 'react'
import { CiGrid41 } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";

interface ToggleGridTableViewProps {
    status: boolean,
    onToggle: ( status: boolean ) => void
}

export const ToggleGridTableView: React.FC<ToggleGridTableViewProps> = ({ onToggle, status }) => {
    return (
        <button className='cursor-pointer border border-gray-300 p-2 rounded-lg' onClick={() => onToggle(!status)}>
            {
                status
                ? (<CiGrid41 size={20} />)
                : (<CiBoxList size={20} />)
            }
        </button>
    )
}
