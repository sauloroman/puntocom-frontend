import React from 'react'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { FaExclamationTriangle } from 'react-icons/fa'
import { CancelButton, ConfirmButton } from '../../../../../shared/components'
import { useModal, useProducts } from '../../../../../shared/hooks'

export const ModalConfirmChangeStatusProduct: React.FC = () => {

    const { onCloseModal } = useModal()
    const { productSelected, onChangeProductStatus }  = useProducts()
    const { id, name, isActive } = productSelected ?? {}

    const onChangeStatus = () => {
        onChangeProductStatus(id!, !isActive)
        onCloseModal()
    }

    return (
        <ModalLayout width="w-lg">
            <div className="flex flex-col items-center justify-center text-center space-y-4 p-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600">
                    <FaExclamationTriangle size={32} />
                </div>

                <h2 className="text-xl font-semibold text-gray-800">
                    {isActive ? 'Desactivar producto' : 'Activar producto'}
                </h2>

                <p className="text-gray-600">
                    ¿Estás seguro de que quieres {isActive ? 'desactivar' : 'activar'} el producto{' '}
                    <span className="font-medium text-gray-800">{name}</span>?
                </p>

                <div className="flex items-center gap-4 pt-4">
                    <div onClick={onChangeStatus}>
                        <ConfirmButton text={isActive ? 'Sí, desactivar' : 'Sí, activar'} />
                    </div>
                    <div onClick={onCloseModal}>
                        <CancelButton text="Cancelar" />
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}
