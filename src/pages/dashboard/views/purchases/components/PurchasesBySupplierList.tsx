import React from 'react'
import { TbBuildingWarehouse } from 'react-icons/tb'
import { useTheme } from '../../../../../shared/hooks'
import { formatMoney } from '../../../../../shared/helpers'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { HeaderBox } from '../../sales/components'

interface SupplierStat {
    supplierId: string
    supplierName: string
    supplierLastname: string
    supplierCompany: string
    totalPurchases: number
    ordersCount: number
    percentage: number
}

interface PurchasesBySupplierListProps {
    suppliers: SupplierStat[]
}

const PALETTE = [
    '#7c3aed', '#a78bfa', '#5b21b6', '#c4b5fd',
    '#4c1d95', '#ddd6fe', '#6d28d9', '#ede9fe',
]

export const PurchasesBySupplierList: React.FC<PurchasesBySupplierListProps> = ({ suppliers }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const tooltipBg = isDark ? '#111827' : '#fff'
    const tooltipBorder = isDark ? '#374151' : '#e5e7eb'
    const tooltipLabel = isDark ? '#e5e7eb' : '#374151'
    const tooltipMuted = isDark ? '#9ca3af' : '#6b7280'

    const chartData = suppliers.map((s) => ({
        name: s.supplierName,
        lastname: s.supplierLastname,
        company: s.supplierCompany,
        totalPurchases: s.totalPurchases,
        ordersCount: s.ordersCount,
        percentage: s.percentage,
        original: s,
    }))

    return (
        <div
            className={`
                rounded-xl border p-5 flex flex-col gap-4
                ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
            `}
        >
            <HeaderBox>
                <TbBuildingWarehouse size={15} />
                Compras por proveedor
            </HeaderBox>

            {suppliers.length > 0 ? (
                <div className='flex items-center gap-4'>

                    <div className='shrink-0 w-[140px] h-[140px]'>
                        <ResponsiveContainer width='100%' height='100%'>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx='50%'
                                    cy='50%'
                                    innerRadius={42}
                                    outerRadius={66}
                                    paddingAngle={2}
                                    dataKey='totalPurchases'
                                    strokeWidth={0}
                                >
                                    {chartData.map((_, i) => (   
                                        <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (!active || !payload?.length) return null
                                        const d = payload[0].payload.original as SupplierStat
                                        return (
                                            <div style={{
                                                backgroundColor: tooltipBg,
                                                border: `1px solid ${tooltipBorder}`,
                                                borderRadius: 8,
                                                padding: '8px 12px',
                                                fontSize: 12,
                                            }}>
                                                <p style={{ color: tooltipLabel, fontWeight: 600, marginBottom: 4 }}>
                                                    {d.supplierCompany}
                                                </p>
                                                <p style={{ color: tooltipMuted }}>
                                                    Total: <span style={{ color: tooltipLabel, fontWeight: 600 }}>
                                                        {formatMoney(d.totalPurchases, true)}
                                                    </span>
                                                </p>
                                                <p style={{ color: tooltipMuted }}>
                                                    Órdenes: <span style={{ fontWeight: 600 }}>{d.ordersCount}</span>
                                                </p>
                                                <p style={{ color: tooltipMuted }}>
                                                    Participación: <span style={{ fontWeight: 600 }}>{d.percentage.toFixed(1)}%</span>
                                                </p>
                                            </div>
                                        )
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='flex flex-col gap-2.5 flex-1 min-w-0'>
                        {suppliers.map((s, i) => (
                            <div key={s.supplierId} className='flex items-center gap-2 min-w-0'>
                                <span
                                    className='w-2.5 h-2.5 rounded-full shrink-0'
                                    style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
                                />
                                <div className='flex items-center justify-between gap-2 flex-1 min-w-0'>
                                    <div className='min-w-0'>
                                        <p className={`text-sm font-medium truncate leading-tight ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                            {s.supplierName + ' ' + s.supplierLastname }
                                        </p>
                                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {s.ordersCount} orden{s.ordersCount !== 1 ? 'es' : ''}
                                        </p>
                                    </div>
                                    <div className='text-right shrink-0'>
                                        <p className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                                            {formatMoney(s.totalPurchases, true)}
                                        </p>
                                        <p className={`text-xs ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>
                                            {s.percentage.toFixed(1)}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className={`text-sm text-center py-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    Sin datos de proveedores
                </p>
            )}
        </div>
    )
}