import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { Product } from "../../interfaces/product.interface"
import { addProductInPurchase, decrementProductQuantityInPurchase, incrementProductQuantityInPurchase, removeProductInPurchase, setProductSelectedToAdd, setSupplierSelected } from "../../store/purchase/purchase.slice"
import type { ProductInPurchase, SavePurchase } from "../../interfaces/purchase.interface"
import { startGettingProductsToBeInPurchase, startSavingPurchase } from "../../store/purchase/purchase.thunk"

export const usePurchase = () => {

    const dispatch = useDispatch<any>()
    const { 
        products,
        pagination,
        purchases, 
        productSelectedToAdd, 
        productsInPurchase,
        supplierSelected,
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
    
    const incrementQuantityInPurchase = ( productId: string ) => {
        if ( !productId ) return null
        dispatch(incrementProductQuantityInPurchase(productId))
    }

    const decrementQuantityInPurchase = ( productId: string ) => {
        if ( !productId ) return null
        dispatch(decrementProductQuantityInPurchase(productId))
    }

    const getProductsToBeInPurchase = () => {
        dispatch(startGettingProductsToBeInPurchase({
            page: 1,
            limit: pagination.itemsPerPage
        }))
    }

    const savePurchase = ( savePurchase: SavePurchase ) => {
        dispatch(startSavingPurchase(savePurchase))
    }

    const onSetSupplierSelected = ( supplierId: string ) => {
        dispatch(setSupplierSelected(supplierId))
    }

    return {
        products,
        purchases,
        productSelectedToAdd,
        productsInPurchase,
        supplierSelected,
        isLoading,

        onSelectProductToAddPurchase,
        onAddProductInPurchase,
        onRemoveProductInPurchase,
        onSetSupplierSelected,
        incrementQuantityInPurchase,
        decrementQuantityInPurchase,
        savePurchase,
        getProductsToBeInPurchase
    }
}