import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { CiMenuKebab, CiEdit } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";
import { useTheme } from "../../hooks";

interface TableActionsProps {
  onView: () => void;
  onEdit?: () => void;
  hideEdit?: boolean;
}

export const TableActions: React.FC<TableActionsProps> = ({ onView, onEdit, hideEdit = false }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !event.composedPath().includes(menuRef.current) &&
        !event.composedPath().includes(buttonRef.current)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 160;
      const left = Math.min(
        rect.left + window.scrollX,
        window.innerWidth - menuWidth - 10
      );

      setPosition({ top: rect.bottom + window.scrollY + 6, left });
    }
    setOpen(prev => !prev);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`
          p-2 rounded-full transition cursor-pointer
          ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}
        `}
        aria-label="Abrir acciones"
      >
        <CiMenuKebab size={18} className={isDark ? "text-gray-300" : "text-gray-700"} />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{ top: position.top, left: position.left }}
            className={`
              absolute w-40 rounded-lg shadow-lg z-[9999] animate-fade-in
              border
              ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-gray-300"
                  : "bg-white border-gray-200 text-gray-700"
              }
            `}
          >
            <button
              onClick={() => {
                onView();
                setOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2 text-sm flex items-center gap-2 rounded-t-lg transition cursor-pointer
                ${
                  isDark
                    ? "hover:bg-gray-700/40 text-gray-300"
                    : "hover:bg-gray-50 text-gray-600"
                }
              `}
            >
              <CgDetailsMore className={isDark ? "text-gray-300" : "text-gray-600"} />
              Ver Detalles
            </button>

            {!hideEdit && onEdit && (
              <button
                onClick={() => {
                  onEdit();
                  setOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-2 text-sm flex items-center gap-2 rounded-b-lg transition cursor-pointer
                  ${
                    isDark
                      ? "hover:bg-gray-700/40 text-gray-300"
                      : "hover:bg-gray-50 text-gray-600"
                  }
                `}
              >
                <CiEdit className={isDark ? "text-gray-300" : "text-gray-600"} />
                Editar
              </button>
            )}
          </div>,
          document.body
        )}
    </>
  );
};
