import type { Dispatch } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { setCategories, setIsLoading } from "./categories.slice"
import { puntocomApiPrivate } from "../../config/api/puntocom.api"
import type { Pagination } from "../../interfaces/pagination.interface"
import { type CategoryResponse } from "../../interfaces/category.interface"

const urlCategories = '/api/category'

export const startGettingCategories = (pagination: Pagination) => {
    return async ( dispatch: Dispatch, state: RootState ) => {
        console.log('Petición')
        dispatch( setIsLoading( true ) )
        const { limit, page } = pagination
        try {

            const { data } = await puntocomApiPrivate.get<CategoryResponse>(`${urlCategories}?page=${page}&limit=${limit}&sort=categoryCreatedAt`)
            const { categories, meta } = data
            dispatch( setCategories(categories) )

        } catch(error) {
            console.log(error)
        }
        dispatch( setIsLoading( false ) )
    }
}