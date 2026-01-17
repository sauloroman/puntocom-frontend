import React, { useEffect } from 'react'
import { useCategories, useTheme, usePos } from '../../../shared/hooks'
import { CategoryItemMenu } from './'
import { IoClose } from 'react-icons/io5'

interface AsideMenuProps {
    onClose?: () => void
}

export const AsideMenu: React.FC<AsideMenuProps> = ({ onClose }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { categoryActive, filterProductsByCategory, getProductsToSale } = usePos()
    const { categories } = useCategories()
    const activeCategories = categories?.filter(cat => cat.isActive)

    useEffect(() => {
        if (categoryActive) {
            filterProductsByCategory(categoryActive)
        } else {
            getProductsToSale()
        }
    }, [categoryActive])

    return (
        <div className={`
            border h-screen transition-colors relative
            ${isDark 
                ? 'border-gray-700 bg-gray-900' 
                : 'border-gray-300 bg-gray-50'
            }
        `}>
            {onClose && (
                <button
                    onClick={onClose}
                    className={`
                        md:hidden absolute top-4 right-4 z-10 p-2 rounded-lg
                        transition-colors
                        ${isDark
                            ? 'hover:bg-gray-800 text-gray-300'
                            : 'hover:bg-gray-200 text-gray-700'
                        }
                    `}
                >
                    <IoClose size={24} />
                </button>
            )}

            <div className="p-5 h-full">
                <h2 className={`
                    text-lg font-semibold mb-4 md:hidden
                    ${isDark ? 'text-gray-200' : 'text-gray-900'}
                `}>
                    Categorías
                </h2>

                <ul className='flex flex-col gap-3 h-full overflow-y-scroll no-scrollbar pb-20'>
                    <CategoryItemMenu
                        categoryId={''}
                        categoryName={'Todos'}
                        categoryIcon={'Categoría sin ícono'}
                        onSelect={onClose}
                    />
                    {
                        activeCategories?.map(cat => (
                            <CategoryItemMenu
                                key={cat.id}
                                categoryId={cat.id}
                                categoryName={cat.name}
                                categoryIcon={cat.icon}
                                onSelect={onClose}
                            />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
