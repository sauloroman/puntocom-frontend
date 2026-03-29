import { 
    addSupplier, 
    setAllSuppliers, 
    setCompanies, 
    setIsLoading, 
    setSuppliers, 
    setSupplierSelected, 
    setSuppliersMetaPagination, 
    updateSupplier 
} from "./supplier.slice"
import { puntocomApiPrivate } from "../../config/api/puntocom.api"
import { showAlert } from "../alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"
import { handleError } from "../../config/api/handle-error"
import type { Dispatch } from "@reduxjs/toolkit"
import type { Pagination } from "../../interfaces/dto/pagination.interface"
import { 
    type CreateSupplierResponse, 
    type CreateSupplier, 
    type GetSuppliersResponse, 
    type GetUniqueCompaniesSupplier,
    type ChangeSupplierStatusResponse,
    type UpdateSupplier,
    type UpdateSupplierResponse,
    type GetAllSuppliers
} from "../../interfaces/dto/supplier.interface"
import type { RootState } from "../store"

const urlSuppliers = '/api/supplier'

export const startGettingAllSuppliers = () => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            
            const {data} = await puntocomApiPrivate.get<GetAllSuppliers>(urlSuppliers)
            const { suppliers } = data
            dispatch(setAllSuppliers(suppliers))

        } catch(error) {
            dispatch(showAlert({
                title: '⚠️ Error obteniendo los proveedores',
                text: 'No fue posible obtener todos los proveedores',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startGettingUniqueCompanies = () => {
    return async ( dispatch: Dispatch ) => {
         dispatch(setIsLoading(true))
        try {
            const { data: {companies}} = await puntocomApiPrivate.get<GetUniqueCompaniesSupplier>(`${urlSuppliers}/companies`)
            dispatch(setCompanies(companies))
        } catch(error) {
            dispatch(showAlert({
                title: '⚠️ Error obteniendo las empresas',
                text: 'No fue posible obtener las empresas de los proveedores',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startFilteringSuppliers = ( 
    status?: string,
    company?: string,
    supplierName?: string,
    pagination?: Pagination
) => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch(setIsLoading(true))
        try {

            const { pagination: { itemsPerPage } } = getState().suppliers

            const params: any = {
                page: pagination?.page.toString() ?? '1',
                limit: pagination?.limit.toString() ?? itemsPerPage.toString()
            }

            if ( status ) {
                params['status'] = status === 'Activo' ? 1 : 0
            }

            if ( supplierName ) {
                params['supplierName'] = supplierName.trim()
            }
            
            if ( company ) {
                params['company'] = company.trim()
            }

            const { data } = await puntocomApiPrivate.get<GetSuppliersResponse>(`${urlSuppliers}/filter`, { params })
            const { meta, suppliers } = data

            const { filter, ...restPagination } = meta

            dispatch(setSuppliers(suppliers))
            dispatch(setSuppliersMetaPagination({ ...restPagination, itemsPerPage }))

        } catch( error ) {
            dispatch(showAlert({
                title: '⚠️ Error filtrando proveedores',
                text: 'No fue posible filtrar los proveedores',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startCreatingSupplier = ( createSupplierData: CreateSupplier ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {

            const { data: {supplier}} = await puntocomApiPrivate.post<CreateSupplierResponse>(urlSuppliers, createSupplierData)
            const { data: {companies}} = await puntocomApiPrivate.get<GetUniqueCompaniesSupplier>(`${urlSuppliers}/companies`)
            
            dispatch(setCompanies(companies))
            dispatch(addSupplier(supplier))
            dispatch(showAlert({
                title: 'Creación de Proveedor',
                text: `${createSupplierData.name} ${createSupplierData.lastname}`,
                type: AlertType.success
            }))

        } catch( error ) {
            const errorMessage = handleError(error)
            dispatch( showAlert({
                title: "⚠️ Error al crear proveedor",
                text: errorMessage,
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startChangingSupplierStatus = ( supplierId: string, status: boolean ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading( true ))
        try {
            
            const { data } = await puntocomApiPrivate.patch<ChangeSupplierStatusResponse>(`${urlSuppliers}/${status ? 'activate' : 'deactivate'}/${supplierId}`)

            const { message, supplier } = data

            dispatch(updateSupplier({ supplierId, supplier }))
            dispatch(setSupplierSelected(supplier))
            dispatch(showAlert({
                title: 'Cambio de estado',
                text: message,
                type: AlertType.success 
            }))

        } catch(error) {
            dispatch(showAlert({
                title: `⚠️ Error cambio estado proveedor`,
                text: `No se pudo ${status ? 'activar' : 'desactivar'} el proveedor`,
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading( false ))
        }
    }
}

export const startUpdatingSupplier = (supplierId: string, supplierData: UpdateSupplier) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {

            const { data } = await puntocomApiPrivate.put<UpdateSupplierResponse>(`${urlSuppliers}/${supplierId}`, supplierData)

            const { message, supplier } = data

            dispatch(updateSupplier({
                supplierId: supplierId,
                supplier: supplier
            }))
            dispatch(setSupplierSelected(supplier))
            dispatch(
                showAlert({
                    title: `${supplier.name} ${supplier.lastname}`,
                    text: message,
                    type: AlertType.success
                })
            )
        } catch(error) {
            const errorMessage = handleError(error)
            dispatch(
                showAlert({
                    title: '⚠️ No se pudo actualizar el proveedor',
                    text: errorMessage,
                    type: AlertType.error
                })
            )
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}