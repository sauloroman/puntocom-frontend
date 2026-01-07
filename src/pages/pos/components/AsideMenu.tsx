import React, { useEffect } from 'react'
import { useCategories, useTheme, usePos } from '../../../shared/hooks'
import { CategoryItemMenu } from './'

export const AsideMenu: React.FC = () => {
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
            border p-5 h-screen transition-colors
            ${isDark 
                ? 'border-gray-700 bg-gray-900' 
                : 'border-gray-300 bg-gray-50'
            }
        `}>
            <ul className='flex flex-col gap-3 h-full overflow-y-scroll no-scrollbar'>
                <CategoryItemMenu
                    categoryId={''}
                    categoryName={'Todos'}
                    categoryIcon={'Categoría sin ícono'}
                />
                {
                    activeCategories?.map(cat => (
                        <CategoryItemMenu
                            key={cat.id}
                            categoryId={cat.id}
                            categoryName={cat.name}
                            categoryIcon={cat.icon}
                        />
                    ))
                }
            </ul>
        </div>
    )
}