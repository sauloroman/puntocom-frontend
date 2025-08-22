import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { startGettingCategories } from "../../store/categories/categories.thunk"

export const useCategories = () => {

    const dispatch = useDispatch<any>() 
    const { categories, isLoading } = useSelector( (state: RootState) => state.categories )

    const getCategories = () => {
        dispatch( startGettingCategories({ page: 1, limit: 10 }) )
    }

    return {
        categories,
        isLoading,

        getCategories
    }
}