import React from "react";
import { useCategories, useTheme } from "../../../../../shared/hooks";
import { RightDrawerLayout } from "../../../../../layouts/RightDrawerLayout";
import { AvatarImage, StatusBadge } from "../../../../../shared/components";
import { AvatarInitialSquare } from "../../../../../shared/components/avatar/AvatarInitialSquare";

export const CategoryInfoDrawer: React.FC = () => {
  const { categorySelected } = useCategories();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!categorySelected) return null;
  const { id, name, description, icon, isActive, createdAt, updatedAt } = categorySelected;

  return (
    <RightDrawerLayout width="w-xl" title="Información de categoría">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
          {icon !== "Categoría sin ícono" ? (
            <AvatarImage image={icon} alt="Ícono de categoría" />
          ) : (
            <AvatarInitialSquare name={name} />
          )}

          <div>
            <h3 className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              {name}
            </h3>
            <StatusBadge status={isActive} />
          </div>
        </div>

        <p className={`${isDark ? "text-gray-300" : "text-gray-700"} text-md mb-4`}>
          {description || "Sin descripción."}
        </p>

        <div className={`space-y-2 text-md mb-10 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          <p>
            <span className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>#Id:</span> {id}
          </p>

          <p>
            <span className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>
              Fecha de creación:
            </span>{" "}
            {createdAt}
          </p>

          <p>
            <span className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>
              Última actualización:
            </span>{" "}
            {updatedAt}
          </p>
        </div>

      </div>
    </RightDrawerLayout>
  );
};
