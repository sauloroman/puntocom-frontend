import React, { useMemo } from 'react'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { FaExclamationTriangle } from 'react-icons/fa'
import { CancelButton, ConfirmButton } from '../../../../../shared/components'
import { useModal, useSuppliers } from '../../../../../shared/hooks'

export const ModalConfirmChangeStatusSupplier: React.FC = () => {
  
  const { onCloseModal } = useModal()
  const {changeSupplierStatus} = useSuppliers()
  const { supplierSelected } = useSuppliers()
  const { id, name, lastname, isActive } = supplierSelected ?? {}
  
  const supplierName = useMemo(() => `${name ?? ''} ${lastname ?? ''}`.trim(), [supplierSelected])

   const onChangeSupplierStatus = () => {
    changeSupplierStatus( id!, !isActive )
    onCloseModal()
  };

  return (
    <ModalLayout width="w-lg">
      <div className="flex flex-col items-center justify-center text-center space-y-4 p-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600">
          <FaExclamationTriangle size={32} />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          {isActive ? 'Desactivar proveedor' : 'Activar proveedor'}
        </h2>

        <p className="text-gray-600">
          ¿Estás seguro de que quieres {isActive ? 'desactivar' : 'activar'} al proveedor{' '}
          <span className="font-medium text-gray-800">{supplierName}</span>?
        </p>

        <div className="flex items-center gap-4 pt-4">
          <div onClick={onChangeSupplierStatus}><ConfirmButton text={isActive ? 'Sí, desactivar' : 'Sí, activar'} /></div>
          <div onClick={onCloseModal}><CancelButton text='Cancelar' /></div>
        </div>
      </div>
    </ModalLayout>
  )
}
