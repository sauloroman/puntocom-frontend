import type { Dispatch } from "@reduxjs/toolkit"
import { addCategory, setCategories, setIsLoading, updateCategory } from "./categories.slice"
import { puntocomApiPrivate } from "../../config/api/puntocom.api"
import type { Pagination } from "../../interfaces/pagination.interface"
import { type CategoryResponse, type CreateCategory, type CreateCategoryResponse, type UpdateCategory, type UpdateCategoryResponse } from "../../interfaces/category.interface"
import { showAlert } from "../alert/alert.slice"
import { handleError } from "../../config/api/handle-error"
import { AlertType } from "../../interfaces/ui/alert.interface"

const urlCategories = '/api/category'

export const startGettingCategories = (pagination: Pagination) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        const { limit, page } = pagination
        try {

            const { data } = await puntocomApiPrivate.get<CategoryResponse>(`${urlCategories}?page=${page}&limit=${limit}&sort=categoryCreatedAt:desc`)
            const { categories, meta } = data
            dispatch( setCategories(categories) )

        } catch(error) {
            console.log(error)
        } finally {
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startCreatingCategory = ( createCategoryData: CreateCategory ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.post<CreateCategoryResponse>(urlCategories, createCategoryData)
            const { category, message } = data

            dispatch(addCategory(category))
            dispatch(
                showAlert({
                    title: createCategoryData.name,
                    text: message,
                    type: AlertType.success,
                })
            );
        } catch( error ) {
            const errorMessage = handleError(error)
            dispatch(
                showAlert({
                    title: "⚠️ No se pudo crear la categoría",
                    text: errorMessage,
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startUpdatingCategory = ( categoryId: string, categoryData: UpdateCategory ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.put<UpdateCategoryResponse>(`${urlCategories}/${categoryId}`, categoryData)
            const { category, message } = data

            dispatch(updateCategory({
                categoryId: categoryId,
                category: category,
            }))

            dispatch(
                showAlert({
                    title: category.name,
                    text: message,
                    type: AlertType.success,
                })
            );
        } catch(error) {
            const errorMessage = handleError(error)
            dispatch(
                showAlert({
                    title: "⚠️ No se pudo actualizar la categoría",
                    text: errorMessage,
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}