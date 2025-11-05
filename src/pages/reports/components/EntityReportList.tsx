import React from 'react'
import { IoIosFolderOpen } from "react-icons/io";
import { useReports } from '../../../shared/hooks';
import type { ReportEntities } from '../../../store/reports/reports.slice';

const entitiesTitle: string[] = ["users", "products", "suppliers", "purchases"]

const getSpanishNameEntity = ( entity: string ) => {
    switch( entity ) {
        case 'users':
            return 'usuarios'
        case 'products':
            return 'productos'
        case 'suppliers':
            return 'proveedores'
        case 'purchases':
            return 'compras'
    } 
}

export const EntityReportList: React.FC = () => {
    const { onSelectedReports } = useReports()

    return (
        <div className='grid grid-cols-4 gap-5 w-full'>
            {
                entitiesTitle.map( entity => (
                    <div onClick={ () => onSelectedReports(entity as ReportEntities)} key={entity} className='flex flex-col items-center gap-1 cursor-pointer transition hover:scale-110'>
                        <IoIosFolderOpen size={60} color='#e5e5e5' />
                        <p className='uppercase text-sm font-semibold text-gray-600 '>{getSpanishNameEntity(entity)}</p>
                    </div>
                ))
            }
        </div>
    )
}
