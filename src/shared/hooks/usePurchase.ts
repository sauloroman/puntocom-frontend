import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { Product } from "../../interfaces/product.interface"
import { 
    addProductInPurchase, 
    decrementProductQuantityInPurchase, 
    incrementProductQuantityInPurchase, 
    removeProductInPurchase, 
    setPageProducts, 
    setPagePurchases, 
    setProductSelectedToAdd, 
    setPurchaseSelected, 
    setSupplierSelected 
} from "../../store/purchase/purchase.slice"
import type { ProductInPurchase, SavePurchase } from "../../interfaces/purchase.interface"
import { startGettingAllPurchases, startGettingProductsToBeInPurchase, startSavingPurchase } from "../../store/purchase/purchase.thunk"

export const usePurchase = () => {

    const dispatch = useDispatch<any>()
    const { 
        products,
        pagination,
        isPaginationVisible,
        purchasesPagination,
        isPurchasesPaginationVisible,
        purchases, 
        purchaseSelected,
        productSelectedToAdd, 
        productsInPurchase,
        supplierSelected,
        isLoading,
    } = useSelector( (state: RootState) => state.purchase )

    const getPurchases = () => {
        dispatch(startGettingAllPurchases({
            page: 1,
            limit: purchasesPagination.itemsPerPage
        }))
    }

    const onSetSelectedPurchase = ( purchaseId: string ) => {
        if ( !purchaseId ) throw new Error('El id de la compra es obligatorio')
        const purchase = purchases?.find( purchase => purchase.purchase.purchaseId === purchaseId )
        if ( !purchase ) throw new Error('La compra no está presente')
        dispatch(setPurchaseSelected(purchase))
    }

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

    const onSetPagePagination = ( page: number ) => {
        dispatch(setPageProducts(page))
        dispatch(startGettingProductsToBeInPurchase({
            page,
            limit: pagination.itemsPerPage
        }))
    }

    const onSetPagePurchasesPagination = ( page: number ) => {
        dispatch(setPagePurchases(page))
        dispatch(startGettingAllPurchases({
            page,
            limit: purchasesPagination.itemsPerPage
        }))
    }

    return {
        products,
        purchases,
        purchaseSelected,
        productSelectedToAdd,
        productsInPurchase,
        supplierSelected,
        isLoading,
        pagination,
        isPaginationVisible,
        purchasesPagination,
        isPurchasesPaginationVisible,

        getPurchases,
        onSetSelectedPurchase,
        onSelectProductToAddPurchase,
        onAddProductInPurchase,
        onRemoveProductInPurchase,
        onSetSupplierSelected,
        incrementQuantityInPurchase,
        decrementQuantityInPurchase,
        savePurchase,
        getProductsToBeInPurchase,
        onSetPagePagination,
        onSetPagePurchasesPagination,
    }
}