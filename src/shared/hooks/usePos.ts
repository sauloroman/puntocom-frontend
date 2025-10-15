import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { addProductToCart, decreaseQuantity, deleteProductFromCart, increaseQuantity, setCategoryActive, setProductToAdd } from "../../store/pos/pos.slice"
import { startFilteringProductsByCategory, startGettingProductsToSale, startSearchingProducts } from "../../store/pos/pos.thunk"
import type { Product, ProductInCart } from "../../interfaces/product.interface"

export const usePos = () => {

    const dispatch = useDispatch<any>()
    const { categoryActive, products, pagination, productToAdd, cart } = useSelector( (state: RootState) => state.pos )

    const onSetCategoryActive = ( category: string | null ) => {
        dispatch(setCategoryActive(category))
    }

    const getProductsToSale = () => {
        dispatch(startGettingProductsToSale({
            page: 1,
            limit: pagination.itemsPerPage
        }))
    }

    const filterProductsByCategory = ( categoryId: string ) => {
        dispatch(startFilteringProductsByCategory({
            page: 1,
            limit: pagination.itemsPerPage
        }, categoryId))
    }

    const searchProduct = (productSearched: string) => {
        dispatch(startSearchingProducts(productSearched))
    }

    const onSetProductToAdd = ( productId: string ) => {
        const product = products?.find( pro => pro.id === productId )
        if ( !product ) return
        dispatch( setProductToAdd(product) )
    }

    const onAddProductToCart = ({ quantity, discount, product }: { quantity: number, discount: number, product: Product}) => {
        if ( quantity <= 0 ) return;
        if ( discount > product.sellingPrice ) return;
        
        const productToCart: ProductInCart = {
            product,
            discount,
            quantity
        }

        dispatch(addProductToCart(productToCart))
    }

    const onDeleteProductFromCart = ( productId: string ) => {
        dispatch(deleteProductFromCart(productId))
    }

    const onIncreaseQuantity = ( productId: string ) => {
        dispatch(increaseQuantity(productId))
    }

    const onDecreaseQuantity = ( productId: string ) => {
        dispatch(decreaseQuantity(productId))
    }

    return {
        pagination,
        products,
        productToAdd,
        categoryActive,
        cart,
        
        onSetCategoryActive,
        getProductsToSale,
        searchProduct,
        filterProductsByCategory,
        onSetProductToAdd,
        onAddProductToCart,
        onDeleteProductFromCart,
        onIncreaseQuantity,
        onDecreaseQuantity,
        getProductByIdFromPos: (productId: string) => products?.find( pro => pro.id === productId ),
    }

}