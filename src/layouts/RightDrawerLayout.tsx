import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useDrawer, useTheme } from "../shared/hooks";

interface DrawerProps {
  title: string;
  width: string;
  children: React.ReactNode;
}

export const RightDrawerLayout: React.FC<DrawerProps> = ({ title, width, children }) => {
  const { rightDrawerIsOpen, onCloseDrawers } = useDrawer();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      {rightDrawerIsOpen && (
        <>
          <motion.div
            className={`
              fixed inset-0 z-40 transition-colors
              ${isDark ? "bg-black/60" : "bg-gray-700/40"}
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseDrawers}
          />

          <motion.div
            className={`
              fixed top-0 right-0 h-full ${width} z-50 flex flex-col shadow-xl
              transition-colors duration-200
              ${isDark 
                ? "bg-gray-900 text-gray-100 border-l border-gray-800" 
                : "bg-white text-gray-800"
              }
            `}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "keyframes", duration: 0.2 }}
          >
            <div className="flex items-center justify-between p-4">
              <div className={`
                  flex items-center gap-2 font-semibold
                  ${isDark ? "text-indigo-400" : "text-indigo-600"}
                `}
              >
                <IoIosInformationCircleOutline size={20} />
                <h2 className="text-lg">{title}</h2>
              </div>

              <button
                onClick={onCloseDrawers}
                className={`
                  p-1 rounded-md transition-colors duration-200
                  ${isDark
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 py-5 flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
