import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { startFilteringSalesByRangePrice, startGettingAllSales, startGettingSalesByUser, startSavingSale } from "../../store/sale/sale.thunk"
import type { ProductInCart } from "../../interfaces/product.interface"
import type { SaveSale } from "../../interfaces/sale.interface"
import { showAlert } from "../../store/alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"
import { setPage, setPaginationVisible, setPricesFilter, setSelectedSale, setUserFilter } from "../../store/sale/sale.slice"

export const useSale = () => {
    
    const dispatch = useDispatch<any>()
    const { sales, isLoading, saleCreated, pagination, filter, selectedSale, isPaginationVisible } = useSelector( (state: RootState) => state.sale )

    const filterSalesByUser = ( userId: string, userName: string ) => {
        dispatch(setUserFilter({ id: userId, name: userName, isVisible: true }))
        dispatch(startGettingSalesByUser( userId, {
            page: 1,
            limit: pagination.itemsPerPage
        }))
    }

    const filterSalesByPrice = ( priceMin: number, priceMax: number ) => {
        dispatch(setPricesFilter({ priceMin, priceMax, isVisible: true }))
        dispatch(startFilteringSalesByRangePrice({ minPrice: priceMin, maxPrice: priceMax }, {
            page: 1,
            limit: pagination.itemsPerPage
        }))
    }

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

    const getAllSales = () => {
        dispatch(startGettingAllSales({
            page: 1,
            limit: pagination.itemsPerPage
        }))
    }

    const onChangePaginationVisibility = ( isVisible: boolean ) => {
        dispatch(setPaginationVisible(isVisible))
    }

    const onSetFilterUser = ( userId: string | null, userName: string | null, isVisible: boolean ) => {
        dispatch(setUserFilter({id: userId, name: userName, isVisible }))
    }

    const onSetFilterPrices = ( priceMin: number | null, priceMax: number | null, isVisible: boolean ) => {
        dispatch( setPricesFilter({ priceMin, priceMax, isVisible }))
    }

    const onSetSelectedSale = ( saleId: string ) => {
        const sale = sales.find( sale => sale.id === saleId )
        if ( !sale ) return
        dispatch(setSelectedSale( sale ))
    }

    const onSetPage = ( page: number ) => {
        dispatch(setPage(page))

        if ( filter.user.id !== null ) {
            dispatch( startGettingSalesByUser(filter.user.id, { page, limit: pagination.itemsPerPage }) )
        } else if ( filter.prices.priceMax !== null && filter.prices.priceMin !== null ) {
            dispatch( startFilteringSalesByRangePrice({ 
                minPrice: filter.prices.priceMin, 
                maxPrice: filter.prices.priceMax 
            }, {page, limit: pagination.itemsPerPage}) )
        }  else {
            dispatch( startGettingAllSales({ page, limit: pagination.itemsPerPage }) )
        }
    }

    return {
        filter,
        filterSalesByUser,
        filterSalesByPrice,
        getAllSales,
        isLoading,
        isPaginationVisible,
        onChangePaginationVisibility,
        onSetFilterUser,
        onSetPage,
        onSetSelectedSale,
        onSetFilterPrices,
        pagination,
        saleCreated,
        sales,
        saveSale,
        selectedSale,
    }

}