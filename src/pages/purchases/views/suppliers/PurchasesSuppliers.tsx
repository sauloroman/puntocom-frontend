import React, { useEffect } from 'react'
import { CreateButton } from '../../../../shared/components'
import { ModalCreateSupplier, PaginationSuppliers, SearchSupplier, SelectSupplierByCompany, SelectSupplierByStatus, TableSuppliers } from './components'
import { useModal, useSuppliers } from '../../../../shared/hooks'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'

export const PurchasesSuppliers: React.FC = () => {
    
    const { modalIsOpen, modalName, onOpenModal } = useModal()
    const { suppliers, getSuppliers } = useSuppliers()

    useEffect(() => {
        if ( !suppliers ) getSuppliers()
    }, [])

    return (
    <>
        <section>
                <div className="flex items-center justify-between mb-7">
                  <SearchSupplier />
                  <div className='flex items-center gap-5'>
                    <SelectSupplierByCompany />
                    <SelectSupplierByStatus />
                    <div className='w-40' onClick={() => onOpenModal( ModalNames.createSupplier )}>
                      <CreateButton text='Crear proveedor' />
                    </div>
                  </div>
                </div>
                <div>
                  <TableSuppliers data={suppliers ?? []} />
                  <PaginationSuppliers />
                </div>
              </section>
              { modalIsOpen && modalName === ModalNames.createSupplier && <ModalCreateSupplier />}
        
    </>
  )
}
