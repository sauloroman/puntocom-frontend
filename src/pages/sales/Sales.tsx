import React, { useEffect } from 'react'
import { PuntoComLayout } from '../../layouts/PuntoComLayout'
import { useDrawer, useModal, useSale, useUsers } from '../../shared/hooks'
import { FilterSalesByPrice, ModalRangePrices, PaginationSales, SaleInfoDrawer, SelectUsers, TableSales } from './components'
import { SpinnerContainer } from '../../shared/components'
import { DrawelNames } from '../../interfaces/ui/drawel.interface'
import { ModalNames } from '../../interfaces/ui/modal.interface'
import { FilterTags } from './components/FilterTags'

export const Sales: React.FC = () => {

  const { sales, getAllSales, isLoading, filter } = useSale()
  const { users, getUsers } = useUsers()
  const { rightDrawerIsOpen, drawelName } = useDrawer()
  const { modalIsOpen, modalName } = useModal()

  useEffect(() => {
    if ( users === null ) getUsers()
    if ( sales.length === 0 ) getAllSales()
  }, [])

  return (
    <PuntoComLayout>
      <section className='px-4'>
        <div className="flex items-center justify-between my-7">
          <div className='flex items-center gap-3'>  
            <div className="w-64"><SelectUsers /></div>
            <FilterSalesByPrice />
          </div>
          <FilterTags />
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
    </PuntoComLayout>
  )
}
