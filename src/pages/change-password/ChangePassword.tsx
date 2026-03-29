import React from 'react'
import { RecoveryLayout } from '../../layouts'
import { ChangePasswordForm } from './components'
import { useAuth, useModal } from '../../shared/hooks'
import { SpinnerContainer } from '../../shared/components/spinner'
import { ModalNames } from '../../interfaces/ui/modal.interface'
import { ModalPasswordChanged } from './components'

export const ChangePassword: React.FC = () => {

  const { isLoading } = useAuth()
  const { modalIsOpen, modalName } = useModal()

  return (
    <RecoveryLayout
      imageDark='https://res.cloudinary.com/dlamufioy/image/upload/v1774414034/puntocom/6_bhbrpu.png'
      imageWhite='https://res.cloudinary.com/dlamufioy/image/upload/v1774414034/puntocom/3_ktw2eb.png'
      title="Crea una nueva contraseña"
      description="Asegúrate de que sea segura y fácil de recordar."
    >
      {
        isLoading
          ? (<SpinnerContainer color='bg-white' size='lg' />)
          : (<ChangePasswordForm />)
      }
      { modalIsOpen && modalName === ModalNames.passwordChanged && <ModalPasswordChanged />}
    </RecoveryLayout>
  )
}
