import React from 'react'
import { OutlineButton } from '../../../../../shared/components/button/OutlineButton'
import { FiPrinter } from 'react-icons/fi'
// import { usePurchase } from '../../../../../shared/hooks'
// import { generarTicketCompraPDF } from '../../../../../shared/helpers'

export const PrintPurchase: React.FC = () => {

    // const { onGetPurchaseById } = usePurchase()

    // const onPrintPurchaseTicket = async () => {
    //     const purchase = await onGetPurchaseById()
    //     const products = purchase.details.map(detail => {
    //         const product = detail.Product
    //         return {
    //             product,
    //             quantity: detail.purchaseQuantity,
    //             unitPrice: detail.purchaseUnitPrice
    //         }
    //     })
    //     generarTicketCompraPDF(purchase.purchase, products)
    // }

    return (
        <OutlineButton /* onClick={onPrintPurchaseTicket} */>
            <FiPrinter />
            <p>Imprimir Compra</p>
        </OutlineButton>
    )
}