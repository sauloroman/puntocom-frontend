import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { Product } from "../../interfaces/product.interface"
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
} from "../../interfaces/purchase.interface"
import {
  startFilteringPurchases,
  startGettingAllPurchases,
  startGettingProductsToBeInPurchase,
  startSavingPurchase,
} from "../../store/purchase/purchase.thunk"

interface PurchasesFilterDTO {
  userId: string | null
  supplierId: string | null
  dateStart: string | null
  dateEnd: string | null
  minPrice: number | null
  maxPrice: number | null
}

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

  const getPurchases = () => {
    dispatch(
      startGettingAllPurchases({
        page: 1,
        limit: purchasesPagination.itemsPerPage,
      })
    )
  }

  const getProductsToBeInPurchase = () => {
    dispatch(
      startGettingProductsToBeInPurchase({
        page: 1,
        limit: pagination.itemsPerPage,
      })
    )
  }

  const onSetSelectedPurchase = (purchaseId: string) => {
    if (!purchaseId) throw new Error("El id de la compra es obligatorio")

    const purchase = purchases?.find(
      (p) => p.purchase.purchaseId === purchaseId
    )

    if (!purchase) throw new Error("La compra no está presente")

    dispatch(setPurchaseSelected(purchase))
  }

  const onSelectProductToAddPurchase = (product: Product | null) => {
    dispatch(setProductSelectedToAdd(product))
  }

  const onSetSupplierSelected = (supplierId: string) => {
    dispatch(setSupplierSelected(supplierId))
  }

  const savePurchase = (savePurchase: SavePurchase) => {
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

  const incrementQuantityInPurchase = (productId: string) => {
    if (!productId) return
    dispatch(incrementProductQuantityInPurchase(productId))
  }

  const decrementQuantityInPurchase = (productId: string) => {
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
    dispatch(
      startGettingAllPurchases({
        page,
        limit: purchasesPagination.itemsPerPage,
      })
    )
  }

  const applyPurchasesFilters = (
    page: number,
    limit: number,
    overrides?: Partial<PurchasesFilterDTO>
  ) => {

    const current: PurchasesFilterDTO = {
      userId: filter.user.id,
      supplierId: filter.supplier.id,
      dateStart: filter.dates.dateStart,
      dateEnd: filter.dates.dateEnd,
      minPrice: filter.price.minPrice,
      maxPrice: filter.price.maxPrice,
    }

    const applied: PurchasesFilterDTO = {
      ...current,
      ...overrides,
    }

    const hasPriceFilter =
      applied.minPrice !== null && applied.maxPrice !== null

    const hasDateFilter =
      applied.dateStart !== null && applied.dateEnd !== null

    const hasOtherFilters =
      applied.userId !== null || applied.supplierId !== null

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
      dispatch(startGettingAllPurchases({ page, limit }))
    }
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
    getPurchases()
  }

  return {
    // state
    filter,
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

    // actions
    getPurchases,
    getProductsToBeInPurchase,
    onSetSelectedPurchase,
    onSelectProductToAddPurchase,
    onAddProductInPurchase,
    onRemoveProductInPurchase,
    incrementQuantityInPurchase,
    decrementQuantityInPurchase,
    savePurchase,
    onSetSupplierSelected,
    onSetPagePagination,
    onSetPagePurchasesPagination,
    onSetFilterPurchasesByUser,
    onSetFilterPurchasesBySupplier,
    onSetFilterPurchasesByPriceRange,
    onSetFilterPurchasesByDateRange,
    onResetFilters,
  }
}
