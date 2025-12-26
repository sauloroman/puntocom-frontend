import React, { useEffect } from 'react'
import { PuntoComLayout } from '../../layouts/PuntoComLayout'
import { useDrawer, useModal, useSale, useUsers } from '../../shared/hooks'
import { 
  ButtonFilterByDate, 
  AppliedFilters, 
  ButtonFilterByPrice, 
  ModalRangeDates, 
  ModalRangePrices, 
  PaginationSales, 
  SaleInfoDrawer, 
  TableSales, 
  FilterSalesByUser
} from './components'
import { SpinnerContainer } from '../../shared/components'
import { DrawelNames } from '../../interfaces/ui/drawel.interface'
import { ModalNames } from '../../interfaces/ui/modal.interface'

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
            <ButtonFilterByPrice />
            <ButtonFilterByDate />
          </div>
          <AppliedFilters />
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
      { modalIsOpen && modalName === ModalNames.rangePrices && <ModalRangePrices />}
      { modalIsOpen && modalName === ModalNames.rangeDates && <ModalRangeDates />}
    </PuntoComLayout>
  )
}
