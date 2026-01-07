import React from "react";
import { useCategories, useDrawer, useTheme } from "../../../../../shared/hooks";
import { DrawelNames } from "../../../../../interfaces/ui/drawel.interface";
import { TableImage, TableActions } from "../../../../../shared/components/table";
import { StatusBadge } from "../../../../../shared/components";
import type { Category } from "../../../../../interfaces/dto/category.interface";
import { BsTag, BsFileText, BsToggleOn, BsCalendar3, BsClock } from "react-icons/bs";

interface TableCategoriesProps {
  data: Category[];
}

export const TableCategories: React.FC<TableCategoriesProps> = ({ data }) => {
  const { onOpenRightDrawer } = useDrawer();
  const { onSelectCategory } = useCategories();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const onSelecteCategory = (id: string) => {
    onOpenRightDrawer(DrawelNames.infoCategory);
    onSelectCategory(id);
  };

  const onEditCategory = (id: string) => {
    onOpenRightDrawer(DrawelNames.editCategory);
    onSelectCategory(id);
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
              ${isDark
                ? "bg-gray-700 text-gray-300"
                : "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700"
              }
            `}
          >
            <tr>
              <th className="px-6 py-4 text-left font-bold">
                <div className="flex items-center gap-2">
                  <BsTag className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                  Nombre
                </div>
              </th>

              <th className="px-6 py-4 text-left font-bold">
                <div className="flex items-center gap-2">
                  <BsFileText className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                  Descripción
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
              data.map((cat) => (
                <tr
                  key={cat.id}
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
                    <TableImage
                      width="w-6"
                      text="Categoría sin ícono"
                      icon={cat.icon}
                      initial={cat.name[0]}
                    />
                    {cat.name}
                  </td>

                  <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {cat.description}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={cat.isActive} />
                  </td>

                  <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                    {cat.createdAt}
                  </td>

                  <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                    {cat.updatedAt}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <TableActions
                      onView={() => onSelecteCategory(cat.id)}
                      onEdit={() => onEditCategory(cat.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center mb-4
                        ${isDark ? "bg-gray-700" : "bg-gray-100"}
                      `}
                    >
                      <BsTag className="text-gray-400" size={32} />
                    </div>
                    <p className="text-gray-400 text-sm font-medium">
                      No hay categorías registradas
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Las categorías aparecerán aquí una vez que se registren
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
