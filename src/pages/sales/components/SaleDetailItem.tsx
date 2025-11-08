import React from 'react'
import type { SaleProductDetailResponse } from '../../../interfaces/sale.interface'

interface Props {
    detail: SaleProductDetailResponse
}

const calculateSubtotal = ( unitPrice: number, quantity: number, discount: number ) => {
    return ((unitPrice * quantity) - discount).toFixed(2)
}

export const SaleDetailItem: React.FC<Props> = ({ detail }) => {
    return (
        <div className="space-y-3">
            <div
                key={detail.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow"
            >
                <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0 pr-4">
                        <p className="text-sm font-medium text-gray-900 mb-1">{detail.Product?.name || 'Producto sin nombre'}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{detail.saleQuantity}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600 mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                        <span>Cantidad: <span className="font-medium text-gray-900">{detail.saleQuantity}</span></span>
                        <span>Descuento: <span className="font-medium text-gray-900">${detail.saleDiscount.toFixed(2)}</span></span>
                        <span>Precio: <span className="font-medium text-gray-900">${detail.saleUnitPrice.toFixed(2)}</span></span>
                        <span>Subtotal: <span className="font-medium text-gray-900">${calculateSubtotal(detail.saleUnitPrice, detail.saleQuantity, detail.saleDiscount)}</span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
