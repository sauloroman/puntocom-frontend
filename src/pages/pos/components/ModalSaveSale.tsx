import React from 'react'
import { ModalLayout } from '../../../layouts/ModalLayout'
import { useModal, usePos, useSale } from '../../../shared/hooks'
import { FaRegCheckCircle } from "react-icons/fa";
import { OutlineButton } from '../../../shared/components/button/OutlineButton';
import { generarTicketPDF } from '../../../shared/helpers';

export const ModalSaveSale: React.FC = () => {

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

                <h2 className='font-semibold text-2xl text-gray-800'>
                    ¡Venta registrada con éxito!
                </h2>

                <p className='text-gray-500 mt-1 text-sm'>
                    Los datos de la venta fueron guardados correctamente.
                </p>

                <div className='w-full bg-gray-50 rounded-xl shadow-sm mt-6 p-5'>
                    <div className='grid grid-cols-2 gap-y-3 text-sm'>
                        <p className='text-gray-600 font-medium'>Folio:</p>
                        <p className='font-bold text-red-600'>{saleCreated.code}</p>

                        <p className='text-gray-600 font-medium'>Total:</p>
                        <p className='text-gray-800 text-4xl font-bold'>
                            ${saleCreated.total.toFixed(2)}
                        </p>

                        <p className='text-gray-600 font-medium'>Fecha:</p>
                        <p className='text-gray-800'>
                            {new Date(saleCreated.date).toLocaleString()}
                        </p>

                        {saleCreated.User && (
                            <>
                                <p className='text-gray-600 font-medium'>Usuario:</p>
                                <p className='text-gray-800'>
                                    {saleCreated.User.name} ({saleCreated.User.role})
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {saleCreated.details?.length > 0 && (
                    <div className='w-full mt-5'>
                        <p className='text-gray-700 font-medium mb-2 text-sm'>
                            Productos vendidos:
                        </p>

                        <div className="grid grid-cols-8 bg-gray-100 px-4 py-2 rounded-t-lg text-sm font-semibold text-gray-700 border border-gray-200">
                            <span className="text-left col-span-4">Producto</span>
                            <span className="text-center">Precio U.</span>
                            <span className="text-right">Cantidad</span>
                            <span className="text-center">Descuento</span>
                            <span className="text-right">Subtotal</span>
                        </div>

                       <ul className="max-h-48 overflow-y-auto divide-y divide-gray-200 bg-white rounded-b-lg border border-gray-200">
                            {products.map(({ product, quantity, discount, unitPrice }) => (
                                <li
                                    key={product?.id}
                                    className="grid grid-cols-8 items-center px-4 py-2 text-sm"
                                >
                                    <span className="text-gray-800 font-medium text-left truncate col-span-4">
                                        {product?.name}
                                    </span>
                                    <span className="text-gray-600 text-center">
                                        ${unitPrice.toFixed(2)}
                                    </span>
                                    <span className="text-gray-500 text-right">
                                        x{quantity}
                                    </span>
                                    <span className="text-gray-600 text-center">
                                        ${discount.toFixed(2)}
                                    </span>
                                    <span className="text-gray-500 text-right">
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
                    >Imprimir Ticket</OutlineButton>
                    
                    <OutlineButton 
                        className='border-2 w-full border-red-600 text-red-600' 
                        onClick={onCloseModal}
                    >Aceptar</OutlineButton>
                </div>
            </div>
        </ModalLayout>
    )
}
