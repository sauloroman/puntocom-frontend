import type { Dispatch } from "@reduxjs/toolkit"
import { addSupplier, setCompanies, setIsLoading, setSuppliers, setSuppliersMetaPagination } from "./supplier.slice"
import type { Pagination } from "../../interfaces/pagination.interface"
import { puntocomApiPrivate } from "../../config/api/puntocom.api"
import { 
    type CreateSupplierResponse, 
    type CreateSupplier, 
    type GetSuppliersResponse, 
    type GetUniqueCompaniesSupplier
} from "../../interfaces/supplier.interface"
import { showAlert } from "../alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"

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
            dispatch(setSuppliersMetaPagination(meta))


        } catch(error) {
            console.log(error)
        } finally {
            dispatch(setIsLoading(false))
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