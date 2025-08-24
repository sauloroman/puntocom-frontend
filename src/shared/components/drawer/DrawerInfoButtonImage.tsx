import { FaImage, FaPlus } from "react-icons/fa"

interface DrawerInfoButtonImageProps {
    text: string,
    icon: string
}

export const DrawerInfoButtonImage: React.FC<DrawerInfoButtonImageProps> = ({ icon, text }) => {
    return (
        <>
            {icon !== text ? (
                <button className="cursor-pointer text-sm flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                    <FaImage className="w-4 h-4" />
                    Cambiar imagen
                </button>
            ) : (
                <button className="cursor-pointer text-sm flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-dashed border-gray-400 text-gray-600 hover:bg-gray-50 transition">
                    <FaPlus className="w-4 h-4" />
                    Agregar imagen
                </button>
            )}
        </>
    )
}