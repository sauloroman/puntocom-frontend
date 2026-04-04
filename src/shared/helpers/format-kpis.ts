import type { ChartDataPoint } from "../../interfaces/dto/dashboard.interface";

interface DateTotal { date: string; total: number }

export const formatMoney = (n: number, currency = false): string =>
    currency
    ? `$${n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : n.toLocaleString('es-MX')

export const mergeSalesPurchasesData = ( 
    salesByDate: DateTotal[] = [], 
    purchasesByDate: DateTotal[] = [] 
): ChartDataPoint[] => {
  
    const map = new Map<string, ChartDataPoint>()

    salesByDate.forEach(({ date, total }) => {
        map.set(date, { date, sales: total, purchases: 0 })
    })

    purchasesByDate.forEach(({ date, total }) => {
        const existing = map.get(date)
        if (existing) {
            existing.purchases = total
        } else {
            map.set(date, { date, sales: 0, purchases: total })
        }
    })

    console.log(map)

    return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date))
}

export const calcMargin = (profit: number, sales: number): number => Math.round((profit / sales) * 100)