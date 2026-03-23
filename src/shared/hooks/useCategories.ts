import { useDispatch, useSelector } from "react-redux"
import { 
    startChangingCategoryStatus, 
    startCreatingCategory, 
    startFilteringCategories, 
    startGettingAllCategories,  
    startUpdatingCategory, 
    startUploadingCategoryImage 
} from "../../store/categories/categories.thunk"
import { 
    setCategories, 
    setCategorySelected, 
    setOrderedAsc, 
    setPage, 
    setCategoryStatusFilter, 
    setCategoryNameFilter,
    resetFilter
} from "../../store/categories/categories.slice"
import type { RootState } from "../../store"
import type { CreateCategory, UpdateCategory } from "../../interfaces/dto/category.interface"
import type { FilterCategories } from "../../interfaces/ui/filter.interface"

export const useCategories = () => {

    const dispatch = useDispatch<any>() 
    const { 
        allCategories,
        categories, 
        categorySelected, 
        filter,
        isLoading, 
        isOrderedAsc,
        isPaginationVisible,
        pagination,
    } = useSelector( (state: RootState) => state.categories )

    const applyCategoryFilters = (
        page: number,
        limit: number,
        overrides?: FilterCategories
    ) => {

        const current: FilterCategories = {
            categoryName: filter.categoryName,
            status: filter.status
        }
        const applied: FilterCategories = {...current, ...overrides}
        const hasCategoryNameFilter = applied.categoryName !== null
        const hasStatusFilter = applied.status !== null

        if ( hasCategoryNameFilter || hasStatusFilter ) {
            dispatch(startFilteringCategories(
                applied.status ?? undefined,
                applied.categoryName ?? undefined,
                { page, limit }
            ))
        } else {
            dispatch(startFilteringCategories(
                undefined,
                undefined,
                { page, limit }
            ))
        }

    }

    const onGetCategories = () => {
       dispatch(startFilteringCategories(
            undefined,
            undefined,
        ))
    }

    const onGetAllCategories = () => {
        dispatch(startGettingAllCategories())
    }

    const onSetFilterCategoriesByStatus = (status: string | null) => {
        dispatch( setCategoryStatusFilter({status}) )
        dispatch(setPage(1))
        applyCategoryFilters(1, pagination.itemsPerPage, { status })
    }

    const onSetFilterCategoriesByName = (categoryName: string | null) => {
        dispatch( setCategoryNameFilter({categoryName}) )
        dispatch(setPage(1))
        applyCategoryFilters(1, pagination.itemsPerPage, { categoryName })
    }

    const onResetFilters = () => {
        dispatch(resetFilter())
        dispatch(setPage(1))
        onGetCategories()
    }
    
    const onSetPage = ( page: number ) => {
        dispatch(setPage(page))
        applyCategoryFilters(page, pagination.itemsPerPage)
    }
   
    const onCreateCategory = ( data: CreateCategory ) => {
        dispatch( startCreatingCategory(data) )
    }

    const onUpdateCategory = ( categoryId: string, categoryData: UpdateCategory ) => {
        dispatch( startUpdatingCategory(categoryId, categoryData))
    }

    const onSelectCategory = ( id: string ) => {
        const category = categories?.find( category => category.id === id )
        dispatch( setCategorySelected(category!) )
    }

    const onUploadCategoryIcon = (categoryId: string, files: FormData ) => {
        dispatch(startUploadingCategoryImage(categoryId, files))
    }

    const onChangeCategoryStatus = (categoryId: string, status: boolean) => {
        dispatch(startChangingCategoryStatus(categoryId, status))
    }

    const onOrderAlpha = ( ordered: boolean ) => {
        dispatch(setOrderedAsc(ordered))
        onSortCategories()
    }

    const onSortCategories = () => {
        const categoriesSorted = [...categories!].sort((a, b) => {
            const categoryA = a.name.toLowerCase()
            const categoryB = b.name.toLowerCase()
            
            if ( isOrderedAsc ) {
                return categoryA.localeCompare(categoryB)
            } else {
                return categoryB.localeCompare(categoryA)
            }
        })

        dispatch(setCategories( categoriesSorted ?? [] ))
    }

    return {
        activeCategories: allCategories?.filter( c => c.isActive ),
        allCategories,
        categories,
        categorySelected,
        filter,
        isLoading,
        isOrderedAsc,
        isPaginationVisible,
        pagination,

        onChangeCategoryStatus,
        onCreateCategory,
        onGetAllCategories,
        onGetCategories,
        onOrderAlpha,
        onResetFilters,
        onSelectCategory,
        onSetFilterCategoriesByName,
        onSetFilterCategoriesByStatus,
        onSetPage,
        onUpdateCategory,
        onUploadCategoryIcon,
    }
}