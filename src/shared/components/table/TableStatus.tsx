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
                    : "bg-red-100 text-red-600 border border-red-300"
                }`}
        >
            {status ? "Activo" : "Inactivo"}
        </span>
    )
}
