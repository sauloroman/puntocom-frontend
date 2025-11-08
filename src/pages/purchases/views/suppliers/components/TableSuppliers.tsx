import React from "react";
import { useDrawer, useSuppliers } from "../../../../../shared/hooks";
import { DrawelNames } from "../../../../../interfaces/ui/drawel.interface";
import { TableActions } from "../../../../../shared/components/table";
import type { Supplier } from "../../../../../interfaces/supplier.interface";
import { AvatarInitial, StatusBadge } from "../../../../../shared/components";
import { BsPerson, BsEnvelope, BsTelephone, BsGeoAlt, BsBuilding, BsToggleOn, BsCalendar3, BsClock } from "react-icons/bs";

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
        <div className="border border-gray-200 rounded-2xl overflow-hidden mb-5 shadow-sm">
            <div className="max-h-[650px] overflow-y-auto custom-scrollbar">
                <table className="min-w-full bg-white">
                    <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs uppercase tracking-wide sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsPerson className="text-indigo-600" size={18} />
                                    Nombre
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsEnvelope className="text-indigo-600" size={16} />
                                    Email
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsTelephone className="text-indigo-600" size={16} />
                                    Teléfono
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsGeoAlt className="text-indigo-600" size={16} />
                                    Dirección
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsBuilding className="text-indigo-600" size={16} />
                                    Empresa
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsToggleOn className="text-indigo-600" size={18} />
                                    Estado
                                </div>
                            </th>
                            <th className="px-6 py-4 text-right font-bold">
                                <div className="flex items-center justify-end gap-2">
                                    <BsCalendar3 className="text-indigo-600" size={16} />
                                    Creado
                                </div>
                            </th>
                            <th className="px-6 py-4 text-right font-bold">
                                <div className="flex items-center justify-end gap-2">
                                    <BsClock className="text-indigo-600" size={16} />
                                    Actualizado
                                </div>
                            </th>
                            <th className="px-6 py-4 text-right font-bold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.length > 0 ? (
                            data.map((sup: Supplier) => (
                                <tr key={sup.id} className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-200">
                                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                        <div className="w-8 h-8"><AvatarInitial initial={sup.name[0]} /></div>
                                        {sup.name} {sup.lastname}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{sup.email}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                       <a href={`tel: ${sup.phone}`}>{sup.phone}</a>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{sup.address}</td>
                                    <td className="px-6 py-4 text-gray-600">{sup.company}</td>
                                    <td className="px-6 py-4"><StatusBadge status={sup.isActive} /></td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{sup.createdAt}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{sup.updatedAt}</td>
                                    <td className="px-6 py-4 text-center relative">
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
                                    colSpan={9}
                                    className="px-6 py-16 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <BsPerson className="text-gray-400" size={32} />
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium">
                                            No hay proveedores registrados
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            Los proveedores aparecerán aquí una vez que se registren
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