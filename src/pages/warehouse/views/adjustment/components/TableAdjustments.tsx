import React from 'react'
import { BsCalendar3, BsType, BsBox, BsPerson, BsTag } from 'react-icons/bs'
import { AiOutlineProduct } from "react-icons/ai";
import { TableImage } from '../../../../../shared/components/table'
import { TypeBadgeAdjustmentType, TableAdjustmentsActions } from './';
import type { InventoryAdjustmentResponse } from '../../../../../interfaces/inventory-adjustment.interface'

interface Props {
    data: InventoryAdjustmentResponse[]
}

export const TableAdjustments: React.FC<Props> = ({ data }) => {
    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden mb-5 shadow-sm">
            <div className="max-h-[650px] overflow-y-auto custom-scrollbar">
                <table className="min-w-full bg-white">
                    <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs uppercase tracking-wide sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2"><BsCalendar3 className="text-indigo-600" size={16} />Fecha</div>
                            </th>

                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2"><BsType className="text-indigo-600" size={16} />Tipo</div>
                            </th>

                            <th className="px-6 py-4 text-center font-bold">
                                <div className="flex items-center justify-center gap-2"><BsBox className="text-indigo-600" size={18} />Cantidad Previa</div>
                            </th>
                            
                            <th className="px-6 py-4 text-center font-bold">
                                <div className="flex items-center justify-center gap-2"><BsBox className="text-indigo-600" size={18} />Cantidad Nueva</div>
                            </th>

                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2"><BsPerson className="text-indigo-600" size={16} />Usuario</div>
                            </th>

                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2"><AiOutlineProduct className="text-indigo-600" size={16} />Producto</div>
                            </th>

                            <th className="px-6 py-4 text-center font-bold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.length > 0 ? (
                            data.map((adj) => (
                                <tr
                                    key={adj.adjustmentId}
                                    className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-200 group"
                                >
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-gray-900">{new Date(adj?.adjustmentDate ?? Date.now()).toLocaleString()}</p>
                                    </td>
                                    <td className="px-6 py-4"><TypeBadgeAdjustmentType type={adj.adjustmentType} /></td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-lg font-mono font-bold text-xs tracking-wider border border-indigo-200">{adj.adjustmentPrevQuantity}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-lg font-mono font-bold text-xs tracking-wider border border-indigo-200">{adj.adjustmentQuantity}</span>
                                    </td>
                                    <td className="px-6 py-4">
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
                                                <p className="text-sm font-medium text-gray-900">
                                                    {adj.User?.name ?? "N/A"}
                                                </p>
                                                <p className="text-xs text-gray-500 capitalize">
                                                    {adj.User?.role ?? "Sin rol"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                                                <TableImage
                                                    width="w-6"
                                                    text="Producto sin imagen"
                                                    icon={adj.Product?.image ?? ''}
                                                    initial={adj.Product?.name?.[0] ?? "P"}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {adj.Product?.name ?? "Producto no encontrado"}
                                                </p>
                                                <p className="text-xs text-gray-500 font-mono">
                                                    {adj.Product?.code ?? ""}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center"><TableAdjustmentsActions adjustmentId={adj.adjustmentId} /></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <BsTag className="text-gray-400" size={32} />
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium">
                                            No hay ajustes de inventario registrados
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
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
