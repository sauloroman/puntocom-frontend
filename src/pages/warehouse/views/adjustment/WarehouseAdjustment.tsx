import React, { useEffect } from 'react'
import { useDrawer, useInventoryAdjustment, useModal } from '../../../../shared/hooks'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { 
  TableAdjustments, 
  ButtonOpenModalCreateInventory, 
  FilterSelectAdjustmentType, 
  ModalCreateInventoryAdjustment, 
  SearchAdjustmentByProduct, 
  AdjustmentInfoLeftDrawer
} from './components'
import { SpinnerContainer } from '../../../../shared/components'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'

export const WarehouseAdjustment: React.FC = () => {
  
  const { drawelName, leftDrawerIsOpen } = useDrawer()
  const { modalIsOpen, modalName } = useModal()
  const { adjustments, isLoading, getInventoryAdjustments } = useInventoryAdjustment()

  useEffect(() => {
    if ( !adjustments ) getInventoryAdjustments()
  }, [])

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-7">
          <div className='w-80'><SearchAdjustmentByProduct /></div>
          <div className='flex gap-4 items-center'>
            <div className="w-60"><FilterSelectAdjustmentType /></div>
            <div className="w-fit"><ButtonOpenModalCreateInventory /></div>
          </div>
        </div>
        {
          isLoading
          ? (<div className='my-24'><SpinnerContainer size='lg' color='bg-white' /></div>)
          : (<TableAdjustments data={adjustments ?? []} />)
        }
      </section>
      { modalIsOpen && modalName === ModalNames.createInventoryAdjustment && <ModalCreateInventoryAdjustment />}
      { leftDrawerIsOpen && drawelName === DrawelNames.infoAdjustment && <AdjustmentInfoLeftDrawer />}
    </>
  )
}
