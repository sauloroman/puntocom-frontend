import React, { useEffect } from 'react'
import { CreateButton } from '../../../../shared/components'
import { 
  ModalConfirmChangeStatusSupplier,
  ModalConfirmCreateSupplierReport,
  ModalCreateSupplier, 
  ModalSupplierReport, 
  ModalWhatsappMessage, 
  PaginationSuppliers, 
  SearchSupplier, 
  SelectSupplierByCompany, 
  SelectSupplierByStatus, 
  SupplierEditDrawer, 
  SupplierGrid, 
  SupplierInfoDrawer, 
  TableSuppliers } from './components'
import { useDrawer, useModal, useSuppliers } from '../../../../shared/hooks'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { GenerateReport, SortElementsAlpha, ToggleGridTableView } from '../../../../shared/components/button'
import { ModalRequestPasswordAdmin } from '../../../access/views/users/components'

export const PurchasesSuppliers: React.FC = () => {

  const { modalIsOpen, modalName, onOpenModal, onOpenConfirmAdminPassword } = useModal()
  const { suppliers, getSuppliers, setTableStyle, isTableStyleActive, onOrderAlpha, isOrderedAsc } = useSuppliers()
  const { rightDrawerIsOpen, drawelName } = useDrawer()

  useEffect(() => {
    if (!suppliers) getSuppliers()
  }, [])

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-7">
          <div className="w-96">
            <SearchSupplier />
          </div>
          <div className="flex items-center justify-end gap-4 w-full">

            <div className="flex items-center gap-4">
              <SortElementsAlpha onToggle={ onOrderAlpha } desc={isOrderedAsc} />
              <ToggleGridTableView onToggle={setTableStyle} status={isTableStyleActive} />
              <div className='w-64'>
                <SelectSupplierByCompany />
              </div>
              <div className="w-50">
                <SelectSupplierByStatus />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <GenerateReport onConfirm={() => onOpenConfirmAdminPassword(ModalNames.confirmCreateSupplierReport)}/>
              <CreateButton className='w-40 p-2' onClick={() => onOpenModal(ModalNames.createSupplier)} text="Crear proveedor" />
            </div>
            
          </div>
        </div>
        <div>
          {
            isTableStyleActive
            ? (<TableSuppliers data={suppliers ?? []} />)
            : (<SupplierGrid data={suppliers ?? []} />)
          }
          <PaginationSuppliers />
        </div>
      </section>
      {modalIsOpen && modalName === ModalNames.confirmAdminPassword && <ModalRequestPasswordAdmin />}
      {modalIsOpen && modalName === ModalNames.createSupplier && <ModalCreateSupplier />}
      {modalIsOpen && modalName === ModalNames.confirmCreateSupplierReport && <ModalConfirmCreateSupplierReport />}
      {modalIsOpen && modalName === ModalNames.reportSuppliers && <ModalSupplierReport />}
      {modalIsOpen && modalName === ModalNames.confirmChangeStatusSupplier && <ModalConfirmChangeStatusSupplier />}
      {modalIsOpen && modalName === ModalNames.sendMessageToSupplier && <ModalWhatsappMessage />}
      {rightDrawerIsOpen && drawelName === DrawelNames.infoSupplier && <SupplierInfoDrawer />}
      {rightDrawerIsOpen && drawelName === DrawelNames.editSupplier && <SupplierEditDrawer />}
    </>
  )
}
