import React from "react";
import type { SaleResponse } from "../../../interfaces/sale.interface";
import { TableImage } from "../../../shared/components/table";
import { BsCalendar3, BsPerson, BsCode, BsCashStack } from "react-icons/bs";
import { TableSalesActions } from "./TableSalesActions";

interface TableSalesProps {
    data: SaleResponse[];
}

export const TableSales: React.FC<TableSalesProps> = ({ data }) => {
    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden mb-5 shadow-sm">
            <div className="max-h-[550px] overflow-y-auto custom-scrollbar">
                <table className="min-w-full bg-white">
                    <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs uppercase tracking-wide sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsCalendar3 className="text-indigo-600" size={16} />
                                    Fecha
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsPerson className="text-indigo-600" size={18} />
                                    Usuario
                                </div>
                            </th>
                            <th className="px-6 py-4 text-center font-bold">
                                <div className="flex items-center justify-center gap-2">
                                    <BsCode className="text-indigo-600" size={16} />
                                    Código
                                </div>
                            </th>
                            <th className="px-6 py-4 text-right font-bold">
                                <div className="flex items-center justify-end gap-2">
                                    <BsCashStack className="text-indigo-600" size={16} />
                                    Total
                                </div>
                            </th>
                            <th className="px-6 py-4 text-center font-bold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.length > 0 ? (
                            data.map((sale) => (
                                <tr
                                    key={sale.id}
                                    className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-200 group"
                                >
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-gray-900">
                                            {sale.date.toString()}
                                        </p>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                <TableImage
                                                    width='w-6'
                                                    text='Usuario sin imagen'
                                                    icon={sale.User?.image ?? 'Usuario sin imagen'}
                                                    initial={sale.User?.name[0]}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {sale.User?.name}
                                                </p>
                                                <p className="text-xs text-gray-500 capitalize">
                                                    {sale.User?.role}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-lg font-mono font-bold text-xs tracking-wider border border-indigo-200">
                                            {sale.code}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <div className="inline-flex items-center gap-2">
                                            <div className="flex flex-col items-end">
                                                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                    ${sale.total.toFixed(2)}
                                                </span>
                                                <span className="text-xs text-gray-400 font-medium">
                                                    MXN
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <TableSalesActions saleId={sale.id} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-16 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <BsCashStack className="text-gray-400" size={32} />
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium">
                                            No hay ventas registradas
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            Las ventas aparecerán aquí una vez que se registren
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};