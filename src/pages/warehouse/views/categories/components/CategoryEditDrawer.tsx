import React from 'react'
import { FormEditCategory } from './'
import { RightDrawerLayout } from '../../../../../layouts/RightDrawerLayout'
import { SpinnerContainer } from '../../../../../shared/components'
import { useCategories } from '../../../../../shared/hooks'

export const CategoryEditDrawer: React.FC = () => {
    const { isLoading } = useCategories()

    return (
        <RightDrawerLayout width='w-2xl' title='Editar Categoría'>
            <div className="p-4">
                {
                    isLoading
                        ? (<SpinnerContainer size='lg' color='border-indigo-700' />)
                        : (<FormEditCategory />)
                }
            </div>
        </RightDrawerLayout>
    )
}
