import React, { useEffect, useState } from 'react'
import { useReports, useTheme } from '../../../shared/hooks'
import type { ReportItem } from '../../../interfaces/report.interface'
import { TableReportsButtons } from './'
import { BsFileText, BsCalendar3 } from 'react-icons/bs'

export const TableReports: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

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
    <div className={`
      border rounded-2xl overflow-hidden mb-5 mt-5 shadow-sm transition-colors
      ${isDark 
        ? 'border-gray-700 bg-gray-800' 
        : 'border-gray-200 bg-white'
      }
    `}>
      <div className="h-[500px] overflow-y-auto custom-scrollbar">
        <table className="min-w-full">
          <thead className={`
            text-xs uppercase tracking-wide sticky top-0 z-10 shadow-sm transition-colors
            ${isDark 
              ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-indigo-400' 
              : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700'
            }
          `}>
            <tr>
              <th className="px-6 py-4 text-left font-bold">
                <div className="flex items-center gap-2">
                  <BsFileText 
                    className={isDark ? 'text-indigo-400' : 'text-indigo-600'} 
                    size={16} 
                  />
                  Id Reporte
                </div>
              </th>
              <th className="px-6 py-4 text-left font-bold">
                <div className="flex items-center gap-2">
                  <BsCalendar3 
                    className={isDark ? 'text-indigo-400' : 'text-indigo-600'} 
                    size={16} 
                  />
                  Fecha de creación
                </div>
              </th>
              <th className="px-6 py-4 text-center font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody className={`
            divide-y transition-colors
            ${isDark ? 'divide-gray-700' : 'divide-gray-100'}
          `}>
            {reportsToRender.length > 0 ? (
              reportsToRender.map((report) => (
                <tr 
                  key={report.id} 
                  className={`
                    transition-all duration-200
                    ${isDark 
                      ? 'hover:bg-gray-700/50' 
                      : 'hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50'
                    }
                  `}
                >
                  <td className="px-6 py-4">
                    <span className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
                      font-mono font-bold text-xs tracking-wider border transition-colors
                      ${isDark 
                        ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50 text-indigo-300 border-indigo-700' 
                        : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200'
                      }
                    `}>
                      {report.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`
                      text-sm font-semibold transition-colors
                      ${isDark ? 'text-gray-200' : 'text-gray-900'}
                    `}>
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
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors
                      ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
                    `}>
                      <BsFileText 
                        className={isDark ? 'text-gray-500' : 'text-gray-400'} 
                        size={32} 
                      />
                    </div>
                    <p className={`
                      text-sm font-medium transition-colors
                      ${isDark ? 'text-gray-500' : 'text-gray-400'}
                    `}>
                      No hay reportes registrados
                    </p>
                    <p className={`
                      text-xs mt-1 transition-colors
                      ${isDark ? 'text-gray-600' : 'text-gray-400'}
                    `}>
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
