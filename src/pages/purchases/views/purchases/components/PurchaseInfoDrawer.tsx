import React from 'react'
import { RightDrawerLayout } from '../../../../../layouts/RightDrawerLayout'
import { usePurchase, useTheme } from '../../../../../shared/hooks'
import { SpinnerContainer } from '../../../../../shared/components'
import { FiCalendar, FiPackage, FiShoppingBag } from 'react-icons/fi'
import { PurchaseDetailItem } from './PurchaseDetailItem'
import { PurchaseDetailUser } from './PurchaseDetailUser'
import { PurchaseDetailSupplier } from './PurchaseDetailSupplier'
import { PrintPurchase } from './PrintPurchase'

export const PurchaseInfoDrawer: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { purchaseSelected, isLoading } = usePurchase()

    if (isLoading) {
        return (
            <RightDrawerLayout width='w-2xl' title='Detalle de compra'>
                <div className="flex items-center justify-center h-full">
                    <SpinnerContainer 
                        color={isDark ? 'border-indigo-400' : 'border-indigo-700'} 
                        size='lg' 
                    />
                </div>
            </RightDrawerLayout>
        )
    }

    if (!purchaseSelected) return null
        
    return (
        <RightDrawerLayout width='w-4xl' title='Detalle de compra'>
            <div className={`
                flex flex-col h-full transition-colors
                ${isDark ? 'bg-gray-900' : 'bg-gray-50'}
            `}>
                
                <header className={`
                    border-b p-6 transition-colors
                    ${isDark 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }
                `}>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className={`
                                text-sm mb-1 flex items-center gap-2 transition-colors
                                ${isDark ? 'text-gray-400' : 'text-gray-500'}
                            `}>
                                <FiShoppingBag className="w-4 h-4" />
                                ID de compra
                            </div>
                            <div className={`
                                text-2xl font-semibold transition-colors
                                ${isDark ? 'text-gray-100' : 'text-gray-900'}
                            `}>
                                {purchaseSelected.purchase.purchaseId}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className={`
                                px-4 py-2 rounded-lg font-medium transition-colors
                                ${isDark 
                                    ? 'bg-indigo-900/50 text-indigo-300' 
                                    : 'bg-indigo-50 text-indigo-700'
                                }
                            `}>
                                ${purchaseSelected.purchase.puchaseTotal.toFixed(2)}
                            </div>
                            <PrintPurchase />
                        </div>
                    </div>
                    <div className={`
                        text-sm flex items-center gap-2 transition-colors
                        ${isDark ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                        <FiCalendar className="w-4 h-4" />
                        {purchaseSelected.purchase.purchaseDate.toString()}
                    </div>
                </header>

                {purchaseSelected.purchase.Supplier && <PurchaseDetailSupplier 
                    name={purchaseSelected.purchase.Supplier.supplierName}
                    phone={purchaseSelected.purchase.Supplier.supplierPhone}
                />}

                {purchaseSelected.purchase.User && <PurchaseDetailUser 
                    image={purchaseSelected.purchase.User.userImage}
                    name={purchaseSelected.purchase.User.userName}
                    role={purchaseSelected.purchase.User.userRole}
                />}

                <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                    <div className={`
                        text-sm font-medium mb-4 flex items-center gap-2 transition-colors
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                        <FiPackage className="w-4 h-4" />
                        Productos ({purchaseSelected.details.length})
                    </div>
                    <ul className='space-y-4'>
                        {purchaseSelected.details.map(detail => (
                            <PurchaseDetailItem key={detail.id} detail={detail}/>
                        ))}
                    </ul>
                </div>

                <div className={`
                    border-t p-6 transition-colors
                    ${isDark 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }
                `}>
                    <div className="space-y-2">
                        <div className={`
                            flex justify-between text-sm transition-colors
                            ${isDark ? 'text-gray-400' : 'text-gray-600'}
                        `}>
                            <span>Subtotal</span>
                            <span>${purchaseSelected.purchase.puchaseTotal.toFixed(2)}</span>
                        </div>
                        <div className={`
                            flex justify-between text-lg font-semibold pt-2 border-t transition-colors
                            ${isDark 
                                ? 'text-gray-100 border-gray-700' 
                                : 'text-gray-900 border-gray-200'
                            }
                        `}>
                            <span>Total</span>
                            <span className={`
                                transition-colors
                                ${isDark ? 'text-indigo-400' : 'text-indigo-600'}
                            `}>
                                ${purchaseSelected.purchase.puchaseTotal.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </RightDrawerLayout>
    )
}