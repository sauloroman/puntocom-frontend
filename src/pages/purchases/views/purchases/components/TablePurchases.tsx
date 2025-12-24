import React from "react";
import { BsCalendar3, BsPerson, BsShop, BsCashStack } from "react-icons/bs";
import type { Purchase } from "../../../../../interfaces/purchase.interface";
import { useTheme } from "../../../../../shared/hooks";
import { TableImage } from "../../../../../shared/components/table";
import { TablePurchasesActions } from "./TablePurchasesActions";

interface TablePurchasesProps {
    data: Purchase[];
}

export const TablePurchases: React.FC<TablePurchasesProps> = ({ data }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className={`
            border rounded-2xl overflow-hidden mb-5 shadow-sm transition-colors
            ${isDark 
                ? 'border-gray-700 bg-gray-800' 
                : 'border-gray-200 bg-white'
            }
        `}>
            <div className="max-h-[550px] overflow-y-auto custom-scrollbar no-scrollbar">
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
                                    <BsCalendar3 
                                        className={isDark ? 'text-indigo-400' : 'text-indigo-600'} 
                                        size={16} 
                                    />
                                    Fecha
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsShop 
                                        className={isDark ? 'text-indigo-400' : 'text-indigo-600'} 
                                        size={18} 
                                    />
                                    Proveedor
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsPerson 
                                        className={isDark ? 'text-indigo-400' : 'text-indigo-600'} 
                                        size={18} 
                                    />
                                    Usuario
                                </div>
                            </th>
                            <th className="px-6 py-4 text-right font-bold">
                                <div className="flex items-center justify-end gap-2">
                                    <BsCashStack 
                                        className={isDark ? 'text-indigo-400' : 'text-indigo-600'} 
                                        size={16} 
                                    />
                                    Total
                                </div>
                            </th>
                            <th className="px-6 py-4 text-center font-bold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={`
                        divide-y transition-colors
                        ${isDark ? 'divide-gray-700' : 'divide-gray-100'}
                    `}>
                        {data.length > 0 ? (
                            data.map((purchase) => (
                                <tr
                                    key={purchase.purchaseId}
                                    className={`
                                        transition-all duration-200 group
                                        ${isDark 
                                            ? 'hover:bg-gray-700/50' 
                                            : 'hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50'
                                        }
                                    `}
                                >
                                    <td className="px-6 py-4">
                                        <p className={`
                                            text-sm font-semibold transition-colors
                                            ${isDark ? 'text-gray-200' : 'text-gray-900'}
                                        `}>
                                            {purchase.purchaseDate.toString()}
                                        </p>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <p className={`
                                                text-sm font-medium transition-colors
                                                ${isDark ? 'text-gray-200' : 'text-gray-900'}
                                            `}>
                                                {purchase.Supplier?.supplierName}
                                            </p>
                                            <p className={`
                                                text-xs transition-colors
                                                ${isDark ? 'text-gray-400' : 'text-gray-500'}
                                            `}>
                                                {purchase.Supplier?.supplierPhone}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                <TableImage
                                                    width='w-6'
                                                    text='Usuario sin imagen'
                                                    icon={purchase.User?.userImage ?? 'Usuario sin imagen'}
                                                    initial={purchase.User?.userName[0]}
                                                />
                                            </div>
                                            <div>
                                                <p className={`
                                                    text-sm font-medium transition-colors
                                                    ${isDark ? 'text-gray-200' : 'text-gray-900'}
                                                `}>
                                                    {purchase.User?.userName}
                                                </p>
                                                <p className={`
                                                    text-xs capitalize transition-colors
                                                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                                                `}>
                                                    {purchase.User?.userRole}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <div className="inline-flex items-center gap-2">
                                            <div className="flex flex-col items-end">
                                                <span className={`
                                                    text-2xl font-bold bg-clip-text text-transparent transition-colors
                                                    ${isDark 
                                                        ? 'bg-gradient-to-r from-indigo-400 to-purple-400' 
                                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                                                    }
                                                `}>
                                                    ${purchase.puchaseTotal.toFixed(2)}
                                                </span>
                                                <span className={`
                                                    text-xs font-medium transition-colors
                                                    ${isDark ? 'text-gray-500' : 'text-gray-400'}
                                                `}>
                                                    MXN
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <TablePurchasesActions purchaseId={purchase.purchaseId} />
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
                                        <div className={`
                                            w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors
                                            ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
                                        `}>
                                            <BsShop 
                                                className={isDark ? 'text-gray-500' : 'text-gray-400'} 
                                                size={32} 
                                            />
                                        </div>
                                        <p className={`
                                            text-sm font-medium transition-colors
                                            ${isDark ? 'text-gray-500' : 'text-gray-400'}
                                        `}>
                                            No hay compras registradas
                                        </p>
                                        <p className={`
                                            text-xs mt-1 transition-colors
                                            ${isDark ? 'text-gray-600' : 'text-gray-400'}
                                        `}>
                                            Las compras aparecerán aquí una vez que se registren
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