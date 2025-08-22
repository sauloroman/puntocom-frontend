import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { setPageState, setWindowState } from "../../store/tabs/tabs.slice"
import type { WindowsTab } from "../../interfaces/ui/tabs.interface"

export const useTabs = () => {

    const dispatch = useDispatch<any>()
    const { tab, window } = useSelector( (state: RootState) => state.tabs )

    const setWindow = (windowTo: WindowsTab) => {
        if ( window !== windowTo ) {
            dispatch( setWindowState(windowTo) )
            dispatch( setPageState(undefined) )
        }
    }

    const setActiveTab = (tab: string | undefined) => {
        dispatch( setPageState(tab) )
    }

    return {
        tab, 
        window,

        setWindow,
        setActiveTab
    }
}