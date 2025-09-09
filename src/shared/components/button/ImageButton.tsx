import { FaImage } from "react-icons/fa"

interface DrawerInfoButtonImageProps {
    text: string
}

export const ImageButton: React.FC<DrawerInfoButtonImageProps> = ({ text }) => {
    return (
        <button type="button" className="cursor-pointer text-sm flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition w-full">
            <FaImage className="w-4 h-4" />
            {text}
        </button>

    )
}