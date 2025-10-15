import React, { useMemo } from 'react'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { FaExclamationTriangle } from 'react-icons/fa'
import { CancelButton, ConfirmButton } from '../../../../../shared/components'
import { useModal, useCategories } from '../../../../../shared/hooks'

export const ModalConfirmChangeStatusCategory: React.FC = () => {
  
  const { onCloseModal } = useModal()
  const { changeCategoryStatus, categorySelected } = useCategories()
  const { id, name, isActive } = categorySelected ?? {}

  const categoryName = useMemo(() => `${name ?? ''}`.trim(), [categorySelected])

  const onChangeCategoryStatus = () => {
    changeCategoryStatus(id!, !isActive)
    onCloseModal()
  }

  return (
    <ModalLayout width="w-lg">
      <div className="flex flex-col items-center justify-center text-center space-y-4 p-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600">
          <FaExclamationTriangle size={32} />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          {isActive ? 'Desactivar categoría' : 'Activar categoría'}
        </h2>

        <p className="text-gray-600">
          ¿Estás seguro de que quieres {isActive ? 'desactivar' : 'activar'} la categoría{' '}
          <span className="font-medium text-gray-800">{categoryName}</span>?
        </p>

        <div className="w-full flex items-center gap-4 pt-4">
          <ConfirmButton 
            className='p-2 flex-1'
            onClick={onChangeCategoryStatus} 
            text={isActive ? 'Sí, desactivar' : 'Sí, activar'} 
          />
          <CancelButton 
            className='p-2 flex-1'
            onClick={onCloseModal} 
            text="Cancelar" 
          />
          
        </div>
      </div>
    </ModalLayout>
  )
}
