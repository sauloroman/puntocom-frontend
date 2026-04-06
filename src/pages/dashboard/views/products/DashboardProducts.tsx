import React, { useEffect } from 'react'
import { TbArrowsTransferDown, TbArrowUp, TbArrowDown, TbPackage } from 'react-icons/tb'
import { useDashboard } from '../../../../shared/hooks'
import { TopKpiCard } from '../general/components'
import {
    ProductsCriticalStockList,
    ProductsByCategoryChart,
    ProductsMostAdjustedChart,
} from './components'

export const DashboardProducts: React.FC = () => {
    const { stats, getProductsStats } = useDashboard()

    useEffect(() => {
        if (!stats?.productsStats) getProductsStats()
    }, [])

    const p = stats?.productsStats
    const s = p?.inventoryAdjustmentSummary

    return (
        <div className='min-h-screen flex flex-col gap-4'>

            {/* KPIs — ajustes de inventario */}
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
                <TopKpiCard
                    title='Total ajustes'
                    value={s?.totalAdjustments ?? '—'}
                    subtitle='Movimientos registrados'
                    icon={<TbArrowsTransferDown size={18} />}
                    accent='indigo'
                />
                <TopKpiCard
                    title='Ajustes de entrada'
                    value={s?.totalEntradas ?? '—'}
                    subtitle='Órdenes de entrada'
                    icon={<TbArrowUp size={18} />}
                    accent='emerald'
                />
                <TopKpiCard
                    title='Ajustes de salida'
                    value={s?.totalSalidas ?? '—'}
                    subtitle='Órdenes de salida'
                    icon={<TbArrowDown size={18} />}
                    accent='rose'
                />
                <TopKpiCard
                    title='Unidades añadidas'
                    value={s?.totalUnitsAdded ?? '—'}
                    subtitle={`${s?.totalUnitsRemoved ?? '—'} unidades retiradas`}
                    icon={<TbPackage size={18} />}
                    accent='amber'
                />
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
                <ProductsByCategoryChart categories={p?.productsByCategory ?? []} />
                <ProductsMostAdjustedChart products={p?.productsMostAdjusted ?? []} />
            </div>

            <ProductsCriticalStockList products={p?.productsCritialStock ?? []} />
        </div>
    )
}