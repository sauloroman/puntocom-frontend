import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiLockPasswordLine } from "react-icons/ri"
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import type { CheckAdminPassword } from '../../../../../interfaces/dto/user.interface'
import { ModalLayout } from '../../../../../layouts'
import { useAuth, useModal, useUsers, useTheme } from '../../../../../shared/hooks'
import { ConfirmButton } from '../../../../../shared/components/button'
import { Input, Label } from '../../../../../shared/components/form'
import { ErrorMessageForm } from '../../../../../shared/components/error-message'

export const ModalRequestPasswordAdmin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  const { confirmPasswordModal, onOpenModal } = useModal()
  const { user } = useAuth()
  const { checkAdminPassword, hasEnteredPasswordCorrectly } = useUsers()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const { handleSubmit, register, formState: { errors } } = useForm<CheckAdminPassword>()

  const onCheckAdminCredentials = (data: CheckAdminPassword) => {
    checkAdminPassword({
      id: user!.id,
      adminPassword: data.adminPassword
    })
  }

  useEffect(() => {
    if (hasEnteredPasswordCorrectly) {
      onOpenModal(confirmPasswordModal.nextModal!)
    }
  }, [hasEnteredPasswordCorrectly])

  return (
    <ModalLayout width="w-xl">
      <div
        className={`
          flex flex-col items-center justify-center text-center space-y-4 p-6 rounded-2xl
          transition-colors duration-200
          ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}
        `}
      >
        <div
          className={`
            flex items-center justify-center w-full gap-4 p-3 rounded-full
            ${isDark ? 'bg-indigo-600/20 text-indigo-300' : 'bg-yellow-100 text-yellow-600'}
          `}
        >
          <RiLockPasswordLine size={32} />
          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            Contraseña
          </h2>
        </div>

        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Ingresa la contraseña de administrador para realizar esta acción
        </p>

        <form className="w-full" onSubmit={handleSubmit(onCheckAdminCredentials)}>
          <div className="mb-5">
            <Label
              htmlFor="adminPassword"
              className={`
                mb-2 flex items-center justify-between w-full text-sm font-medium
                ${isDark ? 'text-gray-300' : 'text-gray-700'}
              `}
            >
              Ingrese su contraseña
              <div
                className={`cursor-pointer ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </div>
            </Label>

            <Input
              id="adminPassword"
              placeholder="***************"
              type={showPassword ? 'text' : 'password'}
              className={`
                w-full p-2 rounded-lg border focus:ring-2 text-sm transition-colors
                ${isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-indigo-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500'
                }
              `}
              {...register('adminPassword', {
                required: 'La contraseña es obligatoria'
              })}
            />

            {errors.adminPassword && <ErrorMessageForm message={errors.adminPassword.message} />}
          </div>

          <ConfirmButton
            className={`
              w-full p-2 font-medium rounded-lg transition-colors
              ${isDark ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}
            `}
            text="Ingresar contraseña"
          />
        </form>
      </div>
    </ModalLayout>
  )
}
