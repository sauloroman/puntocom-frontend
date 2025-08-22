import type React from "react"

interface TableStatusProps {
    status: boolean
}

export const TableStatus: React.FC<TableStatusProps> = ({ status }) => {
    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium 
                ${status
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-gray-100 text-gray-600 border border-gray-300"
                }`}
        >
            {status ? "Activo" : "Inactivo"}
        </span>
    )
}
