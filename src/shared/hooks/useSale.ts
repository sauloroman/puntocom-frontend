import { showAlert } from "../../store/alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"
import { 
    useDispatch, 
    useSelector 
} from "react-redux"
import { 
    startFilteringSales,
    startGettingAllSales, 
    startSavingSale 
} from "../../store/sale/sale.thunk"
import { 
    resetFilter,
    setDatesFilter, 
    setPage, 
    setPaginationVisible, 
    setPricesFilter, 
    setSelectedSale, 
    setUserFilter 
} from "../../store/sale/sale.slice"
import type { ProductInCart } from "../../interfaces/dto/product.interface"
import type { GetSale, SalesFilterDTO, SaleWithDetailsResponse, SaveSale } from "../../interfaces/dto/sale.interface"
import type { RootState } from "../../store"
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
        isPaginationVisible 
    } = useSelector( (state: RootState) => state.sale )

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

    const onSetSelectedSale = ( saleId: string ) => {
        const sale = sales.find( sale => sale.sale.saleId === saleId )
        if ( !sale ) return
        dispatch(setSelectedSale( sale ))
    }

    const onGetSaleById = async (): Promise<SaleWithDetailsResponse> => {
        if (!selectedSale) throw new Error('Seleccione una venta para imprimir')
        const saleId = selectedSale.sale.saleId
        const { data } = await puntocomApiPrivate.get<GetSale>(`/api/sale/${saleId}`)
        const { sale } = data
        return sale
    }

    const applySalesFilters = (
        page: number,
        limit: number,
        overrides?: Partial<SalesFilterDTO>
    ) => {

        const current: SalesFilterDTO = {
            userId: filter.user.id,
            dateStart: filter.dates.dateStart,
            dateEnd: filter.dates.dateEnd,
            minPrice: filter.price.minPrice,
            maxPrice: filter.price.maxPrice
        }
        const applied: SalesFilterDTO = { ...current, ...overrides}
        const hasPriceFilter = applied.minPrice !== null && applied.maxPrice !== null
        const hasDateFilter = applied.dateStart !== null && applied.dateEnd !== null
        const hasOtherFilters = applied.userId !== null 

        if ( hasPriceFilter || hasDateFilter || hasOtherFilters ) {
            dispatch(startFilteringSales(
                applied.userId ?? '',
                hasPriceFilter
                    ? { minPrice: applied.minPrice ?? 0, maxPrice: applied.maxPrice ?? 0 }
                    : undefined,
                hasDateFilter
                    ? { dateStart: applied.dateStart!, dateEnd: applied.dateEnd! }
                    : undefined
            ))
        } else {
            dispatch(startGettingAllSales({ page, limit }))
        }

    }

    const onSetPage = (page: number) => {
        dispatch(setPage(page))
        applySalesFilters(page, pagination.itemsPerPage)
    }

    const onSetFilterSalesByUser = (userId: string | null, userName: string | null) => {
        dispatch(setUserFilter({ user: { id: userId, name: userName }}))
        dispatch(setPage(1))
        applySalesFilters(1, pagination.itemsPerPage, { userId })
    }

    const onSetFilterSalesByPriceRange = (minPrice: number | null, maxPrice: number | null) => {
        dispatch(setPricesFilter({price: { minPrice, maxPrice }}))
        dispatch(setPage(1))
        applySalesFilters(1, pagination.itemsPerPage, { minPrice, maxPrice })
    }

    const onSetFilterSalesByDateRange = (dateStart: string | null, dateEnd: string | null) => {
        dispatch(setDatesFilter({ dates: { dateStart, dateEnd }}))
        dispatch(setPage(1))
        applySalesFilters(1, pagination.itemsPerPage, {dateStart, dateEnd})
    }

    const onResetFilters = () => {
        dispatch(resetFilter())
        dispatch(setPage(1))
        getAllSales()
    }

    return {
        // Properties
        filter,
        isLoading,
        isPaginationVisible,
        pagination,
        saleCreated,
        sales,
        selectedSale,
        saleToPrint,
        
        // Actions
        getAllSales,
        saveSale,
        onChangePaginationVisibility,
        onSetPage,
        onSetSelectedSale,
        onGetSaleById,
        onSetFilterSalesByUser,
        onSetFilterSalesByPriceRange,
        onSetFilterSalesByDateRange,
        onResetFilters,
    }

}