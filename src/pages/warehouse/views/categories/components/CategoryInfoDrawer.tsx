import React from "react";
import { useCategories } from "../../../../../shared/hooks";
import { RightDrawerLayout } from "../../../../../layouts/RightDrawerLayout";
import { AvatarImage, StatusBadge } from "../../../../../shared/components";
import { AvatarInitialSquare } from "../../../../../shared/components/avatar/AvatarInitialSquare";

export const CategoryInfoDrawer: React.FC = () => {
    const { categorySelected } = useCategories();
    if (!categorySelected) return null;
    const { id, name, description, icon, isActive, createdAt, updatedAt } = categorySelected;

    return (
        <RightDrawerLayout width="w-xl" title="Información de categoría">
            <div className="p-4 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                    {
                        icon !== 'Categoría sin ícono' 
                        ? (<AvatarImage image={icon} alt="Ícono de categoría" />) 
                        : (<AvatarInitialSquare name={name} />)
                    }

                    <div>
                        <h3 className="text-lg font-semibold">{name}</h3>
                        <StatusBadge status={isActive} />
                    </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{description || "Sin descripción."}</p>

                <div className="space-y-2 text-sm text-gray-600 mb-10">
                    <p> <span className="font-medium text-gray-800">#Id:</span> {id}</p>
                    <p><span className="font-medium text-gray-800">Fecha de creación: </span>{createdAt}</p>
                    <p><span className="font-medium text-gray-800">Última actualización: </span>{updatedAt}</p>
                </div>
            </div>
        </RightDrawerLayout>
    );
};
