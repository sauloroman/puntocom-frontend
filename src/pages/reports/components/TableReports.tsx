import React, { useEffect, useState } from 'react'
import { useReports } from '../../../shared/hooks'
import type { ReportItem } from '../../../interfaces/report.interface'
import { TableReportsButtons } from './'
import { BsFileText, BsCalendar3 } from 'react-icons/bs'

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
        <div className="border border-gray-200 rounded-2xl overflow-hidden mb-5 mt-5 shadow-sm">
            <div className="h-[500px] overflow-y-auto custom-scrollbar">
                <table className="min-w-full bg-white">
                    <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs uppercase tracking-wide sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsFileText className="text-indigo-600" size={16} />
                                    Id Reporte
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsCalendar3 className="text-indigo-600" size={16} />
                                    Fecha de creación
                                </div>
                            </th>
                            <th className="px-6 py-4 text-center font-bold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {reportsToRender.length > 0 ? (
                            reportsToRender.map((report) => (
                                <tr key={report.id} className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-200">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-lg font-mono font-bold text-xs tracking-wider border border-indigo-200">
                                            {report.id}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-gray-900">
                                            {report.date ? report.date : 'Sin fecha'}
                                        </p>
                                    </td>
                                    <td className='px-6 py-4 text-center relative flex items-center justify-center'>
                                        <TableReportsButtons reportId={report.id} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="px-6 py-16 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <BsFileText className="text-gray-400" size={32} />
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium">
                                            No hay reportes registrados
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            Los reportes aparecerán aquí una vez que se generen
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}