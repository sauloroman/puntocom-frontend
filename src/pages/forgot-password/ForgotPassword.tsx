import React from 'react'
import { RecoveryLayout } from '../../layouts'
import { ForgotPasswordForm, ModalEmailSentForgotPassword } from './components'
import { useAuth, useModal } from '../../shared/hooks'
import { ModalNames } from '../../interfaces/ui/modal.interface'
import { SpinnerContainer } from '../../shared/components/spinner'

export const ForgotPassword: React.FC = () => {

  const { modalIsOpen, modalName } = useModal()
  const { isLoading } = useAuth()

  return (
    <RecoveryLayout 
      title="¿Olvidaste tu contraseña?"
      description="Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla."
    >
      {
        isLoading
        ? (<SpinnerContainer color='bg-white' size='lg' />)
        : (<ForgotPasswordForm />)
      }
      { modalIsOpen && modalName === ModalNames.emailSentForgotPassword && <ModalEmailSentForgotPassword /> }
    </RecoveryLayout>
  )
}
