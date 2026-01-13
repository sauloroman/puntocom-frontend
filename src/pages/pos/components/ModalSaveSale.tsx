import React from 'react'
import { FaRegCheckCircle } from "react-icons/fa"
import { ModalLayout } from '../../../layouts'
import { useModal, usePos, useSale, useTheme } from '../../../shared/hooks'
import { generarTicketPDF } from '../../../shared/helpers'
import { OutlineButton } from '../../../shared/components/button'

export const ModalSaveSale: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { getProductByIdFromPos } = usePos()
    const { saleCreated } = useSale()
    const { onCloseModal } = useModal()
    
    if (!saleCreated) return null

    const products = saleCreated.details.map(detail => {
        const productId = detail.productId
        const product = getProductByIdFromPos(productId)
        return {
            product,
            quantity: detail.saleQuantity,
            discount: detail.saleDiscount,
            unitPrice: detail.saleUnitPrice
        }
    })

    const onPrintSaleTicket = () => {
        generarTicketPDF(saleCreated, products)
        onCloseModal()
    }

    return (
        <ModalLayout width='w-4xl' className='animate__animated animate__bounceIn'>
            <div className='flex flex-col items-center text-center p-6'>

                <FaRegCheckCircle className='w-16 h-16 text-green-500 mb-3' />

                <h2 className={`
                    font-semibold text-2xl transition-colors
                    ${isDark ? 'text-gray-100' : 'text-gray-800'}
                `}>
                    ¡Venta registrada con éxito!
                </h2>

                <p className={`
                    mt-1 text-sm transition-colors
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                `}>
                    Los datos de la venta fueron guardados correctamente.
                </p>

                <div className={`
                    w-full rounded-xl shadow-sm mt-6 p-5 transition-colors
                    ${isDark ? 'bg-gray-800' : 'bg-gray-50'}
                `}>
                    <div className='grid grid-cols-2 gap-y-3 text-sm'>
                        <p className={`
                            font-medium transition-colors
                            ${isDark ? 'text-gray-400' : 'text-gray-600'}
                        `}>
                            Folio:
                        </p>
                        <p className='font-bold text-red-600'>{saleCreated.sale.saleCode}</p>

                        <p className={`
                            font-medium transition-colors
                            ${isDark ? 'text-gray-400' : 'text-gray-600'}
                        `}>
                            Total:
                        </p>
                        <p className={`
                            text-4xl font-bold transition-colors
                            ${isDark ? 'text-gray-100' : 'text-gray-800'}
                        `}>
                            ${saleCreated.sale.saleTotal.toFixed(2)}
                        </p>

                        <p className={`
                            font-medium transition-colors
                            ${isDark ? 'text-gray-400' : 'text-gray-600'}
                        `}>
                            Fecha:
                        </p>
                        <p className={`
                            transition-colors
                            ${isDark ? 'text-gray-200' : 'text-gray-800'}
                        `}>
                            {new Date(saleCreated.sale.saleDate).toLocaleString()}
                        </p>

                        {saleCreated.sale.User && (
                            <>
                                <p className={`
                                    font-medium transition-colors
                                    ${isDark ? 'text-gray-400' : 'text-gray-600'}
                                `}>
                                    Usuario:
                                </p>
                                <p className={`
                                    transition-colors
                                    ${isDark ? 'text-gray-200' : 'text-gray-800'}
                                `}>
                                    {saleCreated.sale.User.name} ({saleCreated.sale.User.role})
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {saleCreated.details?.length > 0 && (
                    <div className='w-full mt-5'>
                        <p className={`
                            font-medium mb-2 text-sm transition-colors
                            ${isDark ? 'text-gray-300' : 'text-gray-700'}
                        `}>
                            Productos vendidos:
                        </p>

                        <div className={`
                            grid grid-cols-8 px-4 py-2 rounded-t-lg text-sm font-semibold border transition-colors
                            ${isDark 
                                ? 'bg-gray-800 text-gray-300 border-gray-700' 
                                : 'bg-gray-100 text-gray-700 border-gray-200'
                            }
                        `}>
                            <span className="text-left col-span-4">Producto</span>
                            <span className="text-center">Precio U.</span>
                            <span className="text-right">Cantidad</span>
                            <span className="text-center">Descuento</span>
                            <span className="text-right">Subtotal</span>
                        </div>

                        <ul className={`
                            max-h-48 overflow-y-auto divide-y rounded-b-lg border transition-colors
                            ${isDark 
                                ? 'divide-gray-700 bg-gray-800 border-gray-700' 
                                : 'divide-gray-200 bg-white border-gray-200'
                            }
                        `}>
                            {products.map(({ product, quantity, discount, unitPrice }) => (
                                <li
                                    key={product?.id}
                                    className="grid grid-cols-8 items-center px-4 py-2 text-sm"
                                >
                                    <span className={`
                                        font-medium text-left truncate col-span-4 transition-colors
                                        ${isDark ? 'text-gray-200' : 'text-gray-800'}
                                    `}>
                                        {product?.name}
                                    </span>
                                    <span className={`
                                        text-center transition-colors
                                        ${isDark ? 'text-gray-400' : 'text-gray-600'}
                                    `}>
                                        ${unitPrice.toFixed(2)}
                                    </span>
                                    <span className={`
                                        text-right transition-colors
                                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                                    `}>
                                        x{quantity}
                                    </span>
                                    <span className={`
                                        text-center transition-colors
                                        ${isDark ? 'text-gray-400' : 'text-gray-600'}
                                    `}>
                                        ${discount.toFixed(2)}
                                    </span>
                                    <span className={`
                                        text-right transition-colors
                                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                                    `}>
                                        ${((quantity * unitPrice) - discount).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className='w-full flex gap-5 justify-end mt-6'>
                    <OutlineButton 
                        className='border-2 w-full border-green-600 text-green-600' 
                        onClick={onPrintSaleTicket}
                    >
                        Imprimir Ticket
                    </OutlineButton>
                    
                    <OutlineButton 
                        className='border-2 w-full border-red-600 text-red-600' 
                        onClick={onCloseModal}
                    >
                        Aceptar
                    </OutlineButton>
                </div>
            </div>
        </ModalLayout>
    )
}