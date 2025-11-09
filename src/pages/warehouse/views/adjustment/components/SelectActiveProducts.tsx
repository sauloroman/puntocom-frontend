import type { UseFormRegister } from "react-hook-form";
import { useProducts } from "../../../../../shared/hooks";

interface SelectActiveProductsProps {
    register: UseFormRegister<any>
} 

export const SelectActiveProducts: React.FC<SelectActiveProductsProps> = ({ register }) => {

    const { products } = useProducts()
    if ( !products ) return null;
    const activeProducts = products?.filter(product => product.isActive)

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
            {activeProducts.map((product, i) => (
                <option 
                    key={product.id + i}
                    value={product.id}
                >{product.name} - Stock {product.stock}</option>
            ))}
        </select>
    )
}