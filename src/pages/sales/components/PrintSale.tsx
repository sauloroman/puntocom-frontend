import React from 'react'
import { OutlineButton } from '../../../shared/components/button/OutlineButton'
import { FiPrinter } from 'react-icons/fi'
import { useSale } from '../../../shared/hooks'
import { generarTicketPDF } from '../../../shared/helpers'

export const PrintSale: React.FC = () => {

    const { onGetSaleById } = useSale()

    const onPrintSaleTicket = async () => {
        const sale = await onGetSaleById()
        const products = sale.details.map(detail => {
            const product = detail.Product
            return {
                product,
                quantity: detail.saleQuantity,
                discount: detail.saleDiscount,
                unitPrice: detail.saleUnitPrice
            }
        })
        generarTicketPDF(sale, products)
    }

    return (
        <OutlineButton onClick={onPrintSaleTicket}>
            <FiPrinter />
            <p>Reimprimir Ticket</p>
        </OutlineButton>
    )
}
