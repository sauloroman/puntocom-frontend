import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { closeAlert, showAlert } from "../../store/alert/alert.slice"
import type { AlertI } from "../../interfaces/ui/alert.interface"

export const useAlert = () => {

    const dispatch = useDispatch<any>()
    const { isVisible, text, title, type } = useSelector((state: RootState) => state.alert )

    const activateAlert = ( info: Omit<AlertI, 'isVisible'> ) => {
        dispatch( showAlert({title: info.title, text: info.text, type: info.type}))
    }

    const hideAlert = () => {
        dispatch( closeAlert() )
    }

    return {
        isVisible,
        text,
        title,
        type,

        hideAlert,
        activateAlert,
    }
}