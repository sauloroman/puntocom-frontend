import { BsBoxSeam } from "react-icons/bs"
import { ModalLayout } from "../../../layouts"
import { ConfirmButton } from "../../../shared/components/button"
import { ModalNames } from "../../../interfaces/ui/modal.interface"
import { useModal, useProducts, useTheme } from "../../../shared/hooks"
import type { Product, ProductMinimal } from "../../../interfaces/dto/product.interface"

export const ModalNoStock: React.FC = () => {

    const { productsNoStock } = useProducts()
    const { onOpenModal } = useModal()
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const onOpenSaleCreated = () => {
        onOpenModal(ModalNames.saveSale)
    }

    return (
        <ModalLayout width='w-2xl'>
            <div className="text-center px-6 py-4">

                <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
                    ${isDark ? 'bg-gray-700' : 'bg-orange-50'}
                `}>
                    <BsBoxSeam className={isDark ? 'text-orange-400' : 'text-orange-500'} size={28} />
                </div>

                <h3 className={`
                    mb-4 text-xl font-semibold transition-colors
                    ${isDark ? 'text-gray-100' : 'text-gray-800'}
                `}>
                    Sin stock disponible
                </h3>

                <p className={`
                    mb-5 transition-colors
                    ${isDark ? 'text-gray-300' : 'text-gray-600'}
                `}>
                    Los siguientes productos se han agotado:
                </p>

                <ul className={`
                    max-h-50 overflow-y-auto text-left px-4 py-6 list-none mb-10
                    ${isDark ? 'text-gray-300' : 'text-gray-700'}
                `}>
                    {productsNoStock?.map((product: ProductMinimal) => (
                        <li 
                            key={product.productId} 
                            className="mb-1 list-disc"
                        >
                            {product.productName}
                        </li>
                    ))}
                </ul>

                <p className={`
                    w-[80%] m-auto mb-6 text-sm transition-colors
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                `}>
                    No es posible agregar más unidades de estos productos a la orden
                </p>

                <div onClick={onOpenSaleCreated}>
                    <ConfirmButton className='p-4' text="Entendido" />
                </div>
            </div>
        </ModalLayout>
    )
}