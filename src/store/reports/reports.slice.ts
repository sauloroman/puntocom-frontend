import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Reports } from "../../interfaces/report.interface";

export type ReportEntities = 'users' | 'suppliers' | 'products' | 'purchases' | 'inventoryAdjustments'

interface ReportsStateI {
    isLoading: boolean,
    users: {
        listReport: string,
    },
    suppliers: {
        listReport: string,
    },
    products: {
        listReport: string,
    },
    purchases: {    
        listReport: string,
    },
    inventoryAdjustments: {
        listReport: string,
    },
    allReports: Reports | null,
    selectedReports: ReportEntities,
    reportIdSelected: string,
    urlReportSelected: string,
}

const initialState: ReportsStateI = {
    isLoading: false,
    users: {
        listReport: ''
    },
    suppliers: {
        listReport: ''
    },
    products: {
        listReport: ''
    },
    purchases: {
        listReport: '',
    },
    inventoryAdjustments: {
        listReport: '',
    },
    allReports: null,
    selectedReports: 'users',
    reportIdSelected: '',
    urlReportSelected: ''
}

export const reportsSlice = createSlice({
    name: 'reports',
    initialState: initialState,
    reducers: {

        setListReport: ( state, { payload }: PayloadAction<{ type: ReportEntities, url: string }>) => {
            state[payload.type].listReport = payload.url
        },

        setIsLoading: ( state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload
        },
        
        setAllReports: ( state, { payload }: PayloadAction<Reports>) => {
            state.allReports = payload
        },

        setSelectedReports: (state, {payload}: PayloadAction<ReportEntities>) => {
            state.selectedReports = payload
        },

        setUrlReportSelected: (state, {payload}: PayloadAction<string>) => {
            state.urlReportSelected = payload
        },

        setReportIdSelected: (state, {payload}: PayloadAction<string>) => {
            state.reportIdSelected = payload
        },

        deleteReport: (state, {payload}: PayloadAction<{ type: ReportEntities, reportId: string }>) => {
            if (!state.allReports) return;
            state.allReports[payload.type] = state.allReports[payload.type].filter(repo => repo.id !== payload.reportId);
        }

    }
})

export const {
    setListReport,
    setIsLoading,
    setAllReports,
    setSelectedReports,
    setUrlReportSelected,
    setReportIdSelected,
    deleteReport
} = reportsSlice.actions 