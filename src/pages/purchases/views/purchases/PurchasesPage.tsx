import React, { useEffect, useState } from 'react'
import { useDrawer, usePurchase } from '../../../../shared/hooks'
import type { Purchase } from '../../../../interfaces/purchase.interface'
import { PaginationPurchases, PurchaseInfoDrawer, TablePurchases } from './components'
import { Spinner } from '../../../../shared/components'
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
      <TablePurchases data={purchasesInfo} />
      <PaginationPurchases />
      { rightDrawerIsOpen && drawelName === DrawelNames.infoPurchase && <PurchaseInfoDrawer /> }
    </>
  )
}
