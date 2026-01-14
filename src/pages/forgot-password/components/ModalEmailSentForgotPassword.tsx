import React from 'react'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import { ModalLayout } from '../../../layouts'
import { useAuth, useModal, useTheme } from '../../../shared/hooks'
import { ConfirmButton } from '../../../shared/components/button'

export const ModalEmailSentForgotPassword: React.FC = () => {
  const { forgotPasswordEmail } = useAuth()
  const { onCloseModal } = useModal()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <ModalLayout width="w-xl">
      <div className="flex flex-col items-center justify-center text-center space-y-4 p-6">
        <div
          className={`
            flex items-center justify-center w-16 h-16 rounded-full
            ${isDark
              ? 'bg-indigo-900/40 text-indigo-400'
              : 'bg-indigo-100 text-indigo-600'
            }
          `}
        >
          <FaEnvelopeOpenText size={30} />
        </div>

        <h2
          className={`text-xl font-semibold ${
            isDark ? 'text-gray-100' : 'text-gray-800'
          }`}
        >
          Correo enviado
        </h2>

        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Hemos enviado un correo electrónico a:
        </p>

        <p
          className={`font-medium break-all ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`}
        >
          {forgotPasswordEmail.email}
        </p>

        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Sigue las instrucciones para completar el cambio de contraseña.
        </p>

        <div className="pt-4 w-full">
          <ConfirmButton
            onClick={onCloseModal}
            className="w-full p-2"
            text="Entendido"
          />
        </div>
      </div>
    </ModalLayout>
  )
}
