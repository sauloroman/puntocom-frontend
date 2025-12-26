import React, { useEffect, useState } from 'react'
import { useDrawer, usePurchase } from '../../../../shared/hooks'
import type { Purchase } from '../../../../interfaces/purchase.interface'
import { FilterPurchasesBySupplier, FilterPurchasesByUser, PaginationPurchases, PurchaseInfoDrawer, TablePurchases } from './components'
import { Spinner, SpinnerContainer } from '../../../../shared/components'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'

export const PurchasesPage: React.FC = () => {
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

  if (isLoading) {
    return (
      <div className='h-[80vh] flex justify-center items-center'><Spinner size='lg' /></div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className='flex items-center gap-3'>
          <div className="w-[400px] flex items-center gap-3">
            <FilterPurchasesByUser />
            <FilterPurchasesBySupplier />
          </div>
          {/* <ButtonFilterByPrice />
          <ButtonFilterByDate /> */}
        </div>
        {/* <AppliedFilters /> */}
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
    </>
  )
}
