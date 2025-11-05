import React, { useEffect, useState } from 'react'
import { useReports } from '../../../shared/hooks'
import type { ReportItem } from '../../../interfaces/report.interface'
import { TableReportsButtons } from './'

export const TableReports: React.FC = () => {

    const { allReports, selectedReports } = useReports()
    const [reportsToRender, setReportsToRender] = useState<ReportItem[]>([])

    useEffect(() => {
        if (allReports && selectedReports in allReports) {
            setReportsToRender(allReports[selectedReports])
        } else {
            setReportsToRender([])
        }
    }, [allReports, selectedReports])

    return (
        <div className="border h-[500px] border-gray-300 rounded-lg overflow-hidden mb-5 mt-5">
            <div className="overflow-y-auto">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-gray-50 text-indigo-600 text-xs uppercase tracking-wide sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Id Reporte</th>
                            <th className="px-4 py-3 text-left font-medium">Fecha de creación</th>
                            <th className="px-4 py-3 text-left font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-xs">
                        {reportsToRender.length > 0 ? (
                            reportsToRender.map((report) => (
                                <tr key={report.id}>
                                    <td className="px-4 py-3">{report.id}</td>
                                    <td className="px-4 py-3"> {report.date ? report.date : 'Sin fecha'}</td>
                                    <td className='px-4 py-3 text-center relative flex items-center'>
                                        <TableReportsButtons reportId={report.id} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={2}
                                    className="px-6 py-6 text-center text-gray-400 italic"
                                >
                                    No hay reportes registrados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
