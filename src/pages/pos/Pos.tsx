  import React, { useEffect } from 'react'
  import { AsideMenu, Header, ModalAddProduct, ModalSaveSale, OrderPanel, PaginationPos, ProductsList } from './components'
  import { useCategories, useModal, useSale } from '../../shared/hooks'
import { usePos } from '../../shared/hooks/usePos'
import { ModalNames } from '../../interfaces/ui/modal.interface'
import { SpinnerContainer } from '../../shared/components'

  export const Pos: React.FC = () => {
    const { getCategories, categories } = useCategories()
    const { getProductsToSale, products } = usePos()
    const { modalName, modalIsOpen } = useModal()
    const { isLoading } = useSale()

    useEffect(() => {
      if (!categories) getCategories()
      if (!products) getProductsToSale()
    }, [])

    return (
      <div className="flex h-screen w-screen overflow-hidden">

        <aside className="hidden md:block md:w-1/5 lg:w-1/6 xl:w-[120px]">
          <AsideMenu />
        </aside>

        <main className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto p-4">
            <ProductsList />
            <PaginationPos />
          </div>
        </main>

        <aside className="hidden overflow-y-auto md:block md:w-1/4 lg:w-1/5 xl:w-[430px]">
          { 
            isLoading
            ? (<div className='h-screen flex justify-center items-center'><SpinnerContainer size='lg' color='bg-purple' /></div>) 
            : (<OrderPanel />)
          }
        </aside>

        { modalIsOpen && modalName === ModalNames.addProduct && <ModalAddProduct />}
        { modalIsOpen && modalName === ModalNames.saveSale && <ModalSaveSale />}
      </div>
    )
  }
