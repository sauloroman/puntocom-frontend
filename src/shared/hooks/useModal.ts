import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { ModalNames } from "../../interfaces/ui/modal.interface"
import { closeModal, openModal, resetConfirmModal, setConfirmModal } from "../../store/modal/modal.slice"

export const useModal = () => {

    const dispatch = useDispatch<any>()
    const { isOpen, name, message, confirmPasswordModal } = useSelector( (state: RootState) => state.modal )

    const onOpenModal = ( name: ModalNames ) => {
        dispatch( openModal(name) )
    }

    const onCloseModal = () => {
        dispatch( closeModal() )
    }

    const onOpenConfirmAdminPassword = (nextModal: ModalNames | null) => {
        dispatch(setConfirmModal(nextModal))
    }

    const onCloseConfirmAdminPassword = () => {
        dispatch(resetConfirmModal())
    }

    return {
        modalIsOpen: isOpen,
        modalName: name,
        modalMessage: message,
        confirmPasswordModal,

        onOpenModal,
        onCloseModal,
        onOpenConfirmAdminPassword,
        onCloseConfirmAdminPassword
    }

}