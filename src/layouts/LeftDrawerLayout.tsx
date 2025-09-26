import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDrawer } from "../shared/hooks";
import { IoIosInformationCircleOutline } from "react-icons/io";

interface DrawerProps {
    title: string,
    width: string,
    children: React.ReactNode;
}

export const LeftDrawerLayout: React.FC<DrawerProps> = ({ title, width, children }) => {
    const { leftDrawerIsOpen, onCloseDrawers } = useDrawer()

    return (
        <AnimatePresence>
            {leftDrawerIsOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-gray-700/40 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCloseDrawers}
                    />

                    <motion.div
                        className={`fixed top-0 left-0 h-full ${width} bg-white shadow-xl z-50 flex flex-col`}
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "keyframes", duration: 0.2 }}
                    >
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-2 text-indigo-600">
                                <IoIosInformationCircleOutline size={20} />
                                <h2 className="text-lg font-semibold">
                                    {title}
                                </h2>
                            </div>
                            <button className="cursor-pointer" onClick={onCloseDrawers}>
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-4 flex-1 overflow-y-auto">{children}</div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
