import { FaPowerOff, FaPowerOff as FaPowerOn } from "react-icons/fa"

interface DrawerInfoStatusProps {
    status: boolean
    onChangeStatus: () => void
}

export const DrawerInfoStatus: React.FC<DrawerInfoStatusProps> = ({ status, onChangeStatus }) => {
    
    return (
        <>
            {
                status ? (
                    <button onClick={onChangeStatus} className="w-full cursor-pointer text-sm flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition">
                        <FaPowerOff className="w-4 h-4" />
                        Desactivar
                    </button>
                ) : (
                    <button onClick={onChangeStatus} className="w-full cursor-pointer text-sm flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition">
                        <FaPowerOn className="w-4 h-4" />
                        Activar
                    </button>
                )
            }
        </>
    )
}
