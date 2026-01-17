import React from 'react'
import { BsCalendar3, BsType, BsBox, BsPerson, BsTag } from 'react-icons/bs'
import { AiOutlineProduct } from "react-icons/ai"
import type { InventoryAdjustmentResponse } from '../../../../../interfaces/dto/inventory-adjustment.interface'
import { useTheme } from '../../../../../shared/hooks'
import { TableImage } from '../../../../../shared/components/table'
import { TypeBadgeAdjustmentType, TableAdjustmentsActions } from './'

interface Props {
    data: InventoryAdjustmentResponse[]
}

export const TableAdjustments: React.FC<Props> = ({ data }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
        <div className={`
            border rounded-2xl overflow-hidden mb-5 shadow-sm transition-colors
            ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}
        `}>
            <div className="max-h-[650px] overflow-y-auto overflow-x-auto custom-scrollbar no-scrollbar">
                <table className="min-w-full">
                    <thead className={`
                        text-xs uppercase tracking-wide sticky top-0 z-10 shadow-sm
                        ${isDark
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700'
                        }
                    `}>
                        <tr>
                            <th className="hidden md:block px-4 sm:px-6 py-3 sm:py-4 text-left font-bold whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <BsCalendar3 className={isDark ? 'text-gray-300' : 'text-indigo-600'} size={16} />
                                    <span className="hidden sm:inline">Fecha</span>
                                    <span className="sm:hidden">Fec.</span>
                                </div>
                            </th>

                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-bold whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <BsType className={isDark ? 'text-gray-300' : 'text-indigo-600'} size={16} />
                                    Tipo
                                </div>
                            </th>

                            <th className="hidden lg:table-cell px-4 sm:px-6 py-3 sm:py-4 text-center font-bold whitespace-nowrap">
                                <div className="flex items-center justify-center gap-2">
                                    <BsBox className={isDark ? 'text-gray-300' : 'text-indigo-600'} size={18} />
                                    Previo
                                </div>
                            </th>
                            
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-center font-bold whitespace-nowrap">
                                <div className="flex items-center justify-center gap-2">
                                    <BsBox className={isDark ? 'text-gray-300' : 'text-indigo-600'} size={18} />
                                    <span className="hidden lg:inline">Nuevo</span>
                                    <span className="lg:hidden">Cant.</span>
                                </div>
                            </th>

                            <th className="hidden md:table-cell px-4 sm:px-6 py-3 sm:py-4 text-left font-bold whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <BsPerson className={isDark ? 'text-gray-300' : 'text-indigo-600'} size={16} />
                                    Usuario
                                </div>
                            </th>

                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-bold whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <AiOutlineProduct className={isDark ? 'text-gray-300' : 'text-indigo-600'} size={16} />
                                    <span className="hidden sm:inline">Producto</span>
                                    <span className="sm:hidden">Prod.</span>
                                </div>
                            </th>

                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-right font-bold whitespace-nowrap">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={`
                        divide-y
                        ${isDark ? 'divide-gray-700' : 'divide-gray-100'}
                    `}>
                        {data.length > 0 ? (
                            data.map((adj) => (
                                <tr
                                    key={adj.adjustmentId}
                                    className={`
                                        transition-all duration-200
                                        ${isDark
                                            ? 'hover:bg-gray-700/40 text-gray-300'
                                            : 'hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 text-gray-900'
                                        }
                                    `}
                                >
                                    <td className={`hidden md:block px-4 sm:px-6 py-3 sm:py-4 font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                                        <span className="hidden sm:inline">
                                            {new Date(adj?.adjustmentDate ?? Date.now()).toLocaleString()}
                                        </span>
                                        <span className="sm:hidden text-xs">
                                            {new Date(adj?.adjustmentDate ?? Date.now()).toLocaleDateString()}
                                        </span>
                                    </td>
                                    
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                        <TypeBadgeAdjustmentType type={adj.adjustmentType} />
                                    </td>
                                    
                                    <td className="hidden lg:table-cell px-4 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">
                                        <span className={`
                                            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
                                            font-mono font-bold text-xs tracking-wider border transition-colors duration-200
                                            ${isDark
                                                ? 'bg-gray-700 text-indigo-300 border-gray-600'
                                                : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200'
                                            }
                                        `}>
                                            {adj.adjustmentPrevQuantity}
                                        </span>
                                    </td>
                                    
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">
                                        <span className={`
                                            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
                                            font-mono font-bold text-xs tracking-wider border transition-colors duration-200
                                            ${isDark
                                                ? 'bg-gray-700 text-indigo-300 border-gray-600'
                                                : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200'
                                            }
                                        `}>
                                            {adj.adjustmentQuantity}
                                        </span>
                                    </td>
                                    
                                    <td className="hidden md:table-cell px-4 sm:px-6 py-3 sm:py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                <TableImage
                                                    width="w-6"
                                                    text="Usuario sin imagen"
                                                    icon={adj.User?.image ?? ''}
                                                    initial={adj.User?.name?.[0] ?? "?"}
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    {adj.User?.name ?? "N/A"}
                                                </p>
                                                <p className={`text-xs capitalize ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {adj.User?.role ?? "Sin rol"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                                        <div className="flex items-center gap-2 sm:gap-3 min-w-[100px] sm:min-w-[120px]">
                                            <div className={`
                                                w-7 h-7 sm:w-9 sm:h-9 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0
                                                ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
                                            `}>
                                                <TableImage
                                                    width="w-5 sm:w-6"
                                                    text="Producto sin imagen"
                                                    icon={adj.Product?.image ?? ''}
                                                    initial={adj.Product?.name?.[0] ?? "P"}
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium truncate text-sm sm:text-base">
                                                    {adj.Product?.name ?? "Producto no encontrado"}
                                                </p>
                                                <p className={`text-xs font-mono truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {adj.Product?.code ?? ""}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">
                                        <TableAdjustmentsActions adjustmentId={adj.adjustmentId} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-4 sm:px-6 py-12 sm:py-16 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className={`
                                            w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4
                                            ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
                                        `}>
                                            <BsTag className="text-gray-400" size={24} />
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium">
                                            No hay ajustes de inventario registrados
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1 px-4">
                                            Los ajustes aparecerán aquí una vez que se registren
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