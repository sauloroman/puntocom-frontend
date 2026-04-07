import React from 'react'
import { OutlineButton } from '../../../../../shared/components/button'
import { FaBorderAll, FaLightbulb, FaRegLightbulb } from 'react-icons/fa'
import { usePurchase } from '../../../../../shared/hooks'

export const FilterProductsInPurchasesByStatus: React.FC = () => {
    const { filterProducts, onResetFilterProducts, onGetProductsToBeInPurchase, onSetFilterProductsByStatus } = usePurchase()

    const onReset = () => {
        onGetProductsToBeInPurchase()
        onResetFilterProducts()
    }

    const status = filterProducts.status

    return (
        <section>
            <div className='flex items-center gap-2'>
                <OutlineButton className={`${status === 'Inactivo' && 'bg-indigo-800 text-white'}`} onClick={() => onSetFilterProductsByStatus('Inactivo')}>
                    <FaRegLightbulb size={15} />
                    <p>Inactivos</p>
                </OutlineButton>
                <OutlineButton className={`${status === 'Activo' && 'bg-indigo-800 text-white'}`} onClick={() => onSetFilterProductsByStatus('Activo')}>
                    <FaLightbulb size={15} />
                    <p>Activos</p>
                </OutlineButton>
                <OutlineButton className={`${!status && 'bg-indigo-800 text-white'}`} onClick={onReset}>
                    <FaBorderAll size={15} />
                    <p>Todos</p>
                </OutlineButton>
            </div>
        </section>
    )
}
