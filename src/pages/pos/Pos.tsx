import React, { useEffect, useState } from 'react'
import { ModalNames } from '../../interfaces/ui/modal.interface'
import { AsideMenu, Header, ModalAddProduct, ModalSaveSale, OrderPanel, PaginationPos, ProductsList } from './components'
import { useCategories, useModal, useSale, useTheme, usePos } from '../../shared/hooks'
import { SpinnerContainer } from '../../shared/components/spinner'
import { BsGrid3X3Gap, BsCart3 } from 'react-icons/bs'

export const Pos: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { getCategories, categories } = useCategories()
    const { getProductsToSale, products } = usePos()
    const { modalName, modalIsOpen } = useModal()
    const { isLoading } = useSale()

    const [showCategories, setShowCategories] = useState(false)
    const [showCart, setShowCart] = useState(false)

    useEffect(() => {
        if (!categories) getCategories()
        if (!products) getProductsToSale()
    }, [])

    return (
        <div className={`
            flex h-screen w-screen overflow-hidden transition-colors
            ${isDark ? 'bg-gray-900' : 'bg-white'}
        `}>

            {showCategories && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setShowCategories(false)}
                />
            )}

            <aside className={`
                fixed md:static top-0 left-0 h-screen z-50
                transition-transform duration-300 ease-in-out
                w-[280px] md:w-1/5 lg:w-1/6 xl:w-[120px]
                ${showCategories ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <AsideMenu onClose={() => setShowCategories(false)} />
            </aside>

            {showCart && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setShowCart(false)}
                />
            )}

            <main className={`
                flex flex-col flex-1 overflow-hidden transition-colors
                ${isDark ? 'bg-gray-900' : 'bg-white'}
            `}>
                <Header />
                <div className="flex-1 overflow-y-auto p-4 pb-20 md:pb-4 no-scrollbar">
                    <ProductsList />
                    <PaginationPos />
                </div>
            </main>

            <aside className={`
                fixed md:static top-0 right-0 h-screen z-50
                overflow-y-auto transition-transform duration-300 ease-in-out
                w-[340px] md:w-1/4 lg:w-1/5 xl:w-[430px]
                ${showCart ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            `}>
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

            <div className="md:hidden fixed bottom-6 left-6 z-30">
                <button
                    onClick={() => setShowCategories(true)}
                    className={`
                        w-14 h-14 rounded-full shadow-lg flex items-center justify-center
                        transition-all duration-200 active:scale-95
                        ${isDark
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }
                    `}
                >
                    <BsGrid3X3Gap size={24} />
                </button>
            </div>

            <div className="md:hidden fixed bottom-6 right-6 z-30">
                <button
                    onClick={() => setShowCart(true)}
                    className={`
                        w-14 h-14 rounded-full shadow-lg flex items-center justify-center
                        transition-all duration-200 active:scale-95
                        ${isDark
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }
                    `}
                >
                    <BsCart3 size={24} />
                </button>
            </div>

            {modalIsOpen && modalName === ModalNames.addProduct && <ModalAddProduct />}
            {modalIsOpen && modalName === ModalNames.saveSale && <ModalSaveSale />}
        </div>
    )
}