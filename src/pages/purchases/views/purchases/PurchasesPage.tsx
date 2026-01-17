import React, { useEffect, useState } from 'react'
import type { Purchase } from '../../../../interfaces/dto/purchase.interface'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { useDrawer, useModal, usePurchase } from '../../../../shared/hooks'
import { 
  AppliedPurchasesFilters,
  FilterPurchasesBySupplier, 
  FilterPurchasesByUser, 
  ModalPurchasesRangeDates, 
  ModalPurchasesRangePrices, 
  PaginationPurchases, 
  PurchaseInfoDrawer, 
  TablePurchases 
} from './components'
import { SpinnerContainer } from '../../../../shared/components/spinner'
import { 
  FilterByDateButton, 
  FilterByPriceButton
} from '../../../../shared/components/button'

export const PurchasesPage: React.FC = () => {
  const { modalIsOpen, modalName } = useModal()
  const { rightDrawerIsOpen, drawelName } = useDrawer()
  const { purchases, getPurchases, isLoading } = usePurchase()
  const [purchasesInfo, setPurchasesInfo] = useState<Purchase[]>([])

  useEffect(() => {
    if (!purchases) {
      getPurchases()
    }
  }, [])

  useEffect(() => {
    setPurchasesInfo(purchases?.map(purchase => purchase.purchase) ?? [])
  }, [purchases])

  return (
    <>
      <div className="flex items-start gap-6 flex-col justify-between mb-6">
        <div className='flex flex-col md:flex-row items-center gap-3'>

          <div className="md:w-[650px] flex items-center gap-3">
            <FilterPurchasesByUser />
            <FilterPurchasesBySupplier />
          </div>

          <div className='w-full flex justify-start gap-3'>
            <FilterByPriceButton modal={ModalNames.rangePurchasesPrices} /> 
            <FilterByDateButton modal={ModalNames.rangePurchasesDates} /> 
          </div>

        </div>
        <AppliedPurchasesFilters />
      </div>

      {
        isLoading
          ? <div className='my-24'><SpinnerContainer size='lg' color='bg-white' /></div>
          : (
            <>
              <TablePurchases data={purchasesInfo} />
              <PaginationPurchases />
            </>
          )
      }
      {rightDrawerIsOpen && drawelName === DrawelNames.infoPurchase && <PurchaseInfoDrawer />}
      { modalIsOpen && modalName === ModalNames.rangePurchasesPrices && <ModalPurchasesRangePrices />}
      { modalIsOpen && modalName === ModalNames.rangePurchasesDates && <ModalPurchasesRangeDates />}
    </>
  )
}
