import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { Product } from "../../interfaces/dto/product.interface"

import {
  addProductInPurchase,
  decrementProductQuantityInPurchase,
  incrementProductQuantityInPurchase,
  removeProductInPurchase,
  resetFilter,
  setDatesFilter,
  setFilterSupplier,
  setFilterUser,
  setPageProducts,
  setPagePurchases,
  setPricesFilter,
  setProductSelectedToAdd,
  setPurchaseSelected,
  setSupplierSelected,
} from "../../store/purchase/purchase.slice"

import type {
  ProductInPurchase,
  SavePurchase,
} from "../../interfaces/dto/purchase.interface"

import {
  startFilteringPurchases,
  startGettingProductsToBeInPurchase,
  startSavingPurchase,
} from "../../store/purchase/purchase.thunk"

import type { FilterPurchasesDTO } from "../../interfaces/ui/filter.interface"

export const usePurchase = () => {
  const dispatch = useDispatch<any>()

  const {
    filter,
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
  } = useSelector((state: RootState) => state.purchase)

    const applyPurchasesFilters = (
    page: number,
    limit: number,
    overrides?: Partial<FilterPurchasesDTO>
  ) => {

    const current: FilterPurchasesDTO = {
      userId: filter.user.id,
      supplierId: filter.supplier.id,
      dateStart: filter.dates.dateStart,
      dateEnd: filter.dates.dateEnd,
      minPrice: filter.price.minPrice,
      maxPrice: filter.price.maxPrice,
    }

    const applied: FilterPurchasesDTO = {
      ...current,
      ...overrides,
    }

    const hasPriceFilter = applied.minPrice !== null && applied.maxPrice !== null
    const hasDateFilter = applied.dateStart !== null && applied.dateEnd !== null
    const hasOtherFilters = applied.userId !== null || applied.supplierId !== null

    if (hasPriceFilter || hasDateFilter || hasOtherFilters) {
      dispatch(
        startFilteringPurchases(
          applied.userId ?? '',
          applied.supplierId ?? '',
          hasPriceFilter
            ? { minPrice: applied.minPrice ?? 0, maxPrice: applied.maxPrice ?? 0 }
            : undefined,
          hasDateFilter
            ? { dateStart: applied.dateStart!, dateEnd: applied.dateEnd! }
            : undefined
        )
      )
    } else {
      dispatch(startFilteringPurchases(
        undefined,
        undefined,
        undefined,
        undefined,
        { page, limit }
      ))
    }
  }


  const onGetPurchases = () => {
    dispatch( startFilteringPurchases(
      undefined,
      undefined,
      undefined,
      undefined,
    ))
  }

  const onGetProductsToBeInPurchase = () => {
    dispatch(startGettingProductsToBeInPurchase({
      page: 1,
      limit: pagination.itemsPerPage,
    }))
  }

  const onSetSelectedPurchase = (purchaseId: string) => {
    if (!purchaseId) throw new Error("El id de la compra es obligatorio")

    const purchase = purchases?.find(p => p.purchase.purchaseId === purchaseId)

    if (!purchase) throw new Error("La compra no está presente")

    dispatch(setPurchaseSelected(purchase))
  }

  const onSelectProductToAddPurchase = (product: Product | null) => {
    dispatch(setProductSelectedToAdd(product))
  }

  const onSetSupplierSelected = (supplierId: string) => {
    dispatch(setSupplierSelected(supplierId))
  }

  const onSavePurchase = (savePurchase: SavePurchase) => {
    dispatch(startSavingPurchase(savePurchase))
  }

  const onAddProductInPurchase = (product: ProductInPurchase) => {
    if (!product) return
    dispatch(addProductInPurchase(product))
  }

  const onRemoveProductInPurchase = (productId: string) => {
    if (!productId) return
    dispatch(removeProductInPurchase(productId))
  }

  const onIncrementQuantityInPurchase = (productId: string) => {
    if (!productId) return
    dispatch(incrementProductQuantityInPurchase(productId))
  }

  const onDecrementQuantityInPurchase = (productId: string) => {
    if (!productId) return
    dispatch(decrementProductQuantityInPurchase(productId))
  }

  const onSetPagePagination = (page: number) => {
    dispatch(setPageProducts(page))
    dispatch(
      startGettingProductsToBeInPurchase({
        page,
        limit: pagination.itemsPerPage,
      })
    )
  }

  const onSetPagePurchasesPagination = (page: number) => {
    dispatch(setPagePurchases(page))
    applyPurchasesFilters(page, purchasesPagination.itemsPerPage) 
  }

  const onSetFilterPurchasesByUser = (userId: string, userName: string) => {
    dispatch(setFilterUser({ user: { id: userId, name: userName } }))
    dispatch(setPagePurchases(1))
    applyPurchasesFilters(1, purchasesPagination.itemsPerPage, { userId })
  }

  const onSetFilterPurchasesBySupplier = ( supplierId: string, supplierName: string ) => {
    dispatch(setFilterSupplier({ supplier: { id: supplierId, name: supplierName } }))
    dispatch(setPagePurchases(1))
    applyPurchasesFilters(1, purchasesPagination.itemsPerPage, {supplierId})
  }

  const onSetFilterPurchasesByPriceRange = ( minPrice: number | null, maxPrice: number | null ) => {
    dispatch(setPricesFilter({ price: { minPrice, maxPrice } }))
    dispatch(setPagePurchases(1))
    applyPurchasesFilters(1, purchasesPagination.itemsPerPage, { minPrice, maxPrice })
  }

  const onSetFilterPurchasesByDateRange = ( dateStart: string | null, dateEnd: string | null ) => {
    dispatch(setDatesFilter({ dates: { dateStart, dateEnd } }))
    dispatch(setPagePurchases(1))
    applyPurchasesFilters(1, purchasesPagination.itemsPerPage, { dateStart, dateEnd })
  }

  const onResetFilters = () => {
    dispatch(resetFilter())
    dispatch(setPagePurchases(1))
    onGetPurchases()
  }

  return {
    // state
    filter,
    isLoading,
    isPaginationVisible,
    isPurchasesPaginationVisible,
    pagination,
    products,
    productSelectedToAdd,
    productsInPurchase,
    purchases,
    purchaseSelected,
    purchasesPagination,
    supplierSelected,

    // actions
    onAddProductInPurchase,
    onDecrementQuantityInPurchase,
    onGetProductsToBeInPurchase,
    onGetPurchases,
    onIncrementQuantityInPurchase,
    onRemoveProductInPurchase,
    onResetFilters,
    onSavePurchase,
    onSelectProductToAddPurchase,
    onSetFilterPurchasesByDateRange,
    onSetFilterPurchasesByPriceRange,
    onSetFilterPurchasesBySupplier,
    onSetFilterPurchasesByUser,
    onSetPagePagination,
    onSetPagePurchasesPagination,
    onSetSelectedPurchase,
    onSetSupplierSelected,
  }
}
