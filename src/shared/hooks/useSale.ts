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
import type { Pagination } from "../../interfaces/dto/pagination.interface"
import type { ProductInCart } from "../../interfaces/dto/product.interface"
import type { GetSale, SaleResponse, SaveSale } from "../../interfaces/dto/sale.interface"
import type { RootState } from "../../store"
import type { DateRange, PriceRange } from "../../interfaces/ui/filter.interface"
import { puntocomApiPrivate } from "../../config/api/puntocom.api"

export const useSale = () => {
    
    const dispatch = useDispatch<any>()
    const { 
        sales, 
        isLoading, 
        saleCreated,
        saleToPrint, 
        pagination, 
        filter, 
        selectedSale, 
        isPaginationVisible } = useSelector( (state: RootState) => state.sale )

    const filterSalesByUser = ( userId: string ) => {
        dispatch(startGettingSalesByUser( userId, { page: 1, limit: pagination.itemsPerPage }))
    }

    const filterSales = ( prices?: PriceRange, dates?: DateRange, pagination?: Pagination ) => {
        dispatch(startGettingFilteredSales(prices, dates, pagination))

        if ( prices?.minPrice !== undefined && prices?.maxPrice !== undefined ) {
            dispatch(setPricesFilter({ price: { minPrice: prices.minPrice, maxPrice: prices.maxPrice }}))
        }

        if ( dates?.dateStart && dates?.dateEnd ) {
            dispatch(setDatesFilter({ dates: { dateStart: dates?.dateStart, dateEnd: dates?.dateEnd }}))
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
            dateStart: string | null
            dateEnd: string | null
            minPrice: number | null
            maxPrice: number | null
    }) => {

        const current = filter
        const applied = {
            userId: filtersOverride?.userId ?? current.user.id,
            dateStart: filtersOverride?.dateStart ?? current.dates.dateStart,
            dateEnd: filtersOverride?.dateEnd ?? current.dates.dateEnd,
            minPrice: filtersOverride?.minPrice ?? current.price.minPrice,
            maxPrice: filtersOverride?.maxPrice ?? current.price.maxPrice,
        }

        const paginationParams = { page, limit }

        const priceFilter =
            applied.minPrice !== null && applied.maxPrice !== null
                ? { minPrice: applied.minPrice, maxPrice: applied.maxPrice }
                : undefined

        const dateFilter =
            applied.dateStart && applied.dateEnd
                ? { dateStart: applied.dateStart, dateEnd: applied.dateEnd }
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
        dispatch(setUserFilter({ user: { id: userId, name: userName }}))
        dispatch(setPage(1))
        filterSalesDependingActiveFilters(1, pagination.itemsPerPage, {
            userId,
            dateStart: filter.dates.dateStart,
            dateEnd: filter.dates.dateEnd,
            minPrice: filter.price.minPrice,
            maxPrice: filter.price.maxPrice,
        })
    }

    const onSetFilterPrices = (minPrice: number | null, maxPrice: number | null) => {
        dispatch(setPricesFilter({price: { minPrice, maxPrice }}))
        dispatch(setPage(1))
        filterSalesDependingActiveFilters(1, pagination.itemsPerPage, {
            userId: filter.user.id,
            dateStart: filter.dates.dateStart,
            dateEnd: filter.dates.dateEnd,
            minPrice,
            maxPrice,
        })
    }

    const onSetFilterDates = (dateStart: string | null, dateEnd: string | null) => {
        dispatch(setDatesFilter({ dates: { dateStart, dateEnd }}))
        dispatch(setPage(1))
        filterSalesDependingActiveFilters(1, pagination.itemsPerPage, {
            userId: filter.user.id,
            minPrice: filter.price.minPrice,
            maxPrice: filter.price.maxPrice,
            dateStart,
            dateEnd
        })
    }

    const onResetFilters = () => {
        dispatch(setUserFilter({ user: { id: null, name: null }}))
        dispatch(setPricesFilter({ price: { minPrice: null, maxPrice: null }}))
        dispatch(setDatesFilter({ dates: { dateStart: null, dateEnd: null }}))
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

    const onGetSaleById = async (): Promise<SaleResponse> => {
        if (!selectedSale) throw new Error('Seleccione una venta para imprimir')
        const saleId = selectedSale.id
        const { data } = await puntocomApiPrivate.get<GetSale>(`/api/sale/${saleId}`)
        const { sale } = data
        return sale
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
        onGetSaleById,

        pagination,
        saleCreated,
        sales,
        saveSale,
        selectedSale,
        filterSales,
        onSetFilterDates,
        onResetFilters,
        saleToPrint,
        filterSalesDependingActiveFilters,
    }

}