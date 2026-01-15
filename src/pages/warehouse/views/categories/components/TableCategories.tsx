import React from "react";
import { BsTag, BsFileText, BsToggleOn, BsCalendar3, BsClock } from "react-icons/bs";
import type { Category } from "../../../../../interfaces/dto/category.interface";
import { DrawelNames } from "../../../../../interfaces/ui/drawel.interface";
import { useCategories, useDrawer, useTheme } from "../../../../../shared/hooks";
import { TableImage, TableActions } from "../../../../../shared/components/table";
import { StatusBadge } from "../../../../../shared/components/badgets";

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
      <div className="max-h-[650px] overflow-y-auto overflow-x-auto custom-scrollbar no-scrollbar">

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
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-bold whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <BsTag className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                  <span className="hidden sm:inline">Nombre</span>
                  <span className="sm:hidden">Nom.</span>
                </div>
              </th>

              <th className="hidden md:block px-4 sm:px-6 py-3 sm:py-4 text-left font-bold whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <BsFileText className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                  <span className="hidden sm:inline">Descripción</span>
                  <span className="sm:hidden">Desc.</span>
                </div>
              </th>

              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-bold whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <BsToggleOn className={isDark ? "text-gray-300" : "text-indigo-600"} size={18} />
                  Estado
                </div>
              </th>

              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-bold whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <BsCalendar3 className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                  <span className="hidden md:inline">Creado</span>
                  <span className="md:hidden">Crea.</span>
                </div>
              </th>

              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-bold whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <BsClock className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                  <span className="hidden md:inline">Actualizado</span>
                  <span className="md:hidden">Act.</span>
                </div>
              </th>

              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right font-bold whitespace-nowrap">Acciones</th>
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
                  <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <TableImage
                        width="w-6"
                        text="Categoría sin ícono"
                        icon={cat.icon}
                        initial={cat.name[0]}
                      />
                      <span className="truncate">{cat.name}</span>
                    </div>
                  </td>

                  <td className={`hidden md:block px-4 sm:px-6 py-3 sm:py-4 ${isDark ? "text-gray-400" : "text-gray-600"} max-w-[200px] md:max-w-none`}>
                    <span className="line-clamp-2 md:line-clamp-none">{cat.description}</span>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <StatusBadge status={cat.isActive} />
                  </td>

                  <td className={`px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                    {cat.createdAt}
                  </td>

                  <td className={`px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                    {cat.updatedAt}
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">
                    <TableActions
                      onView={() => onSelecteCategory(cat.id)}
                      onEdit={() => onEditCategory(cat.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 sm:px-6 py-12 sm:py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className={`
                        w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4
                        ${isDark ? "bg-gray-700" : "bg-gray-100"}
                      `}
                    >
                      <BsTag className="text-gray-400" size={24} />
                    </div>
                    <p className="text-gray-400 text-sm font-medium">
                      No hay categorías registradas
                    </p>
                    <p className="text-gray-400 text-xs mt-1 px-4">
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