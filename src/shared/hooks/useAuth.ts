import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { UserRequest } from "../../interfaces/dto/user.interface"
import { 
    startChangingPassword, 
    startLoginUserWithEmailAndPassword, 
    startRenewingAuth, 
    startSendEmailForgotPassword 
} from "../../store/auth/auth.thunk"
import { logout } from "../../store/auth/auth.slice"
import { getEnvVariables } from "../helpers"
import type { ChangePasswordRequest, ForgotPasswordRequest } from "../../interfaces/dto/auth.interface"
import { ModalNames } from "../../interfaces/ui/modal.interface"
import { closeModal, openModal } from "../../store/modal/modal.slice"
import { startGettingProductsNoStock } from "../../store/products/products.thunk"
import { resetCategoriesState } from "../../store/categories/categories.slice"
import { resetProductsState } from "../../store/products/products.slice"
import { resetSuppliersState } from "../../store/suppliers/supplier.slice"
import { resetReportsState } from "../../store/reports/reports.slice"
import { resetSalesState } from "../../store/sale/sale.slice"
import { resetPurchasesState } from "../../store/purchase/purchase.slice"
import { resetInventoryState } from "../../store/inventory-adjustment/inventory-adjustment.slice"
import { resetPosState } from "../../store/pos/pos.slice"
import { resetAlertState } from "../../store/alert/alert.slice"
import { resetDashboardState } from "../../store/dashboard/dashboard.slice"

const { VITE_TOKEN_NAME } = getEnvVariables()

export const useAuth = () => {

    const dispatch = useDispatch<any>()
    const { isLoading, status, user, forgotPasswordEmail } = useSelector( (state: RootState) => state.auth )

    const onLoginEmailPassword = ( data: UserRequest ) => {
        dispatch( startLoginUserWithEmailAndPassword(data) )
    }

    const onCloseSession = () => {
        dispatch(startGettingProductsNoStock())
        dispatch(openModal(ModalNames.reminderStock))
    }
    
    const onLogout = () => {
        dispatch(resetCategoriesState())
        dispatch(resetProductsState())
        dispatch(resetSuppliersState())
        dispatch(resetReportsState())
        dispatch(resetSalesState())
        dispatch(resetPurchasesState())
        dispatch(resetInventoryState())
        dispatch(resetPosState())
        dispatch(resetAlertState())
        dispatch(resetDashboardState())
        dispatch(closeModal())
        dispatch(logout())
        localStorage.removeItem(VITE_TOKEN_NAME)
    }

    const renewAuth = () => {
        dispatch(startRenewingAuth())
    }

    const sendEmailForgotPassword = ( data: ForgotPasswordRequest ) => {
        dispatch(startSendEmailForgotPassword(data))
    }

    const changePassword = ( data: ChangePasswordRequest ) => {
        dispatch(startChangingPassword(data))
    }

    return {
        //Attributes
        isLoading,
        status,
        user,
        forgotPasswordEmail,

        // Methods
        onLoginEmailPassword,
        onLogout,
        renewAuth,
        sendEmailForgotPassword,
        changePassword,
        onCloseSession,
    }

}