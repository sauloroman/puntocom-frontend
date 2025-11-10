import type React from "react"

interface Props {
    type: string
}

export const TypeBadgeAdjustmentType: React.FC<Props> = ({ type }) => {
    const colors: Record<string, string> = {
        entrada: "from-green-100 to-green-200 text-green-800 border-green-300",
        salida: "from-red-100 to-red-200 text-red-800 border-red-300",
    }

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border bg-gradient-to-r ${
                colors[type] ?? "from-gray-100 to-gray-200 text-gray-800 border-gray-300"
            }`}
        >
            {type}
        </span>
    )
}