import { showAlert } from "../../store/alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"
import { 
    useDispatch, 
    useSelector 
} from "react-redux"
import { 
    startGettingAllSales, 
    startGettingFilteredSales, 
    startGettingFilteredSalesByUser, 
    startGettingSalesByUser, 
    startSavingSale 
} from "../../store/sale/sale.thunk"
import { 
    setDatesFilter, 
    setPage, 
    setPaginationVisible, 
    setPricesFilter, 
    setSelectedSale, 
    setUserFilter 
} from "../../store/sale/sale.slice"
import type { Pagination } from "../../interfaces/pagination.interface"
import type { ProductInCart } from "../../interfaces/product.interface"
import type { DateRange, PriceRange, SaveSale } from "../../interfaces/sale.interface"
import type { RootState } from "../../store"

export const useSale = () => {
    
    const dispatch = useDispatch<any>()
    const { sales, isLoading, saleCreated, pagination, filter, selectedSale, isPaginationVisible } = useSelector( (state: RootState) => state.sale )

    const filterSalesByUser = ( userId: string ) => {
        dispatch(startGettingSalesByUser( userId, { page: 1, limit: pagination.itemsPerPage }))
    }

    const filterSales = ( prices?: PriceRange, dates?: DateRange, pagination?: Pagination ) => {
        dispatch(startGettingFilteredSales(prices, dates, pagination))

        if ( prices?.minPrice !== undefined && prices?.maxPrice !== undefined ) {
            dispatch(setPricesFilter({ priceMin: prices.minPrice, priceMax: prices.maxPrice }))
        }

        if ( dates?.dateFrom && dates?.dateTo ) {
            dispatch(setDatesFilter({ dateFrom: dates?.dateFrom, dateTo: dates?.dateTo }))
        }
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

    const filterSalesDependingActiveFilters = (
        page: number,
        limit: number,
        filtersOverride?: {
            userId: string | null
            dateFrom: string | null
            dateTo: string | null
            priceMin: number | null
            priceMax: number | null
    }) => {

        const current = filter
        const applied = {
            userId: filtersOverride?.userId ?? current.user.id,
            dateFrom: filtersOverride?.dateFrom ?? current.dates.dateFrom,
            dateTo: filtersOverride?.dateTo ?? current.dates.dateTo,
            priceMin: filtersOverride?.priceMin ?? current.prices.priceMin,
            priceMax: filtersOverride?.priceMax ?? current.prices.priceMax,
        }

        const paginationParams = { page, limit }

        const priceFilter =
            applied.priceMin !== null && applied.priceMax !== null
                ? { minPrice: applied.priceMin, maxPrice: applied.priceMax }
                : undefined

        const dateFilter =
            applied.dateFrom && applied.dateTo
                ? { dateFrom: applied.dateFrom, dateTo: applied.dateTo }
                : undefined

        if (applied.userId) {
            if (priceFilter || dateFilter) {
                dispatch(startGettingFilteredSalesByUser(applied.userId, priceFilter, dateFilter, paginationParams))
            } else {
                dispatch(startGettingSalesByUser(applied.userId, paginationParams))
            }
            return
        }

        if (priceFilter || dateFilter) {
            dispatch(startGettingFilteredSales(priceFilter, dateFilter, paginationParams))
        } else {
            dispatch(startGettingAllSales(paginationParams))
        }
    }

    const onSetFilterUser = (userId: string | null, userName: string | null) => {
        dispatch(setUserFilter({ id: userId, name: userName }))
        dispatch(setPage(1))
        filterSalesDependingActiveFilters(1, pagination.itemsPerPage, {
            userId,
            dateFrom: filter.dates.dateFrom,
            dateTo: filter.dates.dateTo,
            priceMin: filter.prices.priceMin,
            priceMax: filter.prices.priceMax,
        })
    }

    const onSetFilterPrices = (priceMin: number | null, priceMax: number | null) => {
        dispatch(setPricesFilter({ priceMin, priceMax }))
        dispatch(setPage(1))
        filterSalesDependingActiveFilters(1, pagination.itemsPerPage, {
            userId: filter.user.id,
            dateFrom: filter.dates.dateFrom,
            dateTo: filter.dates.dateTo,
            priceMin,
            priceMax,
        })
    }

    const onSetFilterDates = (dateFrom: string | null, dateTo: string | null) => {
        dispatch(setDatesFilter({ dateFrom, dateTo }))
        dispatch(setPage(1))
        filterSalesDependingActiveFilters(1, pagination.itemsPerPage, {
            userId: filter.user.id,
            priceMin: filter.prices.priceMin,
            priceMax: filter.prices.priceMax,
            dateFrom,
            dateTo
        })
    }

    const onResetFilters = () => {
        dispatch(setUserFilter({ id: null, name: null }))
        dispatch(setPricesFilter({ priceMax: null, priceMin: null }))
        dispatch(setDatesFilter({ dateFrom: null, dateTo: null }))
        dispatch(setPage(1))
        getAllSales()
    }

    const onSetSelectedSale = ( saleId: string ) => {
        const sale = sales.find( sale => sale.id === saleId )
        if ( !sale ) return
        dispatch(setSelectedSale( sale ))
    }

    const onSetPage = (page: number) => {
        dispatch(setPage(page))
        filterSalesDependingActiveFilters(page, pagination.itemsPerPage)
    }

    return {
        filter,
        filterSalesByUser,
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
        filterSales,
        onSetFilterDates,
        onResetFilters,
        filterSalesDependingActiveFilters,
    }

}