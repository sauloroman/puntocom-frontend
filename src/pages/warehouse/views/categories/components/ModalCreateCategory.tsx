import React from 'react'
import { useForm } from 'react-hook-form'
import type { CreateCategory } from '../../../../../interfaces/category.interface'
import { useCategories, useModal } from '../../../../../shared/hooks'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { Input, Label, Textarea } from '../../../../../shared/components'
import { LuAsterisk } from "react-icons/lu";
import { SaveButton } from '../../../../../shared/components/button/SaveButton'
import { CancelButton } from '../../../../../shared/components/button/CancelButton'

export const ModalCreateCategory: React.FC = () => {

    const {
        handleSubmit,
        register,
        formState: {errors}        
    } = useForm<CreateCategory>()
    const { onCloseModal } = useModal()
    const { createCategory } = useCategories()

    const onCreateCategory = ( data: CreateCategory ) => {
        createCategory(data)
        onCloseModal()
    }

    return (
        <ModalLayout width={'w-lg'}>
            <form onSubmit={handleSubmit(onCreateCategory)} className='space-y-4'>
                <div>
                    <Label htmlFor='categoryName' className='mb-3 flex items-center justify-between gap-2'>
                        Nombre de la categoría
                        <LuAsterisk size={15} className='text-indigo-600' />
                    </Label>
                    <Input  
                        autoComplete='off'
                        id='categoryName'
                        type='text'
                        placeholder='Bebidas enbotelladas'
                        {
                            ...register('name', {
                                required: 'El nombre de categoría es obligatorio',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                                maxLength: { value: 100, message: 'Máximo 100 caracteres' }
                            })
                        }
                    />
                    { errors.name && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.name.message}</p>)}
                </div>
                <div>
                   <Label htmlFor='categoryDescription' className='mb-3 flex items-center justify-between gap-2'>
                        Descripción de la categoría
                    </Label>
                    <Textarea 
                        rows={5}
                        placeholder='Categoría para almacenar refrescos, agua natural y aguas de sabor enbotelladas'
                        id="categoryDescription"
                        {...register('description', { 
                            maxLength: { value: 220, message: 'Máximo 220 caracteres' }
                        })}
                    />
                    { errors.description && (<p className=' text-red-600 mt-1 text-right text-xs'>{errors.description.message}</p>)}
                </div>
                <div className='flex items-center gap-5 justify-end mt-5'>
                    <div>
                        <SaveButton text='Guardar Categoría' />
                    </div>
                    <div onClick={ onCloseModal }>
                        <CancelButton text='Cancelar' />
                    </div>
                </div>
            </form>
        </ModalLayout>
    )
}
