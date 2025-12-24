import React, { useEffect } from 'react'
import { useDrawer, useInventoryAdjustment, useModal, useReports } from '../../../../shared/hooks'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
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
import { SpinnerContainer } from '../../../../shared/components'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { GenerateReport, ToggleGridTableView } from '../../../../shared/components/button'
import { ModalRequestPasswordAdmin } from '../../../access/views/users/components'

export const WarehouseAdjustment: React.FC = () => {
  
  const { drawelName, leftDrawerIsOpen } = useDrawer()
  const { modalIsOpen, modalName, onOpenConfirmAdminPassword } = useModal()
  const { adjustments, isLoading, getInventoryAdjustments, filter, filterInventoryAdjustments, isTableStyleActive, setTableStyle } = useInventoryAdjustment()
  const { isLoading: isReportsLoading } = useReports()

  useEffect(() => {
    if ( !adjustments ) {
      getInventoryAdjustments()
    }
  }, [])

  useEffect(() => {
    filterInventoryAdjustments(1)
  }, [filter])

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-7">
          <div className="flex gap-4 items-center">
            <div className="w-60"><FilterSelectAdjustmentUser /></div>
            <div className="w-60"><FilterSelectAdjustmentType /></div>
          </div>
          <div className='flex gap-4 items-center'>
            <ToggleGridTableView status={isTableStyleActive} onToggle={setTableStyle} /> 
            <div className="w-fit"><GenerateReport onConfirm={() => onOpenConfirmAdminPassword(ModalNames.confirmCreateInventoryAdjustmentsReport)} /></div>
            <div className="w-fit"><ButtonOpenModalCreateInventory /></div>
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

      { modalIsOpen && modalName === ModalNames.confirmAdminPassword && <ModalRequestPasswordAdmin />}
      { modalIsOpen && modalName === ModalNames.createInventoryAdjustment && <ModalCreateInventoryAdjustment />}
      { modalIsOpen && modalName === ModalNames.confirmCreateInventoryAdjustmentsReport && <ModalConfirmCreateAdjustmentsReport />}
      { leftDrawerIsOpen && drawelName === DrawelNames.infoAdjustment && <AdjustmentInfoLeftDrawer />}
    </>
  )
}
