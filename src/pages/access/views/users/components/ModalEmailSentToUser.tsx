import React from 'react'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { ConfirmButton } from '../../../../../shared/components'
import { useModal } from '../../../../../shared/hooks'

export const ModalEmailSentToUser: React.FC = () => {
  const { modalMessage } = useModal()

  return (
    <ModalLayout width="w-lg">
      <div className="text-center px-6 py-4">
        <h3 className="mb-4 text-xl font-semibold text-gray-800">
          Validación de usuario
        </h3>

        <p className="mb-3 text-gray-600">{modalMessage}</p>

        <p className="w-[80%] m-auto mb-6 text-sm text-gray-500">
          Sigue los pasos para validar tu cuenta
        </p>

        <ConfirmButton text="Aceptar" />
      </div>
    </ModalLayout>
  )
}
