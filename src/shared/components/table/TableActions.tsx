import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { CiMenuKebab, CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";

interface TableActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TableActions: React.FC<TableActionsProps> = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + window.scrollY, left: rect.right - 128 });
    }
    setOpen(!open);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
      >
        <CiMenuKebab size={15} />
      </button>

      {open &&
        createPortal(
          <div
            style={{ top: position.top, left: position.left }}
            className="absolute w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            <button
              onClick={() => {
                onEdit?.();
                setOpen(false);
              }}
              className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"
            >
              <CiEdit />
              Editar
            </button>
            <button
              onClick={() => {
                onDelete?.();
                setOpen(false);
              }}
              className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"
            >
              <GoTrash />
              Eliminar
            </button>
          </div>,
          document.body
        )}
    </>
  );
};
