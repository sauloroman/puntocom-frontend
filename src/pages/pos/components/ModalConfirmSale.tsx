import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { ModalLayout } from '../../../layouts'
import { ConfirmButton, CancelButton } from '../../../shared/components/button'
import { useCart, useSale, useModal, useTheme } from '../../../shared/hooks'

export const ModalConfirmSale: React.FC = () => {

    const { cart, total, clearProductsInCart } = useCart()
    const { onSaveSale } = useSale()
    const { onCloseModal } = useModal()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const saveSale = () => {
        onSaveSale(cart!, total)
        onCloseModal()
    }

    const onCancelSale = () => {
        clearProductsInCart()
        onCloseModal()
    }

    return (
        <ModalLayout width="w-2xl">

            <div className="flex flex-col items-center text-center space-y-4 p-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600">
                    <FaExclamationTriangle size={32} />
                </div>

                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Confirmar venta
                </h2>

                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Estás a punto de confirmar esta venta.  
                    Por favor revisa el resumen antes de continuar.
                </p>

                <div
                    className={`
                        w-full max-h-60 overflow-y-auto rounded-lg border p-4
                        ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-gray-50'}
                    `}
                >
                    {cart && cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div
                                key={index}
                                className={`flex justify-between py-2 border-b last:border-none 
                                            ${isDark ? 'border-gray-700 text-white' : 'border-gray-300 text-gray-700'}
                                           `}
                            >
                                <div className="text-left">
                                    <p className="font-medium">{item.product.name}</p>
                                    <p className="text-sm">
                                        Cantidad: {item.quantity}  
                                        {item.discount > 0 && (
                                            <span className="ml-2 text-green-600">
                                                - {item.discount}% desc.
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div className="text-right font-semibold">
                                    ${(
                                        item.product.sellingPrice * item.quantity *
                                        (1 - item.discount / 100)
                                    ).toFixed(2)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center`}>
                            No hay productos en el carrito.
                        </p>
                    )}
                </div>

                <div className="flex justify-between w-full pt-2">
                    <span className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        Total a pagar:
                    </span>
                    <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ${total.toFixed(2)}
                    </span>
                </div>

                <div className="flex items-center gap-4 w-full pt-4">
                    <ConfirmButton
                        className="p-2 flex-1"
                        onClick={saveSale}
                        text="Confirmar venta"
                    />
                    <CancelButton
                        className="p-2 flex-1"
                        onClick={onCancelSale}
                        text="Cancelar Registro de venta"
                    />
                </div>

            </div>
        </ModalLayout>
    )
}
