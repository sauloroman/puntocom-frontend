import { FaPowerOff, FaPowerOff as FaPowerOn } from "react-icons/fa"
import { useTheme } from "../../hooks"

interface DrawerInfoStatusProps {
    status: boolean
    onChangeStatus: () => void
}

export const DrawerInfoStatus: React.FC<DrawerInfoStatusProps> = ({ status, onChangeStatus }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
        <>
            {
                status ? (
                    <button 
                        onClick={onChangeStatus} 
                        className={`
                            w-full cursor-pointer text-sm flex items-center justify-center gap-2 
                            px-4 py-2 rounded-xl border transition-colors duration-200
                            ${isDark
                                ? 'border-red-500/70 text-red-400 hover:bg-red-950/30'
                                : 'border-red-300 text-red-600 hover:bg-red-50'
                            }
                        `}
                    >
                        <FaPowerOff className="w-4 h-4" />
                        Desactivar
                    </button>
                ) : (
                    <button 
                        onClick={onChangeStatus} 
                        className={`
                            w-full cursor-pointer text-sm flex items-center justify-center gap-2 
                            px-4 py-2 rounded-xl transition-colors duration-200
                            ${isDark
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : 'bg-green-500 text-white hover:bg-green-600'
                            }
                        `}
                    >
                        <FaPowerOn className="w-4 h-4" />
                        Activar
                    </button>
                )
            }
        </>
    )
}