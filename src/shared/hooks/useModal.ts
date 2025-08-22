import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { ModalNames } from "../../interfaces/ui/modal.interface"
import { closeModal, openModal } from "../../store/modal/modal.slice"

export const useModal = () => {

    const dispatch = useDispatch<any>()
    const { isOpen, name } = useSelector( (state: RootState) => state.modal )

    const onOpenModal = ( name: ModalNames ) => {
        dispatch( openModal(name) )
    }

    const onCloseModal = () => {
        dispatch( closeModal() )
    }

    return {
        modalIsOpen: isOpen,
        modalName: name,

        onOpenModal,
        onCloseModal
    }

}