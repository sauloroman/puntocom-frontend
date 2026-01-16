import React, { useEffect, useState } from 'react'
import { useDrawer, useInventoryAdjustment, useModal, useReports } from '../../../../shared/hooks'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { 
  AdjustmentGrid,
  AdjustmentInfoLeftDrawer,
  ButtonOpenModalCreateInventory, 
  FilterSelectAdjustmentType, 
  FilterSelectAdjustmentUser,
  ModalConfirmCreateAdjustmentsReport,
  ModalCreateInventoryAdjustment, 
  PaginationAdjustments, 
  TableAdjustments, 
} from './components'
import { SpinnerContainer } from '../../../../shared/components/spinner'
import { FAB, ToggleGridTableViewButton } from '../../../../shared/components/button'
import { ModalRequestPasswordAdmin } from '../../../access/views/users/components'
import { GenerateReport } from '../../../reports/components'
import { BsPlus, BsFileEarmarkText } from 'react-icons/bs'

export const WarehouseAdjustment: React.FC = () => {
  
  const { drawelName, leftDrawerIsOpen } = useDrawer()
  const { modalIsOpen, modalName, onOpenConfirmAdminPassword, onOpenModal } = useModal()
  const { adjustments, isLoading, getInventoryAdjustments, filter, filterInventoryAdjustments, isTableStyleActive, setTableStyle } = useInventoryAdjustment()
  const { isLoading: isReportsLoading } = useReports()
  const [showFABMenu, setShowFABMenu] = useState(false)

  useEffect(() => {
    if ( !adjustments ) {
      getInventoryAdjustments()
    }
  }, [])

  useEffect(() => {
    filterInventoryAdjustments(1)
  }, [filter])

  const openCreateAdjustmentModal = () => {
    setShowFABMenu(false)
    onOpenModal(ModalNames.createInventoryAdjustment)
  }

  const openReportModal = () => {
    onOpenConfirmAdminPassword(ModalNames.confirmCreateInventoryAdjustmentsReport)
    setShowFABMenu(false)
  }

  return (
    <>
      <section>
        <div className="flex flex-col gap-4 mb-6">
          
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
            
            <div className='flex flex-wrap items-center gap-2 flex-1'>
              <ToggleGridTableViewButton status={isTableStyleActive} onToggle={setTableStyle} />
              
              <div className='w-full sm:w-60'>
                <FilterSelectAdjustmentUser />
              </div>
              
              <div className='w-full sm:w-60'>
                <FilterSelectAdjustmentType />
              </div>
            </div>

            <div className='hidden md:flex items-center gap-3'>
              <GenerateReport onConfirm={() => onOpenConfirmAdminPassword(ModalNames.confirmCreateInventoryAdjustmentsReport)} />
              <ButtonOpenModalCreateInventory />
            </div>
          </div>
        </div>

        {
          (isLoading || isReportsLoading)
          ? (
            <div className='my-24'><SpinnerContainer size='lg' color='bg-white' /></div>
          )
          : (
            <>
              { isTableStyleActive 
                ? <TableAdjustments data={adjustments ?? []} /> 
                : <AdjustmentGrid data={adjustments ?? []} />
              }
              <PaginationAdjustments />
            </>
          )
        }
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
              className="cursor-pointer flex items-center gap-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 px-4 py-3"
            >
              <BsFileEarmarkText size={20} />
              <span className="text-sm font-medium pr-2">Generar Reporte</span>
            </button>

            <button
              onClick={openCreateAdjustmentModal}
              className="cursor-pointer flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 px-4 py-3"
            >
              <BsPlus size={24} />
              <span className="text-sm font-medium pr-2">Crear Ajuste</span>
            </button>
          </div>
        </>
      )}

      <FAB onClick={() => setShowFABMenu(!showFABMenu)} />

      { modalIsOpen && modalName === ModalNames.confirmAdminPassword && <ModalRequestPasswordAdmin />}
      { modalIsOpen && modalName === ModalNames.createInventoryAdjustment && <ModalCreateInventoryAdjustment />}
      { modalIsOpen && modalName === ModalNames.confirmCreateInventoryAdjustmentsReport && <ModalConfirmCreateAdjustmentsReport />}
      { leftDrawerIsOpen && drawelName === DrawelNames.infoAdjustment && <AdjustmentInfoLeftDrawer />}
    </>
  )
}