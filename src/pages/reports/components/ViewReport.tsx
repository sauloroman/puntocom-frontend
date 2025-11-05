import React from 'react'
import { useReports } from '../../../shared/hooks'
import { IoDocumentTextOutline } from "react-icons/io5";

export const ViewReport: React.FC = () => {

  const { urlReportSelected } = useReports()

  return (
    <div className='mt-5 w-full h-full'>
      {urlReportSelected ? (
        <iframe
          src={urlReportSelected}
          className="w-full h-[85vh] no-scrollbar overflow-y-scroll border rounded"
        />
      ) : (
        <div className='flex flex-col gap-5 h-full justify-center items-center border border-gray-200 rounded-lg'>
            <IoDocumentTextOutline size={100} color='gray' />
            <p>No hay reporte seleccionado</p>
        </div>
      )}
    </div>
  )
}
