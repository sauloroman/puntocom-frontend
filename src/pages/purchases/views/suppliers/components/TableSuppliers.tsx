import React from "react";
import { useDrawer, useSuppliers, useTheme } from "../../../../../shared/hooks";
import { DrawelNames } from "../../../../../interfaces/ui/drawel.interface";
import { TableActions } from "../../../../../shared/components/table";
import type { Supplier } from "../../../../../interfaces/supplier.interface";
import { AvatarInitial, StatusBadge } from "../../../../../shared/components";
import {
  BsPerson,
  BsEnvelope,
  BsTelephone,
  BsGeoAlt,
  BsBuilding,
  BsToggleOn,
  BsCalendar3,
  BsClock,
} from "react-icons/bs";

interface TableSuppliersProps {
  data: Supplier[];
}

export const TableSuppliers: React.FC<TableSuppliersProps> = ({ data }) => {
  const { onOpenRightDrawer } = useDrawer();
  const { onSelectSupplier } = useSuppliers();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const onSelectSupplierInfo = (id: string) => {
    onOpenRightDrawer(DrawelNames.infoSupplier);
    onSelectSupplier(id);
  };

  const onEditSupplier = (id: string) => {
    onOpenRightDrawer(DrawelNames.editSupplier);
    onSelectSupplier(id);
  };

  return (
    <div
      className={`
        border rounded-2xl overflow-hidden mb-5 shadow-sm transition-colors
        ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}
      `}
    >
      <div className="max-h-[650px] overflow-y-auto custom-scrollbar no-scrollbar">

        <table className="min-w-full">

          <thead
            className={`
              text-xs uppercase tracking-wide sticky top-0 z-10 shadow-sm
              ${
                isDark
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700"
              }
            `}
          >
            <tr>
              <th className="px-6 py-4 text-left font-bold">
                <div className="flex items-center gap-2">
                  <BsPerson className={isDark ? "text-gray-300" : "text-indigo-600"} size={18} />
                  Nombre
                </div>
              </th>

              <th className="px-6 py-4 text-left font-bold">
                <div className="flex items-center gap-2">
                  <BsEnvelope className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                  Email
                </div>
              </th>

              <th className="px-6 py-4 text-left font-bold">
                <div className="flex items-center gap-2">
                  <BsTelephone className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                  Teléfono
                </div>
              </th>

              <th className="px-6 py-4 text-left font-bold">
                <div className="flex items-center gap-2">
                  <BsGeoAlt className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                  Dirección
                </div>
              </th>

              <th className="px-6 py-4 text-left font-bold">
                <div className="flex items-center gap-2">
                  <BsBuilding className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                  Empresa
                </div>
              </th>

              <th className="px-6 py-4 text-left font-bold">
                <div className="flex items-center gap-2">
                  <BsToggleOn className={isDark ? "text-gray-300" : "text-indigo-600"} size={18} />
                  Estado
                </div>
              </th>

              <th className="px-6 py-4 text-left font-bold">
                <div className="flex items-center gap-2">
                  <BsCalendar3 className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                  Creado
                </div>
              </th>

              <th className="px-6 py-4 text-left font-bold">
                <div className="flex items-center gap-2">
                  <BsClock className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                  Actualizado
                </div>
              </th>

              <th className="px-6 py-4 text-right font-bold">Acciones</th>
            </tr>
          </thead>

          <tbody
            className={`
              divide-y
              ${isDark ? "divide-gray-700" : "divide-gray-100"}
            `}
          >
            {data.length > 0 ? (
              data.map((sup) => (
                <tr
                  key={sup.id}
                  className={`
                    transition-all duration-200
                    ${
                      isDark
                        ? "hover:bg-gray-700/40 text-gray-300"
                        : "hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 text-gray-900"
                    }
                  `}
                >
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    <div className="w-8 h-8">
                      <AvatarInitial initial={sup.name[0]} />
                    </div>
                    {sup.name} {sup.lastname}
                  </td>

                  <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {sup.email}
                  </td>

                  <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    <a
                      href={`tel:${sup.phone}`}
                      className={isDark ? "hover:text-indigo-400" : "hover:text-indigo-600"}
                    >
                      {sup.phone}
                    </a>
                  </td>

                  <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {sup.address}
                  </td>

                  <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {sup.company}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={sup.isActive} />
                  </td>

                  <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                    {sup.createdAt}
                  </td>

                  <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                    {sup.updatedAt}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <TableActions
                      onView={() => onSelectSupplierInfo(sup.id)}
                      onEdit={() => onEditSupplier(sup.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center mb-4
                        ${isDark ? "bg-gray-700" : "bg-gray-100"}
                      `}
                    >
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
