import React from "react";
import type { Category } from "../../../interfaces/category.interface";
import { TableActions } from "./TableActions";
import { TableStatus } from "./TableStatus";
import { TableImage } from "./TableImage";

interface TableCategoriesProps {
    data: Category[];
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const TableCategories: React.FC<TableCategoriesProps> = ({ data, onEdit, onDelete }) => {
    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Nombre</th>
                            <th className="px-4 py-3 text-left font-medium">Descripción</th>
                            <th className="px-4 py-3 text-left font-medium">Estado</th>
                            <th className="px-4 py-3 text-left font-medium">Creado</th>
                            <th className="px-4 py-3 text-left font-medium">Actualizado</th>
                            <th className="px-4 py-3 text-right font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-xs">
                        {data.length > 0 ? (
                            data.map((cat) => (
                                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-gray-900 flex items-center gap-2">
                                        <TableImage 
                                            width='w-6' 
                                            text='Categoría sin ícono' 
                                            icon={cat.icon} 
                                        /> 
                                        {cat.name}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{cat.description}</td>
                                    <td className="px-4 py-3"><TableStatus status={cat.isActive} /></td>
                                    <td className="px-4 py-3">{new Date(cat.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">{new Date(cat.updatedAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3 text-center relative">
                                        <TableActions 
                                            onDelete={() => onDelete?.(cat.id)}
                                            onEdit={() => onEdit?.(cat.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-6 text-center text-gray-400 italic"
                                >
                                    No hay categorías registradas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
