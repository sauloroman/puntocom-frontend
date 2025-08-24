import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { 
    startChangingCategoryStatus, 
    startCreatingCategory, 
    startFilteringCategoriesByStatus, 
    startGettingCategories, 
    startUpdatingCategory, 
    startUploadingCategoryImage 
} from "../../store/categories/categories.thunk"
import type { CreateCategory, UpdateCategory } from "../../interfaces/category.interface"
import { setCategorySelected, setPage, setStatusFilter } from "../../store/categories/categories.slice"

export const useCategories = () => {

    const dispatch = useDispatch<any>() 
    const { 
        categories, 
        categorySelected, 
        isLoading, 
        pagination,
        filter 
    } = useSelector( (state: RootState) => state.categories )

    const getCategories = () => {
        dispatch( startGettingCategories({ page: 1, limit: 10 }) )
    }

    const filterCategoriesByStatus = ( status: boolean ) => {
        dispatch( setStatusFilter(status) )
        dispatch(startFilteringCategoriesByStatus({ page: 1, limit: 10}, status))
    }

    const onSetFilterStatus = (status: boolean | null) => {
        dispatch( setStatusFilter(status) )
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

    const onSetPage = ( page: number ) => {
         dispatch(setPage(page))

        if (filter.status !== null) {
            dispatch(startFilteringCategoriesByStatus({ page, limit: 10 }, filter.status))
        } else {
            dispatch(startGettingCategories({ page, limit: 10 }))
        }
    }

    return {
        categorySelected,
        categories,
        isLoading,
        pagination,
        filter,

        onSelectCategory,
        getCategories,
        createCategory,
        updateCategory,
        uploadCategoryIcon,
        changeCategoryStatus,
        filterCategoriesByStatus,
        onSetPage,
        onSetFilterStatus
    }
}