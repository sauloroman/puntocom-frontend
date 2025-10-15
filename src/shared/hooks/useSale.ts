import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { startSavingSale } from "../../store/sale/sale.thunk"
import type { ProductInCart } from "../../interfaces/product.interface"
import type { SaveSale } from "../../interfaces/sale.interface"
import { showAlert } from "../../store/alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"

export const useSale = () => {
    
    const dispatch = useDispatch<any>()
    const { isLoading, saleCreated } = useSelector( (state: RootState) => state.sale )

    const saveSale = ( productsInCart: ProductInCart[], total: number ) => {

        if (  productsInCart?.length === 0 || total === 0 ) {
            dispatch(showAlert({
                title: 'Venta no registrada',
                text: 'Ingresa productos a la venta',
                type: AlertType.warning
            }))
            return;
        };
        
        const payload: SaveSale = {
            total: total,
            details: productsInCart.map( p => ({
                productId: p.product.id,
                discount: p.discount,
                quantity: p.quantity,
                unitPrice: p.product.sellingPrice
            }))
        } 

        dispatch( startSavingSale( payload ) )
    }

    return {
        saleCreated,
        isLoading,

        saveSale
    }

}