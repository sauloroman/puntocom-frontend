import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { setTheme } from "../../store/theme/theme.slice"
import { ThemeType } from "../../interfaces/ui/theme.interface"

export const useTheme = () => {

    const dispatch = useDispatch<any>()
    const { theme } = useSelector((state: RootState) => state.theme)

    const activateDarkMode = () => {
        dispatch(setTheme(ThemeType.dark))
    }
    
    const activateLightMode = () => {
        dispatch(setTheme(ThemeType.light))
    }

    return {
        theme,

        activateDarkMode,
        activateLightMode
    }
}