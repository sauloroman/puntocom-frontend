import React, { useEffect } from 'react'
import { PuntoComLayout } from '../../layouts/PuntoComLayout'
import { useDrawer, useModal, useSale, useUsers } from '../../shared/hooks'
import { 
  AppliedSalesFilters,  
  PaginationSales, 
  SaleInfoDrawer, 
  TableSales, 
  FilterSalesByUser,
  ModalSalesRangeDates,
  ModalSalesRangePrices
} from './components'
import { SpinnerContainer } from '../../shared/components'
import { DrawelNames } from '../../interfaces/ui/drawel.interface'
import { ModalNames } from '../../interfaces/ui/modal.interface'
import { ButtonFilterByDate, ButtonFilterByPrice } from '../../shared/components/button'

export const Sales: React.FC = () => {

  const { sales, getAllSales, isLoading } = useSale()
  const { users, getUsers } = useUsers()
  const { rightDrawerIsOpen, drawelName } = useDrawer()
  const { modalIsOpen, modalName } = useModal()

  useEffect(() => {
    if ( users === null ) getUsers()
    if ( sales.length === 0 ) getAllSales()
  }, [])

  return (
    <PuntoComLayout>
      <section className='p-4 py-0'>
        <div className="flex items-center justify-between my-7">
          <div className='flex items-center gap-3'>  
            <div className="w-64"><FilterSalesByUser /></div>
            <ButtonFilterByPrice modal={ModalNames.rangeSalesPrices} />
            <ButtonFilterByDate modal={ModalNames.rangeSalesDates} />
          </div>
          <AppliedSalesFilters />
        </div>
        {
          isLoading
          ? <div className='my-24'><SpinnerContainer size='lg' color='bg-white' /></div>
          : (
            <>
              <TableSales data={sales} />
              <PaginationSales/>
            </>
          )
        }
      </section>
      { rightDrawerIsOpen && drawelName === DrawelNames.infoSale && <SaleInfoDrawer />}
      { modalIsOpen && modalName === ModalNames.rangeSalesPrices && <ModalSalesRangePrices />}
      { modalIsOpen && modalName === ModalNames.rangeSalesDates && <ModalSalesRangeDates />}
    </PuntoComLayout>
  )
}
