import React, { useEffect, useState } from 'react'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { 
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
import { useDrawer, useModal, useSuppliers } from '../../../../shared/hooks'
import { ModalRequestPasswordAdmin } from '../../../access/views/users/components'
import { CreateButton, SortElementsAlphaButton, ToggleGridTableViewButton, FAB } from '../../../../shared/components/button'
import { GenerateReport } from '../../../reports/components/GenerateReport'
import { BsPlus, BsFileEarmarkText } from 'react-icons/bs'

export const PurchasesSuppliers: React.FC = () => {

  const { modalIsOpen, modalName, onOpenModal, onOpenConfirmAdminPassword } = useModal()
  const { suppliers, getSuppliers, setTableStyle, isTableStyleActive, onOrderAlpha, isOrderedAsc } = useSuppliers()
  const { rightDrawerIsOpen, drawelName } = useDrawer()
  const [showFABMenu, setShowFABMenu] = useState(false)

  useEffect(() => {
    if (!suppliers) getSuppliers()
  }, [])

  const openCreateSupplierModal = () => {
    onOpenModal(ModalNames.createSupplier)
    setShowFABMenu(false)
  }

  const openReportModal = () => {
    onOpenConfirmAdminPassword(ModalNames.confirmCreateSupplierReport)
    setShowFABMenu(false)
  }

  return (
    <>
      <section>
        {/* Header responsive */}
        <div className="flex flex-col gap-4 mb-6">
          
          {/* Buscador */}
          <div className="w-full md:w-96">
            <SearchSupplier />
          </div>

          {/* Controles principales */}
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
            
            {/* Controles de filtrado y ordenamiento */}
            <div className='flex flex-wrap items-center gap-2 flex-1'>
              <SortElementsAlphaButton onToggle={onOrderAlpha} desc={isOrderedAsc} />
              <ToggleGridTableViewButton onToggle={setTableStyle} status={isTableStyleActive} />
              
              <div className='w-full sm:w-auto sm:min-w-[200px]'>
                <SelectSupplierByCompany />
              </div>
              
              <div className="w-full sm:w-auto sm:min-w-[160px]">
                <SelectSupplierByStatus />
              </div>
            </div>

            {/* Botones de acción - Solo desktop */}
            <div className='hidden md:flex items-center gap-3'>
              <GenerateReport onConfirm={() => onOpenConfirmAdminPassword(ModalNames.confirmCreateSupplierReport)} />
              <CreateButton className='w-40 p-2' onClick={openCreateSupplierModal} text="Crear proveedor" />
            </div>
          </div>
        </div>

        {/* Tabla o Grid */}
        <div>
          {
            isTableStyleActive
              ? (<TableSuppliers data={suppliers ?? []} />)
              : (<SupplierGrid data={suppliers ?? []} />)
          }
          <PaginationSuppliers />
        </div>
      </section>

      {/* Menú FAB - Solo mobile */}
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

      {/* Botón FAB principal - Solo mobile */}
      <FAB onClick={() => setShowFABMenu(!showFABMenu)} />

      {/* Modales */}
      {modalIsOpen && modalName === ModalNames.confirmAdminPassword && <ModalRequestPasswordAdmin />}
      {modalIsOpen && modalName === ModalNames.createSupplier && <ModalCreateSupplier />}
      {modalIsOpen && modalName === ModalNames.confirmCreateSupplierReport && <ModalConfirmCreateSupplierReport />}
      {modalIsOpen && modalName === ModalNames.confirmChangeStatusSupplier && <ModalConfirmChangeStatusSupplier />}
      {modalIsOpen && modalName === ModalNames.sendMessageToSupplier && <ModalWhatsappMessage />}
      
      {/* Drawers */}
      {rightDrawerIsOpen && drawelName === DrawelNames.infoSupplier && <SupplierInfoDrawer />}
      {rightDrawerIsOpen && drawelName === DrawelNames.editSupplier && <SupplierEditDrawer />}
    </>
  )
}