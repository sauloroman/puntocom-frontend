import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { startCreatingCategory, startGettingCategories, startUpdatingCategory } from "../../store/categories/categories.thunk"
import type { CreateCategory, UpdateCategory } from "../../interfaces/category.interface"
import { setCategorySelected } from "../../store/categories/categories.slice"

export const useCategories = () => {

    const dispatch = useDispatch<any>() 
    const { categories, categorySelected, isLoading } = useSelector( (state: RootState) => state.categories )

    const getCategories = () => {
        dispatch( startGettingCategories({ page: 1, limit: 9 }) )
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

    return {
        categorySelected,
        categories,
        isLoading,

        onSelectCategory,
        getCategories,
        createCategory,
        updateCategory
    }
}