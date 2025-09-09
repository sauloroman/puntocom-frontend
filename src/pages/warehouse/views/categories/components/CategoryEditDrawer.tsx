import React from 'react'
import { FormEditCategory, UploadCategoryImage } from './'
import { RightDrawerLayout } from '../../../../../layouts/RightDrawerLayout'
import { SpinnerContainer } from '../../../../../shared/components'
import { useCategories, useModal } from '../../../../../shared/hooks'
import { DrawerInfoStatus } from '../../../../../shared/components/drawer/DrawerInfoStatus'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'
import { FaPlus } from 'react-icons/fa'

export const CategoryEditDrawer: React.FC = () => {
    const { isLoading, categorySelected } = useCategories()
    const {onOpenModal} = useModal()

    const onOpenModalToConfirmChangeStatus = () => {
        onOpenModal(ModalNames.confirmChangeStatusCategory)
    }

    return (
        <RightDrawerLayout width='w-2xl' title='Editar Categoría'>
            <div className="p-4">
                {
                    isLoading
                        ? (<SpinnerContainer size='lg' color='border-indigo-700' />)
                        : (
                            <div className="space-y-3">
                                <FormEditCategory />
                                <div className='mt-10 space-y-3'>    
                                    <h3 className='flex items-center gap-2 text-lg text-indigo-700 font-semibold'>
                                        <FaPlus size={20} />
                                        Más acciones
                                    </h3>
                                    <DrawerInfoStatus 
                                        status={categorySelected?.isActive!} 
                                        onChangeStatus={onOpenModalToConfirmChangeStatus} 
                                    />
                                    <UploadCategoryImage />
                                </div>
                            </div>
                        )
                }
            </div>
        </RightDrawerLayout>
    )
}
