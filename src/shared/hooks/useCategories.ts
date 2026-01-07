import { useDispatch, useSelector } from "react-redux"
import { 
    startChangingCategoryStatus, 
    startCreatingCategory, 
    startFilteringCategoriesByStatus, 
    startGettingAllCategories, 
    startGettingCategories, 
    startSearchingCategories, 
    startUpdatingCategory, 
    startUploadingCategoryImage 
} from "../../store/categories/categories.thunk"
import { 
    setCategories, 
    setCategorySelected, 
    setOrderedAsc, 
    setPage, 
    setPaginationVisible, 
    setStatusFilter 
} from "../../store/categories/categories.slice"
import type { RootState } from "../../store"
import type { CreateCategory, UpdateCategory } from "../../interfaces/dto/category.interface"

export const useCategories = () => {

    const dispatch = useDispatch<any>() 
    const { 
        categories, 
        allCategories,
        categorySelected, 
        isLoading, 
        pagination,
        filter,
        isPaginationVisible,
        isOrderedAsc,
    } = useSelector( (state: RootState) => state.categories )

    const getCategories = () => {
        dispatch( startGettingCategories({ page: 1, limit: pagination.itemsPerPage }) )
    }

    const getAllCategories = () => {
        dispatch(startGettingAllCategories())
    }

    const filterCategoriesByStatus = ( status: boolean ) => {
        dispatch( setStatusFilter({status, isVisible: true}) )
        dispatch(startFilteringCategoriesByStatus({ page: 1, limit: pagination.itemsPerPage}, status))
    }

    const onSetFilterStatus = (status: boolean | null, isVisible: boolean) => {
        dispatch( setStatusFilter({status, isVisible}) )
    }

    const createCategory = ( data: CreateCategory ) => {
        dispatch( startCreatingCategory(data) )
    }

    const updateCategory = ( categoryId: string, categoryData: UpdateCategory ) => {
        dispatch( startUpdatingCategory(categoryId, categoryData))
    }

    const onSelectCategory = ( id: string ) => {
        const category = categories?.find( category => category.id === id )
        dispatch( setCategorySelected(category!) )
    }

    const uploadCategoryIcon = (categoryId: string, files: FormData ) => {
        dispatch(startUploadingCategoryImage(categoryId, files))
    }

    const changeCategoryStatus = (categoryId: string, status: boolean) => {
        dispatch(startChangingCategoryStatus(categoryId, status))
    }

    const onSearchCategory = ( categorySearched: string ) => {
        dispatch(startSearchingCategories(categorySearched))
    }

    const onSetPage = ( page: number ) => {
         dispatch(setPage(page))

        if (filter.status !== null) {
            dispatch(startFilteringCategoriesByStatus({ page, limit: pagination.itemsPerPage }, filter.status))
        } else {
            dispatch(startGettingCategories({ page, limit: pagination.itemsPerPage }))
        }
    }

    const onChangePaginationVisibility = ( isVisible: boolean ) => {
        dispatch( setPaginationVisible(isVisible) )
    }

    const onOrderAlpha = ( ordered: boolean ) => {
        dispatch(setOrderedAsc(ordered))
        sortCategories()
    }

    const sortCategories = () => {
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
        categorySelected,
        categories,
        allCategories,
        isLoading,
        pagination,
        filter,
        isPaginationVisible,
        isOrderedAsc,

        onSelectCategory,
        getCategories,
        getAllCategories,
        createCategory,
        updateCategory,
        uploadCategoryIcon,
        changeCategoryStatus,
        filterCategoriesByStatus,
        onSetPage,
        onSetFilterStatus,
        onSearchCategory,
        onChangePaginationVisibility,
        onOrderAlpha
    }
}