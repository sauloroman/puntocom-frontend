export interface GenerateReportResponse {
  ok: boolean,
  message: string,
  url: string
}

export interface GetAllReports {
  ok: boolean,
  reports: Reports
}

export interface Reports {
  users: ReportItem[],
  products: ReportItem[],
  suppliers: ReportItem[],
  purchases: ReportItem[],
  inventoryAdjustments: ReportItem[]
}

export interface ReportItem {
  id: string,
  date: string
}