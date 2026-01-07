import React from 'react'
import { LeftDrawerLayout } from '../../../../../layouts'
import { useSuppliers } from '../../../../../shared/hooks'
import { SupplierItemFilter } from './'

export const FilterProductsBySuppliersDrawer: React.FC = () => {
    const { suppliers } = useSuppliers()
    const activeSuppliers = suppliers?.filter( supp => supp.isActive ) ?? []

    return (
        <LeftDrawerLayout width='w-xl' title='Filtrar productos por proveedores'>
            <h2 className="text-xl mb-8 font-semibold">Proveedores de productos</h2>
            <ul className="flex flex-wrap gap-4">
                {
                    activeSuppliers.map(supp => (
                        <SupplierItemFilter 
                            supplierId={supp.id}
                            supplierName={`${supp.name} ${supp.lastname} - ${supp.company}`}
                        />
                    ))
                }
            </ul>
        </LeftDrawerLayout>
    )
}
