import React, { useEffect } from 'react'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { useSuppliers } from '../../../../../shared/hooks';

export const ModalSupplierReport: React.FC = () => {

    const { report } = useSuppliers()

    useEffect(() => {
        if (report) {
            fetch(report)
            .then(res => res.blob())
            .then(blob => {
                const pdfBlob = new Blob([blob], { type: 'application/pdf' })
                const url = URL.createObjectURL(pdfBlob)
                window.open(url, '_blank')
            })
            .catch(err => {
                console.error("Error al abrir PDF:", err)
            })
        }
    }, [report])

    return (
        <ModalLayout width='w-6xl'>
            <div className="flex items-center justify-center h-[300px]">
                <img src={report} alt="" />
                <p className="text-gray-600">Generando y descargando reporte...</p>
            </div>
        </ModalLayout>
    )
}
