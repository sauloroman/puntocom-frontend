import type { Dispatch } from "@reduxjs/toolkit"
import { addCategory, setAllCategories, setCategories, setCategoriesMetaPagination, setCategorySelected, setIsLoading, updateCategory } from "./categories.slice"
import { puntocomApiPrivate } from "../../config/api/puntocom.api"
import type { Pagination } from "../../interfaces/dto/pagination.interface"
import { 
    type ChangeCategoryStatus, 
    type CategoryResponse, 
    type CreateCategory, 
    type CreateCategoryResponse, 
    type UpdateCategory, 
    type UpdateCategoryResponse, 
    type UploadCategoryImage, 
    type GetAllCategoriesResponse
} from "../../interfaces/dto/category.interface"
import { showAlert } from "../alert/alert.slice"
import { handleError } from "../../config/api/handle-error"
import { AlertType } from "../../interfaces/ui/alert.interface"
import type { RootState } from "../store"

const urlCategories = '/api/category'

export const startGettingAllCategories = () => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.get<GetAllCategoriesResponse>(urlCategories)
            const { categories } = data
            dispatch(setAllCategories(categories))
        } catch(error) {
            console.log(error)
        } finally {
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startFilteringCategories = (
    status?: string,
    categoryName?: string,
    pagination?: Pagination
) => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch(setIsLoading(true))
        try {

            const { pagination: { itemsPerPage } } = getState().categories

            const params: any = {
                page: pagination?.page.toString() ?? '1',
                limit: pagination?.limit.toString() ?? itemsPerPage.toString()
            }

            if ( status ) {
                params['status'] = status === 'Activo' ? 1 : 0
            }

            if ( categoryName ) {
                params['categoryName'] = categoryName.trim()
            }

            const { data } = await puntocomApiPrivate.get<CategoryResponse>(`${urlCategories}/filter`, { params })
            const { categories, meta } = data

            const { filter, ...restPagination } = meta

            dispatch(setCategories(categories))
            dispatch(setCategoriesMetaPagination({...restPagination, itemsPerPage }))

        } catch( error ) {
            dispatch(showAlert({
                title: '⚠️ Error filtrando categorías',
                text: 'No fue posible filtrar las categorías',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
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
            dispatch(setCategorySelected(category))
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

export const startUploadingCategoryImage = ( categoryId: string, files: FormData ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {

            const { data } = await puntocomApiPrivate.patch<UploadCategoryImage>(
                `${urlCategories}/upload-image/${categoryId}`, 
                files, 
                { headers: { "Content-Type": "multipart/form-data"}}
            )
            const { category, message } = data

            dispatch(updateCategory({categoryId, category}))
            dispatch(setCategorySelected(category))
            dispatch(
                showAlert({
                    title: "Imagen Subida",
                    text: message,
                    type: AlertType.success,
                })
            );
        } catch(error) {
            dispatch(
                showAlert({
                    title: "⚠️ Error imagen categoría",
                    text: "No se pudo subir la imagen",
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startChangingCategoryStatus = ( categoryId: string, status: boolean ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading(true) )
        try {

            const { data } = await puntocomApiPrivate.patch<ChangeCategoryStatus>(
                `${urlCategories}/${status ? 'activate' : 'deactivate'}/${categoryId}`)
            const { category, message } = data

            dispatch(updateCategory({categoryId, category}))
            dispatch(setCategorySelected(category))
            dispatch(
                showAlert({
                    title: "Cambio de estado",
                    text: message,
                    type: AlertType.success,
                })
            );

        } catch(error) {
            dispatch(
                showAlert({
                    title: `⚠️ Error cambio estado categoría`,
                    text: `No se pudo ${status ? 'activar' : 'desactivar'} la categoría`,
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch( setIsLoading(false) )
        }
    }
}