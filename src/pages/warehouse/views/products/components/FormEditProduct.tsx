import React from 'react'
import { useForm } from 'react-hook-form'
import { useAlert, useCategories, useDrawer, useProducts, useSuppliers } from '../../../../../shared/hooks'
import { type EditProduct } from '../../../../../interfaces/product.interface'
import { CancelButton, Input, Label, SaveButton, Textarea } from '../../../../../shared/components'
import { AlertType } from '../../../../../interfaces/ui/alert.interface'

export const FormEditProduct: React.FC = () => {

  const { activateAlert } = useAlert()
  const { allCategories } = useCategories()
  const { suppliers } = useSuppliers()
  const { productSelected, onUpdateProduct } = useProducts()
  const { onCloseDrawers } = useDrawer()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<EditProduct>({
    defaultValues: {
      name: productSelected?.name,
      description: productSelected?.description,
      sellingPrice: productSelected?.sellingPrice,
      categoryId: productSelected?.categoryId,
      supplierId: productSelected?.supplierId
    }
  })

  const onUpdateProductAc = (data: EditProduct) => {
    if (!productSelected) return

    if (
      data.name === productSelected.name &&
      data.description === productSelected.description &&
      data.sellingPrice === productSelected.sellingPrice &&
      data.categoryId === productSelected.categoryId &&
      data.supplierId === productSelected.supplierId
    ) {
      activateAlert({
        title: 'No hay cambios',
        text: 'No has actualizado la información del producto',
        type: AlertType.warning,
      })
      return
    }

    if (data.name === productSelected.name) {
      const payload: EditProduct = {}

      if (data.description !== productSelected.description) {
        payload.description = data.description
      }
      if (data.sellingPrice !== productSelected.sellingPrice) {
        payload.sellingPrice = data.sellingPrice
      }
      if (data.categoryId !== productSelected.categoryId) {
        payload.categoryId = data.categoryId
      }
      if (data.supplierId !== productSelected.supplierId) {
        payload.supplierId = data.supplierId
      }

      onUpdateProduct(productSelected.id, payload)
    } else {
      onUpdateProduct(productSelected.id, data)
    }

    reset()
  }


  return (
    <form onSubmit={handleSubmit(onUpdateProductAc)} className='space-y-7'>

      <div>
        <Label className='mb-3 flex items-center justify-between gap-2' htmlFor='productName'>
          Nombre del producto
        </Label>
        <Input
          id='productName'
          placeholder='Cambiar nombre del producto'
          type='text'
          {
          ...register('name', {
            required: 'El nombre del producto es obligatorio',
            minLength: { value: 2, message: 'Mínimo 2 caracteres' },
            maxLength: { value: 100, message: 'Máximo 100 caracteres' }
          })
          }
        />
        {errors.name && <p className='text-red-600 mt-1 text-right text-xs'>{errors.name.message}</p>}
      </div>

      <div>
        <Label
          htmlFor='productSellingPrice'
          className='mb-3 flex items-center justify-between gap-2'
        >
          Precio de venta $
        </Label>
        <Input
          id='productSellingPrice'
          placeholder='$25.00'
          min={1}
          {
          ...register('sellingPrice', {
            required: 'Obligatorio',
            min: 1,
          })
          }
        />
        {errors.sellingPrice && <p className='text-red-600 mt-1 text-right text-xs'>{errors.sellingPrice.message}</p>}
      </div>

      <section className="flex gap-5 items-center">

        <div className='w-full'>
          <Label className='mb-3 flex items-center justify-between gap-2'>Categoría del producto</Label>
          <select
            id="productSupplier"
            {
            ...register('categoryId', {
              required: { value: true, message: 'La categoría es obligatorio' }
            })
            }
            className="
              text-sm
              appearance-none w-full px-4 py-2 pr-10 rounded-lg
              bg-white text-gray-600
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200
              transition-all cursor-pointer
            "
          >
            <option value="">Seleccione una categoría</option>
            {allCategories?.map(cat => (<option value={cat.id} key={cat.id}>{cat.name}</option>))}
          </select>
          {errors.categoryId && <p className='text-red-600 mt-1 text-right text-xs'>{errors.categoryId.message}</p>}
        </div>

        <div className='w-full'>
          <Label htmlFor='productSupplier' className='mb-3 flex items-center justify-between gap-2'>Proveedor del producto</Label>
          <select
            id="productSupplier"
            {
            ...register('supplierId', {
              required: { value: true, message: 'El proveedor es obligatorio' }
            })
            }
            className="
              text-sm
              appearance-none w-full px-4 py-2 pr-10 rounded-lg
              bg-white text-gray-600
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200
              transition-all cursor-pointer
            "
          >
            <option value="">Seleccione un proveedor</option>
            {suppliers?.map(supp => (<option value={supp.id} key={supp.id}>{supp.name} {supp.lastname}</option>))}
          </select>
          {errors.supplierId && <p className='text-red-600 mt-1 text-right text-xs'>{errors.supplierId.message}</p>}
        </div>

      </section>

      <div>
        <Label className='mb-3 flex items-center justify-between gap-2' htmlFor='productDescription'>Descripción del producto</Label>
        <Textarea
          id='productDescription'
          rows={4}
          {
          ...register('description', {
            maxLength: { value: 220, message: 'Máximo 220 caracteres' }
          })
          }
        />
        {errors.description && <p className='text-red-600 mt-1 text-right text-xs'>{errors.description.message}</p>}
      </div>

      <div className='flex items-center justify-end gap-5'>
        <SaveButton submit text='Guardar cambios' />
        <div onClick={onCloseDrawers}><CancelButton text='Cancelar' /></div>
      </div>
    </form>
  )
}
