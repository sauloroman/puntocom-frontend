import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useDrawer, useTheme } from "../shared/hooks";

interface DrawerProps {
    title: string,
    width: string,
    children: React.ReactNode;
}

export const LeftDrawerLayout: React.FC<DrawerProps> = ({ title, width, children }) => {
    const { leftDrawerIsOpen, onCloseDrawers } = useDrawer();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <AnimatePresence>
            {leftDrawerIsOpen && (
                <>
                    <motion.div
                        className={`fixed inset-0 z-40 ${isDark ? "bg-black/50" : "bg-gray-700/40"}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCloseDrawers}
                    />
                    <motion.div
                        className={`
                            fixed top-0 left-0 h-full ${width} z-50 flex flex-col shadow-xl transition-colors
                            ${isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"}
                        `}
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "keyframes", duration: 0.2 }}
                    >
                        <div className="flex items-center justify-between p-4">
                            <div className={`flex items-center gap-2 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
                                <IoIosInformationCircleOutline size={20} />
                                <h2 className="text-lg font-semibold">
                                    {title}
                                </h2>
                            </div>

                            <button
                                className={`
                                    cursor-pointer p-1 rounded-md transition-colors
                                    ${isDark ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-600"}
                                `}
                                onClick={onCloseDrawers}
                            >
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-4 flex-1 overflow-y-auto">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
