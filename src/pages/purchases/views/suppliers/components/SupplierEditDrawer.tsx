import React from 'react'
import { RightDrawerLayout } from '../../../../../layouts/RightDrawerLayout'
import { useSuppliers } from '../../../../../shared/hooks'
import { SpinnerContainer } from '../../../../../shared/components'
import { FormEditSupplier } from './FormEditSupplier'

export const SupplierEditDrawer: React.FC = () => {

  const { isLoading } = useSuppliers()

  return (
    <RightDrawerLayout width='w-2xl' title='Editar Proveedor'>
      <div className="p-4">
        {
          isLoading
          ? (<SpinnerContainer size='lg' color='border-indigo-700' />) 
          : (<FormEditSupplier />)
        }
      </div>
    </RightDrawerLayout>
  )
}
