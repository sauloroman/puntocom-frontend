import React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { ProductMinimal } from "../../../../../interfaces/product.interface";
import { useTheme } from "../../../../../shared/hooks";

interface SelectActiveProductsProps {
    products: ProductMinimal[],
    register: UseFormRegister<any>
} 

export const SelectActiveProducts: React.FC<SelectActiveProductsProps> = ({ register, products }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <select
            id="productId"
            className={`
                w-full px-3 py-2 border rounded-lg text-sm 
                focus:outline-none focus:ring-2 transition-colors
                ${isDark 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                }
            `}
            {
                ...register('productId', {
                    required: 'El producto es obligatorio'
                })
            }
        >
            {products.map((product, i) => (
                <option 
                    key={product.productId + i}
                    value={product.productId}
                    className={isDark ? 'bg-gray-700' : 'bg-white'}
                >
                    {product.productName} - Stock {product.productStock}
                </option>
            ))}
        </select>
    )
}