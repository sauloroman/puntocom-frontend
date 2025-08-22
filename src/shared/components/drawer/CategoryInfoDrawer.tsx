import React from "react";
import { RightDrawerLayout } from "../../../layouts/RightDrawerLayout";
import { useCategories } from "../../hooks";
import { motion } from "framer-motion";
import { FaPowerOff, FaPowerOff as FaPowerOn, FaImage, FaPlus } from "react-icons/fa";

export const CategoryInfoDrawer: React.FC = () => {
    const { categorySelected } = useCategories();

    if (!categorySelected) return null;

    const { id, name, description, icon, isActive, createdAt, updatedAt } =
        categorySelected;

    const getInitial = (text: string) => text.charAt(0).toUpperCase();

    return (
        <RightDrawerLayout title="Información de categoría">
            <div className="p-4 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                    {icon !== 'Categoría sin ícono' ? (
                        <motion.div
                            className="h-14 w-14 rounded-xl overflow-hidden shadow bg-gray-100 flex items-center justify-center"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <img src={icon} alt={name} className="h-full w-full object-cover" />
                        </motion.div>
                    ) : (
                        <div className="h-14 w-14 rounded-xl flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xl font-bold shadow">
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

                <p className="text-gray-700 text-sm mb-4">
                    {description || "Sin descripción."}
                </p>

                {/* Detalles */}
                <div className="space-y-2 text-sm text-gray-600">
                    <p>
                        <span className="font-medium text-gray-800">#Id:</span> {id}
                    </p>
                    <p>
                        <span className="font-medium text-gray-800">Fecha de creación:</span>{" "}
                        {createdAt}
                    </p>
                    <p>
                        <span className="font-medium text-gray-800">
                            Última actualización:
                        </span>{" "}
                        {updatedAt}
                    </p>
                </div>

                <div className="mt-auto flex gap-3">
                    {isActive ? (
                        <button className="text-sm flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition">
                            <FaPowerOff className="w-4 h-4" />
                            Desactivar
                        </button>
                    ) : (
                        <button className="text-sm flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition">
                            <FaPowerOn className="w-4 h-4" />
                            Activar
                        </button>
                    )}

                    {icon !== 'Categoría sin ícono' ? (
                        <button className="text-sm flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                            <FaImage className="w-4 h-4" />
                            Cambiar imagen
                        </button>
                    ) : (
                        <button className="text-sm flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-dashed border-gray-400 text-gray-600 hover:bg-gray-50 transition">
                            <FaPlus className="w-4 h-4" />
                            Agregar imagen
                        </button>
                    )}
                </div>

            </div>
        </RightDrawerLayout>
    );
};
