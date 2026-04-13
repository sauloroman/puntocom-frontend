import React from 'react'
import { BsBoxSeam } from "react-icons/bs"
import { ModalLayout } from '../../../layouts'
import { ConfirmButton, GenerateReportButton } from '../../../shared/components/button'
import { useProducts, useTheme, useAuth } from '../../../shared/hooks'
import type { ProductMinimal } from "../../../interfaces/dto/product.interface"

export const ModalReminderStock: React.FC = () => {

    const { onLogout } = useAuth()
    const { productsNoStock } = useProducts()
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const onGenerateReport = () => {
    }

    return (
        <ModalLayout width='w-3xl'>
            <div className="text-center px-6 py-6">

                <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
                    ${isDark ? 'bg-gray-700' : 'bg-purple-50'}
                `}>
                    <BsBoxSeam 
                        className={isDark ? 'text-purple-400' : 'text-purple-600'} 
                        size={28} 
                    />
                </div>

                <h3 className={`
                    mb-3 text-xl font-semibold transition-colors
                    ${isDark ? 'text-gray-100' : 'text-gray-800'}
                `}>
                    Recordatorio de stock
                </h3>

                <p className={`
                    mb-5 transition-colors
                    ${isDark ? 'text-gray-300' : 'text-gray-600'}
                `}>
                    Antes de cerrar sesión, considera reabastecer los siguientes productos:
                </p>

                <ul className={`
                    max-h-96 overflow-y-auto text-left px-6 py-4 mb-8 rounded-lg
                    ${isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}
                `}>
                    {productsNoStock?.length > 0 ? (
                        productsNoStock.map((product: ProductMinimal) => (
                            <li 
                                key={product.productId} 
                                className="flex justify-between items-center py-1 border-b last:border-none border-gray-600/20"
                            >
                                <span>{product.productName}</span>

                                <span className={`
                                    text-xs px-2 py-0.5 rounded-full
                                    ${isDark ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-600'}
                                `}>
                                    Sin stock
                                </span>
                            </li>
                        ))
                    ) : (
                        <p className="text-center text-sm opacity-70">
                            No hay productos pendientes 🎉
                        </p>
                    )}
                </ul>

                <div className="flex justify-center gap-4">
{/* 
                    <div className="w-full">
                        <GenerateReportButton text='Generar reporte' />                
                    </div> */}

                    <div className='w-full' onClick={onLogout}>
                        <ConfirmButton 
                            className='px-6 py-2' 
                            text="Aceptar" 
                        />
                    </div>

                </div>
            </div>
        </ModalLayout>
    )
}