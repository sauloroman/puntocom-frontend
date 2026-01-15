import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts'
import { useTheme } from '../../../shared/hooks'

interface Props {
    data: {
        userId: string
        userName: string
        percentage: number
    }[]
}

const COLORS = [
    '#6366F1',
    '#22C55E',
    '#F59E0B',
    '#EF4444',
    '#06B6D4',
    '#A855F7' 
]

export const SalesByUserDonutChart: React.FC<Props> = ({ data }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    if (!data.length) {
        return (
            <div className={`flex items-center justify-center h-64 rounded-xl border 
                ${isDark ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                No hay datos de ventas
            </div>
        )
    }

    return (
        <div
            className={`rounded-xl p-5 border shadow-sm
            ${isDark
                ? 'bg-gray-900 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
        >
            <h3 className={`text-lg font-semibold mb-4
                ${isDark ? 'text-gray-100' : 'text-gray-800'}`}
            >
                Porcentaje de ventas por usuario
            </h3>

            <div className="w-full h-64">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="percentage"
                            nameKey="userName"
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={80}
                            paddingAngle={3}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value) => {
                                if (typeof value === 'number') {
                                    return `${value}%`
                                }
                                return value
                            }}
                            contentStyle={{
                                backgroundColor: isDark ? '#111827' : '#ffffff',
                                borderColor: isDark ? '#374151' : '#e5e7eb',
                                color: isDark ? '#f9fafb' : '#111827',
                                borderRadius: '0.5rem'
                            }}
                        />

                        <Legend
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            formatter={(value) => (
                                <span className={isDark ? 'text-white' : 'text-gray-700'}>
                                    {value}
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
