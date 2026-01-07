import React from 'react'
import { ModalLayout } from '../../../../../layouts'
import { ConfirmButton } from '../../../../../shared/components/button'
import { useModal, useUsers, useTheme } from '../../../../../shared/hooks'

export const ModalEmailSentToUser: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const { modalMessage, onCloseConfirmAdminPassword } = useModal()
  const { resetEnteredAdminPassword } = useUsers()

  const onClose = () => {
    onCloseConfirmAdminPassword()
    resetEnteredAdminPassword()
  }

  return (
    <ModalLayout width="w-lg">
      <div className="text-center px-6 py-4">
        <h3 className={`
          mb-4 text-xl font-semibold transition-colors
          ${isDark ? 'text-gray-100' : 'text-gray-800'}
        `}>
          Validación de usuario
        </h3>

        <p className={`
          mb-3 transition-colors
          ${isDark ? 'text-gray-300' : 'text-gray-600'}
        `}>
          {modalMessage}
        </p>

        <p className={`
          w-[80%] m-auto mb-6 text-sm transition-colors
          ${isDark ? 'text-gray-400' : 'text-gray-500'}
        `}>
          Sigue los pasos para validar tu cuenta
        </p>

        <div onClick={onClose}><ConfirmButton className='p-4' text="Aceptar" /></div>
      </div>
    </ModalLayout>
  )
}