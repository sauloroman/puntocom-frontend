import React, { useEffect } from 'react'
import { FiShoppingBag, FiBarChart2, FiTrendingUp, FiTrendingDown } from 'react-icons/fi'
import { useDashboard } from '../../../../shared/hooks'
import { formatMoney } from '../../../../shared/helpers'
import { TopKpiCard } from '../general/components'
import {
    PurchasesDateChart,
    PurchasesBySupplierList,
    PurchasesByCategoryList,
    TopPurchasedProductsList,
} from './components'

export const DashboardPurchases: React.FC = () => {
    const { stats, getPurchasesStats } = useDashboard()

    useEffect(() => {
        if (!stats?.purchasesStats) getPurchasesStats()
    }, [])

    const p = stats?.purchasesStats

    return (
        <div className='min-h-screen flex flex-col gap-4'>

            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
                <TopKpiCard
                    title='Total de órdenes'
                    value={p?.purchaseSummary.totalOrders ?? '—'}
                    subtitle='Órdenes registradas'
                    icon={<FiShoppingBag size={18} />}
                    accent='indigo'
                />
                <TopKpiCard
                    title='Ticket promedio'
                    value={p ? formatMoney(p.purchaseSummary.averageOrderValue, true) : '—'}
                    subtitle='Valor medio por orden'
                    icon={<FiBarChart2 size={18} />}
                    accent='emerald'
                />
                <TopKpiCard
                    title='Compra máxima'
                    value={p ? formatMoney(p.purchaseSummary.maxOrderValue, true) : '—'}
                    subtitle='Orden de mayor valor'
                    icon={<FiTrendingUp size={18} />}
                    accent='amber'
                />
                <TopKpiCard
                    title='Compra mínima'
                    value={p ? formatMoney(p.purchaseSummary.minOrderValue, true) : '—'}
                    subtitle='Orden de menor valor'
                    icon={<FiTrendingDown size={18} />}
                    accent='rose'
                />
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
                <PurchasesDateChart data={p?.purchasesByDate ?? []} />
                <PurchasesBySupplierList suppliers={p?.purchasesBySupplier ?? []} />
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
                <PurchasesByCategoryList categories={p?.purchasesByCategory ?? []} />
                <TopPurchasedProductsList products={p?.topPurchasedProducts ?? []} />
            </div>

        </div>
    )
}