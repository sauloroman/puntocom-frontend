import type { Dispatch } from "@reduxjs/toolkit"
import { deleteReport, setAllReports, setIsLoading, setListReport, setReportIdSelected, setUrlReportSelected, type ReportEntities } from "./reports.slice"
import { puntocomApiPrivate } from "../../config/api/puntocom.api"
import type { GetAllReports, GenerateReportResponse } from "../../interfaces/dto/report.interface"
import { extractIdFromPath } from "../../shared/helpers/get-pdf-id"
import { showAlert } from "../alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"

const url = '/api/report'

export const startGeneratingReport = (type: 'users' | 'suppliers' | 'products' | 'inventoryAdjustments') => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.get<GenerateReportResponse>(`${url}/list/${type}`)
            const { url: urlReport } = data
            const pdfId = extractIdFromPath(urlReport)
            
            dispatch(setListReport({ type: 'users', url: pdfId! }))
            
            const { data: dataPdf } = await puntocomApiPrivate.get(
                `${url}/${type}/${pdfId}?download="true"`, 
                {
                responseType: "blob",
            })

            const file = new Blob([dataPdf], { type: "application/pdf" })
            const fileURL = URL.createObjectURL(file)
            window.open(fileURL, '_blank')

            const {data: {reports}} = await puntocomApiPrivate.get<GetAllReports>(`${url}/all`)
            dispatch(setAllReports(reports))

            dispatch(
                showAlert({
                    title: "Reporte",
                    text: 'El reporte ha sido generado',
                    type: AlertType.success,
                })
            );
        } catch (error) {
            console.log(error)
            dispatch(
                showAlert({
                    title: "⚠️ Error Reporte",
                    text: 'No se pudo crear el reporte',
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startGettingReportById = ( type: ReportEntities, reportId: string ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {

            const { data: dataPdf } = await puntocomApiPrivate.get(
                `${url}/${type}/${reportId}?download="true"`, 
                {
                responseType: "blob",
            })

            const file = new Blob([dataPdf], { type: "application/pdf" })
            const fileURL = URL.createObjectURL(file)

            dispatch(setUrlReportSelected(fileURL));
            window.open(fileURL, '_blank')

        } catch(error) {
            console.log(error)
            dispatch(
                showAlert({
                    title: "⚠️ Error Reportes",
                    text: 'No se pudieron obtener el reporte por id',
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startGettingAllReports = () => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {

            const {data} = await puntocomApiPrivate.get<GetAllReports>(`${url}/all`)
            const { reports } = data
            dispatch(setAllReports(reports))

        } catch(error) {
            console.log(error)
            dispatch(
                showAlert({
                    title: "⚠️ Error Reportes",
                    text: 'No se pudieron obtener los reportes',
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startDeletingReport = ( entity: ReportEntities, reportId: string ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            
            const { data: { message } } = await puntocomApiPrivate.delete(`${url}/${entity}/${reportId}`);
            
            dispatch(
                showAlert({
                    title: "Reporte Eliminado",
                    text: message,
                    type: AlertType.success,
                })
            );

            dispatch(deleteReport({type: entity, reportId}))
            dispatch(setReportIdSelected(''))

        } catch( error ) {
            console.log(error)   
            dispatch(
                showAlert({
                    title: "⚠️ Error Reportes",
                    text: 'No se pudo borrar el reporte',
                    type: AlertType.error,
                })
            )
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}