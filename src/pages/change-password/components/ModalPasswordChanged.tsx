import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { ModalLayout } from '../../../layouts'
import { useModal, useNavPage, useTheme } from '../../../shared/hooks'
import { ConfirmButton } from '../../../shared/components/button'

export const ModalPasswordChanged: React.FC = () => {

    const { goToPage } = useNavPage()
    const { onCloseModal } = useModal()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const onGoLoginPage = () => {
        goToPage('/auth/login')
        onCloseModal()
    }

    return (
        <ModalLayout width="w-xl">
            <div className="flex flex-col items-center justify-center text-center space-y-4 p-6">
                <div
                    className={`
            flex items-center justify-center w-16 h-16 rounded-full
            ${isDark
                            ? 'bg-green-900/40 text-green-400'
                            : 'bg-green-100 text-green-600'
                        }
          `}
                >
                    <FaCheckCircle size={30} />
                </div>

                <h2
                    className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'
                        }`}
                >
                    Contraseña actualizada
                </h2>

                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Tu contraseña ha sido cambiada correctamente.
                </p>

                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ahora puedes iniciar sesión con tu nueva contraseña.
                </p>

                <div className="pt-4 w-full">
                    <ConfirmButton
                        onClick={onGoLoginPage}
                        className="w-full p-2"
                        text="Ir al inicio de sesión"
                    />
                </div>
            </div>
        </ModalLayout>
    )
}
