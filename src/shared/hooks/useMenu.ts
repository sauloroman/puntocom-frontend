import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { setCollapsed, setIsMobileMenuOpen } from "../../store/menu/menu.slice"

export const useMenu = () => {

    const dispatch = useDispatch<any>()
    const { collapsed, isMobileMenuOpen } = useSelector((state: RootState) => state.menu)

    const openMenu = () => {
        dispatch(setCollapsed(true))
    }
    
    const closeMenu = () => {
        dispatch(setCollapsed(false))
    }

    const openMenuMobile = () => {
        dispatch(setIsMobileMenuOpen(true))
    }

    const closeMenuMobile = () => {
        dispatch(setIsMobileMenuOpen(false))
    }

    return {
        collapsed,
        isMobileMenuOpen,

        openMenu,
        closeMenu,
        openMenuMobile,
        closeMenuMobile,
    }
}