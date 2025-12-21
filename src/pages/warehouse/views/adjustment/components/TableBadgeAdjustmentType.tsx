import type React from "react"
import { useTheme } from "../../../../../shared/hooks"

interface Props {
    type: string
}

export const TypeBadgeAdjustmentType: React.FC<Props> = ({ type }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const lightColors: Record<string, string> = {
        entrada: "from-green-100 to-green-200 text-green-800 border-green-300",
        salida: "from-red-100 to-red-200 text-red-800 border-red-300",
    }

    const darkColors: Record<string, string> = {
        entrada: "from-emerald-950/50 to-emerald-900/50 text-emerald-400 border-emerald-700",
        salida: "from-red-950/50 to-red-900/50 text-red-400 border-red-700",
    }

    const colors = isDark ? darkColors : lightColors
    const defaultColor = isDark 
        ? "from-gray-800 to-gray-700 text-gray-300 border-gray-600"
        : "from-gray-100 to-gray-200 text-gray-800 border-gray-300"

    return (
        <span
            className={`
                inline-flex items-center gap-1.5 px-3 py-1 rounded-lg 
                text-xs font-bold border bg-gradient-to-r transition-colors duration-200
                ${colors[type] ?? defaultColor}
            `}
        >
            {type}
        </span>
    )
}