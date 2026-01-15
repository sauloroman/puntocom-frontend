import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IoTextOutline } from 'react-icons/io5'
import type { UpdateCategory } from '../../../../../interfaces/dto/category.interface'
import { AlertType } from '../../../../../interfaces/ui/alert.interface'
import { useAlert, useCategories, useDrawer } from '../../../../../shared/hooks'
import { Input, Label, Textarea } from '../../../../../shared/components/form'
import { ErrorMessageForm } from '../../../../../shared/components/error-message'
import { CancelButton, SaveButton } from '../../../../../shared/components/button'

export const FormEditCategory: React.FC = () => {

    const { categorySelected, updateCategory } = useCategories()
    const { activateAlert } = useAlert()
    const { onCloseDrawers } = useDrawer()

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<UpdateCategory>({
        defaultValues: {
            name: categorySelected?.name,
            description: categorySelected?.description,
        }
    })

    const onEditCategory = (data: UpdateCategory) => {
        if (data.name === categorySelected?.name && data.description === categorySelected?.description) {
            activateAlert({
                title: 'No hay cambios',
                text: 'No has actualizado información de la categoría',
                type: AlertType.warning
            })
            return
        }

        if (data.description && data.name === categorySelected?.name) {
            updateCategory(categorySelected?.id!, { description: data.description })
        } else {
            updateCategory(categorySelected?.id!, data)
        }

        onCloseDrawers()
    }

    useEffect(() => {
        if (categorySelected) {
            reset({
                name: categorySelected.name,
                description: categorySelected.description
            })
        }
    }, [categorySelected, reset])

    return (
        <form onSubmit={handleSubmit(onEditCategory)} className='space-y-6'>
            <div>
                <Label htmlFor='categoryName' className='mb-3 flex items-center justify-between gap-2'>
                    Nombre de la categoría
                    <IoTextOutline size={15} className='text-indigo-600' />
                </Label>
                <Input
                    autoComplete="off"
                    id="categoryName"
                    type="text"
                    placeholder="Bebidas enbotelladas"
                    {...register("name", {
                        required: "El nombre de categoría es obligatorio",
                        minLength: { value: 2, message: "Mínimo 2 caracteres" },
                        maxLength: { value: 100, message: "Máximo 100 caracteres" },
                    })}
                />
                {errors.name && <ErrorMessageForm message={errors.name.message} />}
            </div>
            <div>
                <Label htmlFor='categoryDescription' className='mb-3 flex items-center justify-between gap-2'>
                    Descripción de la categoría
                    <IoTextOutline size={15} className='text-indigo-600' />
                </Label>
                <Textarea
                    rows={5}
                    placeholder="Categoría para almacenar refrescos, agua natural y aguas de sabor enbotelladas"
                    id="categoryDescription"
                    {...register("description", {
                        maxLength: { value: 220, message: "Máximo 220 caracteres" },
                    })}
                />
                {errors.description && <ErrorMessageForm message={errors.description.message} />}
            </div>
            <div className='flex items-center gap-5 justify-end mt-8'>
                <SaveButton className='p-2 w-full md:w-48' submit text='Editar Categoría' />
                <CancelButton className='p-2 w-full md:w-32' onClick={onCloseDrawers} text='Cancelar' />
            </div>
        </form>
    )
}
