import React, { useEffect } from 'react'
import { ModalNames } from '../../interfaces/ui/modal.interface'
import { AsideMenu, Header, ModalAddProduct, ModalSaveSale, OrderPanel, PaginationPos, ProductsList } from './components'
import { useCategories, useModal, useSale, useTheme, usePos } from '../../shared/hooks'
import { SpinnerContainer } from '../../shared/components/spinner'

export const Pos: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { getCategories, categories } = useCategories()
    const { getProductsToSale, products } = usePos()
    const { modalName, modalIsOpen } = useModal()
    const { isLoading } = useSale()

    useEffect(() => {
        if (!categories) getCategories()
        if (!products) getProductsToSale()
    }, [])

    return (
        <div className={`
            flex h-screen w-screen overflow-hidden transition-colors
            ${isDark ? 'bg-gray-900' : 'bg-white'}
        `}>

            <aside className="hidden md:block md:w-1/5 lg:w-1/6 xl:w-[120px]">
                <AsideMenu />
            </aside>

            <main className={`
                flex flex-col flex-1 overflow-hidden transition-colors
                ${isDark ? 'bg-gray-900' : 'bg-white'}
            `}>
                <Header />
                <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
                    <ProductsList />
                    <PaginationPos />
                </div>
            </main>

            <aside className="hidden overflow-y-auto md:block md:w-1/4 lg:w-1/5 xl:w-[430px]">
                { 
                    isLoading
                        ? (
                            <div className='h-screen flex justify-center items-center'>
                                <SpinnerContainer 
                                    size='lg' 
                                    color={isDark ? 'border-indigo-400' : 'border-indigo-700'} 
                                />
                            </div>
                        ) 
                        : (<OrderPanel />)
                }
            </aside>

            {modalIsOpen && modalName === ModalNames.addProduct && <ModalAddProduct />}
            {modalIsOpen && modalName === ModalNames.saveSale && <ModalSaveSale />}
        </div>
    )
}