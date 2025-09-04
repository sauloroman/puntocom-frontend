import React, { useEffect } from 'react'
import { CreateButton } from '../../../../shared/components'
import { 
  ButtonSuppliersReport,
  ModalConfirmChangeStatusSupplier,
  ModalConfirmCreateSupplierReport,
  ModalCreateSupplier, 
  ModalSupplierReport, 
  PaginationSuppliers, 
  SearchSupplier, 
  SelectSupplierByCompany, 
  SelectSupplierByStatus, 
  SupplierEditDrawer, 
  SupplierInfoDrawer, 
  TableSuppliers } from './components'
import { useDrawer, useModal, useSuppliers } from '../../../../shared/hooks'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'

export const PurchasesSuppliers: React.FC = () => {

  const { modalIsOpen, modalName, onOpenModal } = useModal()
  const { suppliers, getSuppliers } = useSuppliers()
  const { rightDrawerIsOpen, drawelName } = useDrawer()

  useEffect(() => {
    if (!suppliers) getSuppliers()
  }, [])

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-7">
          <SearchSupplier />
          <div className="flex items-center justify-end gap-4 w-full">
            <div className="flex items-center gap-4">
              <SelectSupplierByCompany />
              <SelectSupplierByStatus />
            </div>

            <div className="flex items-center gap-3">
              <ButtonSuppliersReport />
              <div onClick={() => onOpenModal(ModalNames.createSupplier)}><CreateButton text="Crear proveedor" /></div>
            </div>
          </div>
        </div>
        <div>
          <TableSuppliers data={suppliers ?? []} />
          <PaginationSuppliers />
        </div>
      </section>
      {modalIsOpen && modalName === ModalNames.createSupplier && <ModalCreateSupplier />}
      {modalIsOpen && modalName === ModalNames.confirmCreateSupplierReport && <ModalConfirmCreateSupplierReport />}
      {modalIsOpen && modalName === ModalNames.reportSuppliers && <ModalSupplierReport />}
      {modalIsOpen && modalName === ModalNames.confirmChangeStatusSupplier && <ModalConfirmChangeStatusSupplier />}
      {rightDrawerIsOpen && drawelName === DrawelNames.infoSupplier && <SupplierInfoDrawer />}
      {rightDrawerIsOpen && drawelName === DrawelNames.editSupplier && <SupplierEditDrawer />}
    </>
  )
}
