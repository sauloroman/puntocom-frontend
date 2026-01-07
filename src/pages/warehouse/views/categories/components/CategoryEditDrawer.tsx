import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'
import { RightDrawerLayout } from '../../../../../layouts'
import { useCategories, useModal, useTheme } from '../../../../../shared/hooks'
import { SpinnerContainer } from '../../../../../shared/components/spinner'
import { DrawerInfoStatus } from '../../../../../shared/components/drawer'
import { FormEditCategory, UploadCategoryImage } from './'

export const CategoryEditDrawer: React.FC = () => {
  const { isLoading, categorySelected } = useCategories()
  const { onOpenModal } = useModal()
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const onOpenModalToConfirmChangeStatus = () => {
    onOpenModal(ModalNames.confirmChangeStatusCategory)
  }

  return (
    <RightDrawerLayout width="w-2xl" title="Editar Categoría">
      <div className="p-4">
        {isLoading ? (
          <SpinnerContainer
            size="lg"
            color={isDark ? "border-gray-400" : "border-indigo-700"}
          />
        ) : (
          <div className="space-y-3">
            <FormEditCategory />

            <div className="mt-10 space-y-3">
              <h3
                className={`
                  flex items-center gap-2 text-lg font-semibold
                  ${isDark ? "text-gray-200" : "text-indigo-700"}
                `}
              >
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
        )}
      </div>
    </RightDrawerLayout>
  )
}
