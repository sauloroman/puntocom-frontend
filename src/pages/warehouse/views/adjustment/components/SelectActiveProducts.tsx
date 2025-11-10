import type { UseFormRegister } from "react-hook-form";
import type { ProductMinimal } from "../../../../../interfaces/product.interface";

interface SelectActiveProductsProps {
    products: ProductMinimal[],
    register: UseFormRegister<any>
} 

export const SelectActiveProducts: React.FC<SelectActiveProductsProps> = ({ register, products }) => {
    return (
        <select
            id="productId"
            className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
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
                >{product.productName} - Stock {product.productStock}</option>
            ))}
        </select>
    )
}