import React from 'react'
import { FiBox } from "react-icons/fi";
import { useTheme } from '../../../../../shared/hooks'
import { formatMoney } from '../../../../../shared/helpers'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'

interface TopProduct {
    productId: string
    productName: string
    quantitySold: number
    totalGenerated: number
}

interface TopProductsListProps {
    products: TopProduct[]
}

export const TopProductsList: React.FC<TopProductsListProps> = ({ products }) => {

    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <div
            className={`
                rounded-xl border p-5 flex flex-col gap-3
                ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
            `}
        >
            <p className={`text-lg flex items-center gap-3 font-bold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                <FiBox size={15} />
                Productos más vendidos
            </p>

            {products.length > 0 ? (
                <div className="h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={products} barSize={35}>
                            
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={isDark ? '#444' : '#ddd'}
                                vertical={false}
                            />

                            <XAxis
                                dataKey="productName"
                                interval={0}
                                angle={-25}
                                textAnchor="end"
                                height={50} 
                                tick={{ fontSize: 10 }}
                                tickFormatter={(value) =>
                                    value.length > 10 ? value.substring(0, 10) + '…' : value
                                }
                            />

                            <YAxis
                                stroke={isDark ? '#aaa' : '#444'}
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(v) => `$${v.toLocaleString()}`}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1f2937' : '#fff',
                                    borderRadius: '8px',
                                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
                                }}
                                labelStyle={{ color: isDark ? '#e5e7eb' : '#374151' }}
                                formatter={(value) => formatMoney(Number(value), true)}
                            />

                            <Bar
                                dataKey="totalGenerated"
                                radius={[8, 8, 0, 0]}
                                fill={isDark ? '#10b981' : '#059669'}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p className={`text-sm text-center py-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    Sin datos
                </p>
            )}
        </div>
    )
}
