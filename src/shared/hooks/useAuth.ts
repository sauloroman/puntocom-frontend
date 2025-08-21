import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { UserRequest } from "../../interfaces/user.interface"
import { startLoginUserWithEmailAndPassword } from "../../store/auth/auth.thunk"

export const useAuth = () => {

    const dispatch = useDispatch<any>()
    const { isLoading, status, user } = useSelector( (state: RootState) => state.auth )

    const onLoginEmailPassword = ( data: UserRequest ) => {
        dispatch( startLoginUserWithEmailAndPassword(data) )
    }

    return {
        //Attributes
        isLoading,
        status,
        user,

        // Methods
        onLoginEmailPassword,
    }

}