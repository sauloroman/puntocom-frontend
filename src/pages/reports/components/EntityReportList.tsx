import React from 'react'
import { IoIosFolderOpen } from "react-icons/io";

const entitiesTitle: string[] = ["Usuarios", "Productos", "Proveedores", "Compras"]

export const EntityReportList: React.FC = () => {
    return (
        <div className='grid grid-cols-4 gap-5 w-full'>
            {
                entitiesTitle.map( entity => (
                    <div className='flex flex-col items-center gap-1 cursor-pointer transition hover:scale-110'>
                        <IoIosFolderOpen size={100} color='#e5e5e5' />
                        <p className='uppercase text-sm font-semibold text-gray-600 '>{entity}</p>
                    </div>
                ))
            }
        </div>
    )
}
