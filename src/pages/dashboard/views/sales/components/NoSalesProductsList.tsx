import React, { useState } from 'react'
import { IoIosTrendingDown } from "react-icons/io";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useTheme } from '../../../../../shared/hooks'
import { HeaderBox } from './HeaderBox'

interface NoSalesProduct {
    productId: string
    productName: string
    stock: number
}

interface NoSalesProductsListProps {
    products: NoSalesProduct[]
}

const PREVIEW_COUNT = 5

export const NoSalesProductsList: React.FC<NoSalesProductsListProps> = ({ products }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [expanded, setExpanded] = useState(false)

    const visible = expanded ? products : products.slice(0, PREVIEW_COUNT)
    const hasMore = products.length > PREVIEW_COUNT

    if (!products.length) return null

    return (
        <div
            className={`
                rounded-xl border p-5
                ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
            `}
        >
            <HeaderBox>
                <IoIosTrendingDown size={15} />
                Productos sin ventas
            </HeaderBox>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
                {visible.map((p) => (
                    <div
                        key={p.productId}
                        className={`
                                group rounded-xl p-4 flex items-start gap-3 border transition-all
                                ${isDark
                                ? 'bg-gray-800/40 border-gray-700 hover:bg-gray-800 hover:border-gray-600'
                                : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                        }
                `}
            >
                        <div className='flex-1 min-w-0'>
                            <p
                                className={`
                                    text-md font-semibold leading-tight line-clamp-2
                                    ${isDark ? 'text-gray-200' : 'text-gray-700'}
                                `}
                            >
                                {p.productName}
                            </p>

                            <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                Stock: <span className='font-medium'>{p.stock}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>


            {hasMore && (
                <button
                    onClick={() => setExpanded((v) => !v)}
                    className={`
                        mt-3 flex items-center gap-1 text-md font-medium cursor-pointer
                        ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}
                    `}
                >
                    {expanded
                        ? <><FiChevronUp size={13} /> Ver menos</>
                        : <><FiChevronDown size={13} /> Ver {products.length - PREVIEW_COUNT} más</>
                    }
                </button>
            )}
        </div>
    )
}