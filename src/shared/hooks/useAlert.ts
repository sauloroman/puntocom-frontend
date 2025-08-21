import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { closeAlert } from "../../store/alert/alert.slice"

export const useAlert = () => {

    const dispatch = useDispatch<any>()
    const { isVisible, text, title, type } = useSelector((state: RootState) => state.alert )

    const hideAlert = () => {
        dispatch( closeAlert() )
    }

    return {
        isVisible,
        text,
        title,
        type,

        hideAlert
    }
}