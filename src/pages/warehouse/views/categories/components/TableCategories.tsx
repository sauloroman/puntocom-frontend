import React from "react";
import type { Category } from "../../../../../interfaces/category.interface";
import { useCategories, useDrawer } from "../../../../../shared/hooks";
import { DrawelNames } from "../../../../../interfaces/ui/drawel.interface";
import { TableImage, TableActions, TableStatus } from "../../../../../shared/components/table";

interface TableCategoriesProps {
    data: Category[];
}

export const TableCategories: React.FC<TableCategoriesProps> = ({ data }) => {    

    const { onOpenRightDrawer } = useDrawer()
    const { onSelectCategory } = useCategories()

    const onSelecteCategory = ( id: string ) => {
        onOpenRightDrawer(DrawelNames.infoCategory)
        onSelectCategory( id )
    }

    const onEditCategory = (id: string) => {
        onOpenRightDrawer(DrawelNames.editCategory)
        onSelectCategory(id)
    }

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-5">
            <div className="max-h-[650px] overflow-y-auto">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-gray-50 text-indigo-600 text-xs uppercase tracking-wide sticky top-0 z-10">
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
                                    <td className="px-4 py-3">{cat.createdAt}</td>
                                    <td className="px-4 py-3">{cat.updatedAt}</td>
                                    <td className="px-4 py-3 text-center relative">
                                        <TableActions
                                            onView={ () => onSelecteCategory(cat.id ) }
                                            onEdit={() => onEditCategory(cat.id)}
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
