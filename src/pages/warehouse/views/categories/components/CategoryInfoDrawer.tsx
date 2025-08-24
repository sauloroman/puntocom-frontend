import React from "react";
import { motion } from "framer-motion";
import { useCategories } from "../../../../../shared/hooks";
import { RightDrawerLayout } from "../../../../../layouts/RightDrawerLayout";
import { DrawerInfoStatus } from "../../../../../shared/components/drawer/DrawerInfoStatus";
import { UploadCategoryImage } from "./UploadCategoryImage";
import { SpinnerContainer } from "../../../../../shared/components";

const getInitial = (text: string) => text.charAt(0).toUpperCase();

export const CategoryInfoDrawer: React.FC = () => {
    const { categorySelected, isLoading } = useCategories();

    if (!categorySelected) return null;
    const { id, name, description, icon, isActive, createdAt, updatedAt } = categorySelected;

    return (
        <RightDrawerLayout width="w-xl" title="Información de categoría">
            <div className="p-4 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                    {icon !== 'Categoría sin ícono' ? (
                        <motion.div
                            className="h-20 w-20 rounded-xl overflow-hidden flex items-center justify-center"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <img src={icon} alt={name} className="h-full w-full object-cover" />
                        </motion.div>
                    ) : (
                        <div className="h-20 w-20 rounded-xl flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-4xl font-bold shadow">
                            {getInitial(name)}
                        </div>
                    )}

                    <div>
                        <h3 className="text-lg font-semibold">{name}</h3>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border
                                ${isActive
                                    ? "bg-green-100 text-green-700 border-green-300"
                                    : "bg-gray-100 text-gray-600 border-gray-300"
                                }`}
                        >
                            {isActive ? "Activo" : "Inactivo"}
                        </span>
                    </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{description || "Sin descripción."}</p>

                <div className="space-y-2 text-sm text-gray-600 mb-10">
                    <p> <span className="font-medium text-gray-800">#Id:</span> {id}</p>
                    <p><span className="font-medium text-gray-800">Fecha de creación: </span>{createdAt}</p>
                    <p><span className="font-medium text-gray-800">Última actualización: </span>{updatedAt}</p>
                </div>

                <div className="w-52 mb-4"><DrawerInfoStatus status={isActive} /></div>
                {isLoading ? <SpinnerContainer color="border-indigo-700" size="lg" /> : <UploadCategoryImage />}

            </div>
        </RightDrawerLayout>
    );
};
