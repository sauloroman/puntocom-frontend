import { FaImage } from "react-icons/fa"
import { useTheme } from "../../hooks"

interface DrawerInfoButtonImageProps {
    text: string
}

export const ImageButton: React.FC<DrawerInfoButtonImageProps> = ({ text }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
        <button 
            type="button" 
            className={`
                cursor-pointer text-sm flex items-center justify-center gap-2 
                px-4 py-2 rounded-xl border transition-colors duration-200 w-full
                ${isDark
                    ? 'border-gray-600 text-gray-200 hover:bg-gray-800'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }
            `}
        >
            <FaImage className="w-4 h-4" />
            {text}
        </button>
    )
}