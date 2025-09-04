import type { Dispatch } from "@reduxjs/toolkit"
import { addSupplier, setCompanies, setIsLoading, setReport, setSuppliers, setSupplierSelected, setSuppliersMetaPagination, updateSupplier } from "./supplier.slice"
import type { Pagination } from "../../interfaces/pagination.interface"
import { puntocomApiPrivate } from "../../config/api/puntocom.api"
import { 
    type CreateSupplierResponse, 
    type CreateSupplier, 
    type GetSuppliersResponse, 
    type GetUniqueCompaniesSupplier,
    type ChangeSupplierStatusResponse,
    type CreateSuppliersReportResponse,
    type UpdateSupplier,
    type UpdateSupplierResponse
} from "../../interfaces/supplier.interface"
import { showAlert } from "../alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"
import { handleError } from "../../config/api/handle-error"

const urlSuppliers = '/api/supplier'

export const startGettingSuppliers = ( pagination: Pagination ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            
            const { page, limit } = pagination
            
            const {data} = await puntocomApiPrivate.get<GetSuppliersResponse>(`${urlSuppliers}?page=${page}&limit=${limit}&sort=supplierCreatedAt:desc`)

            const { data: {companies}} = await puntocomApiPrivate.get<GetUniqueCompaniesSupplier>(`${urlSuppliers}/companies`)

            const { meta, suppliers } = data

            dispatch(setSuppliers(suppliers))
            dispatch(setCompanies(companies))
            dispatch(setSuppliersMetaPagination({...meta, itemsPerPage: 10}))


        } catch(error) {
            console.log(error)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startSearchingSuppliers = ( supplierSearched: string ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading(true ) )
        try {
            
            const {data} = await puntocomApiPrivate.get<GetSuppliersResponse>(`${urlSuppliers}/search?sort=supplierName:asc&filter={"supplierName": "${supplierSearched}"}`)

            const { suppliers } = data
            dispatch(setSuppliers(suppliers))

        } catch(error) {
            console.log(error)
        } finally {
            dispatch( setIsLoading(false) )
        }
    }
}

export const startFilteringSuppliersByStatus = ( pagination: Pagination, status: boolean) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const { limit, page } = pagination
            
            const { data } = await puntocomApiPrivate.get<GetSuppliersResponse>(`${urlSuppliers}?page=${page}&limit=${limit}&sort=supplierName:asc&filter={"supplierStatus": ${status}}`)

            const { meta, suppliers } = data

            dispatch(setSuppliers(suppliers))
            dispatch(setSuppliersMetaPagination({...meta, itemsPerPage: 10}))

        } catch(error) {
            console.log(error)
        } finally {   
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startFilteringSuppliersByCompany = ( pagination: Pagination, company: string) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const { limit, page } = pagination
            
            const { data } = await puntocomApiPrivate.get<GetSuppliersResponse>(`${urlSuppliers}?page=${page}&limit=${limit}&sort=supplierCreatedAt:desc&filter={"supplierCompany": "${company}"}`)

            const { meta, suppliers } = data

            dispatch(setSuppliers(suppliers))
            dispatch(setSuppliersMetaPagination({...meta, itemsPerPage: 10}))

        } catch(error) {
            console.log(error)
        } finally {   
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startCreatingSupplier = ( createSupplierData: CreateSupplier ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {

            const { data } = await puntocomApiPrivate.post<CreateSupplierResponse>(urlSuppliers, createSupplierData)
            const { supplier } = data

            dispatch(addSupplier(supplier))
            dispatch(showAlert({
                title: 'Creación de Proveedor',
                text: `${createSupplierData.name} ${createSupplierData.lastname}`,
                type: AlertType.success
            }))

        } catch( error ) {
            dispatch(
                showAlert({
                    title: "⚠️ Error proveedor",
                    text: 'No se pudo crear el proveedor',
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(true))
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
            dispatch(
                showAlert({
                    title: `⚠️ Error cambio estado proveedor`,
                    text: `No se pudo ${status ? 'activar' : 'desactivar'} el proveedor`,
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading( false ))
        }
    }
}

export const startCreatingReport = () => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ))
        try {
            const { data } = await puntocomApiPrivate.get<CreateSuppliersReportResponse>(`${urlSuppliers}/report/generate`)
            const { message, url } = data
            dispatch( setReport( url ) )
            dispatch(showAlert({
                title: 'Reporte generado',
                text: message,
                type: AlertType.success
            }))
        } catch( error ){
            console.log(error)
            dispatch(showAlert({
                title: 'Error Reporte',
                text: 'No se pudo generar el reporte',
                type: AlertType.error
            }))
        } finally {
            dispatch( setIsLoading( false ))
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