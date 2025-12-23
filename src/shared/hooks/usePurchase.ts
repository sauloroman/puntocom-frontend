import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { Product } from "../../interfaces/product.interface"
import { addProductInPurchase, removeProductInPurchase, setProductSelectedToAdd } from "../../store/purchase/purchase.slice"
import type { ProductInPurchase } from "../../interfaces/purchase.interface"

export const usePurchase = () => {

    const dispatch = useDispatch<any>()
    const { 
        purchases, 
        productSelectedToAdd, 
        productsInPurchase,
        isLoading,
    } = useSelector( (state: RootState) => state.purchase )

    const onSelectProductToAddPurchase = ( product: Product | null ) => {
        dispatch(setProductSelectedToAdd(product))
    }

    const onAddProductInPurchase = ( productInPurchase: ProductInPurchase ) => {
        if ( !productInPurchase ) return null
        dispatch( addProductInPurchase( productInPurchase ) )
    }

    const onRemoveProductInPurchase = ( productId: string ) => {
        if ( !productId ) return null
        dispatch( removeProductInPurchase( productId ) )
    }

    return {
        purchases,
        productSelectedToAdd,
        productsInPurchase,
        isLoading,

        onSelectProductToAddPurchase,
        onAddProductInPurchase,
        onRemoveProductInPurchase,
    }
}