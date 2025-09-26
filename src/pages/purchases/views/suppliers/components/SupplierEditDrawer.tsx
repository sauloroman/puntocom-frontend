import React from 'react'
import { RightDrawerLayout } from '../../../../../layouts/RightDrawerLayout'
import { useModal, useSuppliers } from '../../../../../shared/hooks'
import { SpinnerContainer } from '../../../../../shared/components'
import { FormEditSupplier } from './FormEditSupplier'
import { DrawerInfoStatus } from '../../../../../shared/components/drawer/DrawerInfoStatus'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'
import { FaPlus } from 'react-icons/fa'

export const SupplierEditDrawer: React.FC = () => {

  const { isLoading, supplierSelected } = useSuppliers()
  const { onOpenModal } = useModal()
  
  const onOpenModalToConfirmChangeStatus = () => {
    onOpenModal(ModalNames.confirmChangeStatusSupplier)
  }

  return (
    <RightDrawerLayout width='w-2xl' title='Editar Proveedor'>
      <div className="p-4">
        {
          isLoading
          ? (<SpinnerContainer size='lg' color='border-indigo-700' />) 
          : (
            <div className='space-y-3'>
              <FormEditSupplier />
              <div className="mt-10 space-y-3">
                <h3 className='flex items-center gap-2 text-lg text-indigo-700 font-semibold'>
                  <FaPlus size={20} />
                  Más acciones
                </h3>
                <DrawerInfoStatus 
                  status={supplierSelected?.isActive!} 
                  onChangeStatus={onOpenModalToConfirmChangeStatus} 
                />
              </div>
            </div> 
          )
        }
      </div>
    </RightDrawerLayout>
  )
}
