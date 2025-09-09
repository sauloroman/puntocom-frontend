import React from "react";
import { useDrawer, useSuppliers } from "../../../../../shared/hooks";
import { DrawelNames } from "../../../../../interfaces/ui/drawel.interface";
import { TableActions } from "../../../../../shared/components/table";
import type { Supplier } from "../../../../../interfaces/supplier.interface";
import { AvatarInitial, StatusBadge } from "../../../../../shared/components";

interface TableSuppliersProps {
    data: Supplier[];
}

export const TableSuppliers: React.FC<TableSuppliersProps> = ({ data }) => {    

    const { onOpenRightDrawer } = useDrawer()
    const { onSelectSupplier } = useSuppliers()

    const onSelecteSupplierAc = ( id: string ) => {
        onOpenRightDrawer(DrawelNames.infoSupplier)
        onSelectSupplier( id )
    }

    const onEditSupplier = (id: string) => {
        onOpenRightDrawer(DrawelNames.editSupplier)
        onSelectSupplier(id)
    }

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-5">
            <div className="max-h-[650px] overflow-y-auto">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-gray-50 text-indigo-600 text-xs uppercase tracking-wide sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Nombre</th>
                            <th className="px-4 py-3 text-left font-medium">Email</th>
                            <th className="px-4 py-3 text-left font-medium">Teléfono</th>
                            <th className="px-4 py-3 text-left font-medium">Dirección</th>
                            <th className="px-4 py-3 text-left font-medium">Empresa</th>
                            <th className="px-4 py-3 text-left font-medium">Estado</th>
                            <th className="px-4 py-3 text-right font-medium">Creado</th>
                            <th className="px-4 py-3 text-right font-medium">Actualizado</th>
                            <th className="px-4 py-3 text-right font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-xs">
                        {data.length > 0 ? (
                            data.map((sup: Supplier) => (
                                <tr key={sup.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-gray-900 flex items-center gap-2">
                                        <div className="w-8 h-8"><AvatarInitial initial={sup.name[0]} /></div>
                                        {sup.name} {sup.lastname}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{sup.email}</td>
                                    <td className="px-4 py-3 text-gray-600">
                                       <a href={`tel: ${sup.phone}`}>{sup.phone}</a>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{sup.address}</td>
                                    <td className="px-4 py-3 text-gray-600">{sup.company}</td>
                                    <td className="px-4 py-3"><StatusBadge status={sup.isActive} /></td>
                                    <td className="px-4 py-3">{sup.createdAt}</td>
                                    <td className="px-4 py-3">{sup.updatedAt}</td>
                                    <td className="px-4 py-3 text-center relative">
                                        <TableActions
                                            onView={ () => onSelecteSupplierAc(sup.id ) }
                                            onEdit={() => onEditSupplier(sup.id)}
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
                                    No hay proveedores registradas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
