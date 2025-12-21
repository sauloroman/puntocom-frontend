import React from 'react'
import { RightDrawerLayout } from '../../../../../layouts/RightDrawerLayout'
import { useModal, useProducts, useTheme } from '../../../../../shared/hooks'
import { SpinnerContainer } from '../../../../../shared/components'
import { FaPlus } from 'react-icons/fa'
import { DrawerInfoStatus } from '../../../../../shared/components/drawer/DrawerInfoStatus'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'
import { FormEditProduct, UploadProductImage } from './'

export const ProductEditDrawer: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const { isLoading, productSelected } = useProducts()
  const { onOpenModal } = useModal()

  const onOpenModalToConfirmChangeStatus = () => {
    onOpenModal(ModalNames.confirmChangeStatusProduct)
  }

  return (
    <RightDrawerLayout width='w-2xl' title='Editar Producto'>
      {
        isLoading
          ? (<SpinnerContainer size='lg' color={isDark ? 'border-indigo-400' : 'border-indigo-700'} />)
          : (
            <div className='space-y-3'>
              <FormEditProduct />
              <div className='mt-10 space-y-3'>
                <h3 className={`
                  flex items-center gap-2 text-lg font-semibold transition-colors duration-200
                  ${isDark ? 'text-indigo-400' : 'text-indigo-700'}
                `}>
                  <FaPlus size={20} />
                  Más acciones
                </h3>
                <DrawerInfoStatus
                  status={productSelected?.isActive!}
                  onChangeStatus={onOpenModalToConfirmChangeStatus}
                />
                <UploadProductImage />
              </div>
            </div>
          )
      }
    </RightDrawerLayout>
  )
}