import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { UserRequest } from "../../interfaces/dto/user.interface"
import { startLoginUserWithEmailAndPassword, startRenewingAuth } from "../../store/auth/auth.thunk"
import { logout } from "../../store/auth/auth.slice"
import { getEnvVariables } from "../helpers"

const { VITE_TOKEN_NAME } = getEnvVariables()

export const useAuth = () => {

    const dispatch = useDispatch<any>()
    const { isLoading, status, user } = useSelector( (state: RootState) => state.auth )

    const onLoginEmailPassword = ( data: UserRequest ) => {
        dispatch( startLoginUserWithEmailAndPassword(data) )
    }

    const onLogout = () => {
        dispatch(logout())
        localStorage.removeItem(VITE_TOKEN_NAME)
    }

    const renewAuth = () => {
        dispatch(startRenewingAuth())
    }

    return {
        //Attributes
        isLoading,
        status,
        user,

        // Methods
        onLoginEmailPassword,
        onLogout,
        renewAuth
    }

}