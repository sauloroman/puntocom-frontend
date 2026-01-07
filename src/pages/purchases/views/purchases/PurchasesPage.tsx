import React, { useEffect, useState } from 'react'
import { useDrawer, useModal, usePurchase } from '../../../../shared/hooks'
import type { Purchase } from '../../../../interfaces/dto/purchase.interface'
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
import { SpinnerContainer } from '../../../../shared/components'
import { 
  ButtonFilterByDate, 
  ButtonFilterByPrice
} from '../../../../shared/components/button'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'

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
      <div className="flex items-center justify-between mb-6">
        <div className='flex items-center gap-3'>
          <div className="w-[400px] flex items-center gap-3">
            <FilterPurchasesByUser />
            <FilterPurchasesBySupplier />
          </div>
          <ButtonFilterByPrice modal={ModalNames.rangePurchasesPrices} /> 
          <ButtonFilterByDate modal={ModalNames.rangePurchasesDates} /> 
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
