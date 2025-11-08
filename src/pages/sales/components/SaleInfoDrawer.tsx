import React from 'react'
import { RightDrawerLayout } from '../../../layouts/RightDrawerLayout'
import { useSale } from '../../../shared/hooks'
import { SpinnerContainer } from '../../../shared/components'
import { FiCalendar, FiPackage, FiTag } from 'react-icons/fi'
import { SaleDetailItem } from './SaleDetailItem'
import { SaleDetailUser } from './SaleDetailUser'

export const SaleInfoDrawer: React.FC = () => {

    const { selectedSale, isLoading } = useSale()

    if (isLoading) {
        return (
            <RightDrawerLayout width='w-2xl' title='Detalle de venta'>
                <div className="flex items-center justify-center h-full">
                    <SpinnerContainer color='bg-white' size='lg' />
                </div>
            </RightDrawerLayout>
        )
    }

    if ( !selectedSale ) return null
        
     return (
        <RightDrawerLayout width='w-2xl' title='Detalle de venta'>
            <div className="flex flex-col h-full bg-gray-50">
                
                <header className="bg-white border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                <FiTag className="w-4 h-4" />
                                Código de venta
                            </div>
                            <div className="text-2xl font-semibold text-gray-900">{selectedSale.code}</div>
                        </div>
                        <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                            ${selectedSale.total.toFixed(2)}
                        </div>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                        <FiCalendar className="w-4 h-4" />
                        {selectedSale.date.toString()}
                    </div>
                </header>

                {selectedSale.User && <SaleDetailUser 
                    image={selectedSale.User.image}
                    name={selectedSale.User.name}
                    role={selectedSale.User.role}
                />}

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
                        <FiPackage className="w-4 h-4" />
                        Productos ({selectedSale.details.length})
                    </div>
                    { selectedSale.details.map( detail => ( <SaleDetailItem key={detail.id} detail={detail}/>)) }
                </div>

                <div className="bg-white border-t border-gray-200 p-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>${selectedSale.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span className="text-indigo-600">${selectedSale.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </RightDrawerLayout>
    )
}
