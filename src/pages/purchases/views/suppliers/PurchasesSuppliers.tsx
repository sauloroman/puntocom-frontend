import React, { useEffect, useState } from 'react'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { 
  AppliedSuppliersFilter,
  ModalConfirmChangeStatusSupplier,
  ModalConfirmCreateSupplierReport,
  ModalCreateSupplier, 
  ModalWhatsappMessage, 
  PaginationSuppliers, 
  SearchSupplier, 
  SelectSupplierByCompany, 
  SelectSupplierByStatus, 
  SupplierEditDrawer, 
  SupplierGrid, 
  SupplierInfoDrawer, 
  TableSuppliers 
} from './components'
import { useDrawer, useModal, useReports, useSuppliers } from '../../../../shared/hooks'
import { ModalRequestPasswordAdmin } from '../../../access/views/users/components'
import { CreateButton, SortElementsAlphaButton, ToggleGridTableViewButton, FAB } from '../../../../shared/components/button'
import { GenerateReport } from '../../../reports/components/GenerateReport'
import { BsPlus, BsFileEarmarkText } from 'react-icons/bs'
import { SpinnerScreen } from '../../../../shared/components/spinner'

export const PurchasesSuppliers: React.FC = () => {

  const { 
    modalIsOpen, 
    modalName, 
    onOpenConfirmAdminPassword, 
    onOpenModal, 
  } = useModal()

  const { isLoading: isReportLoading } = useReports()

  const { 
    companies, 
    isOrderedAsc, 
    isTableStyleActive, 
    onGetSuppliers, 
    onGetUniqueCompanies,
    onOrderAlpha, 
    onSetTableStyle, 
    suppliers, 
  } = useSuppliers()

  const { rightDrawerIsOpen, drawelName } = useDrawer()
  const [showFABMenu, setShowFABMenu] = useState(false)

  useEffect(() => {
    if (!suppliers) onGetSuppliers()
  }, [])

  useEffect(() => {
    if ( !companies ) onGetUniqueCompanies()
  }, [])

  const openCreateSupplierModal = () => {
    onOpenModal(ModalNames.createSupplier)
    setShowFABMenu(false)
  }

  const openReportModal = () => {
    onOpenConfirmAdminPassword(ModalNames.confirmCreateSupplierReport)
    setShowFABMenu(false)
  }

  if ( isReportLoading ) {
    return (<SpinnerScreen />)
  }

  return (
    <>
      <section>
        <div className="flex flex-col gap-4 mb-6">
          
          <div className="w-full flex justify-between items-center">
            <div className="md:w-1/4"><SearchSupplier /></div>
            <AppliedSuppliersFilter />
          </div>

          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
            
            <div className='flex flex-wrap items-center gap-2 flex-1'>
              <SortElementsAlphaButton onToggle={onOrderAlpha} desc={isOrderedAsc} />
              <ToggleGridTableViewButton onToggle={onSetTableStyle} status={isTableStyleActive} />
              
              <div className='w-full sm:w-auto sm:min-w-[200px]'><SelectSupplierByCompany /></div>
              <div className="w-full sm:w-auto sm:min-w-[200px]"><SelectSupplierByStatus /></div>
            </div>

            <div className='hidden md:flex items-center gap-3'>
              <GenerateReport onConfirm={() => onOpenConfirmAdminPassword(ModalNames.confirmCreateSupplierReport)} />
              <CreateButton className='w-40 p-2' onClick={openCreateSupplierModal} text="Crear proveedor" />
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

      {showFABMenu && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowFABMenu(false)}
          />
          
          <div className="md:hidden fixed bottom-24 right-6 flex flex-col gap-3 z-50">
            <button
              onClick={openReportModal}
              className="flex items-center gap-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 px-4 py-3"
            >
              <BsFileEarmarkText size={20} />
              <span className="text-sm font-medium pr-2">Generar Reporte</span>
            </button>

            <button
              onClick={openCreateSupplierModal}
              className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 px-4 py-3"
            >
              <BsPlus size={24} />
              <span className="text-sm font-medium pr-2">Crear Proveedor</span>
            </button>
          </div>
        </>
      )}

      <FAB onClick={() => setShowFABMenu(!showFABMenu)} />

      {modalIsOpen && modalName === ModalNames.confirmAdminPassword && <ModalRequestPasswordAdmin />}
      {modalIsOpen && modalName === ModalNames.createSupplier && <ModalCreateSupplier />}
      {modalIsOpen && modalName === ModalNames.confirmCreateSupplierReport && <ModalConfirmCreateSupplierReport />}
      {modalIsOpen && modalName === ModalNames.confirmChangeStatusSupplier && <ModalConfirmChangeStatusSupplier />}
      {modalIsOpen && modalName === ModalNames.sendMessageToSupplier && <ModalWhatsappMessage />}
      
      {rightDrawerIsOpen && drawelName === DrawelNames.infoSupplier && <SupplierInfoDrawer />}
      {rightDrawerIsOpen && drawelName === DrawelNames.editSupplier && <SupplierEditDrawer />}
    </>
  )
}