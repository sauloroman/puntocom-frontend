import React from 'react'
import { useForm } from 'react-hook-form'
import { type EditProduct } from '../../../../../interfaces/dto/product.interface'
import { AlertType } from '../../../../../interfaces/ui/alert.interface'
import { useAlert, useCategories, useDrawer, useProducts, useSuppliers, useTheme } from '../../../../../shared/hooks'
import { CancelButton, SaveButton, } from '../../../../../shared/components/button'
import { Input, Label, Textarea } from '../../../../../shared/components/form'
import { ErrorMessageForm } from '../../../../../shared/components/error-message'

export const FormEditProduct: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

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

  const selectClassName = `
    text-sm appearance-none w-full px-4 py-2 pr-10 rounded-lg
    border focus:outline-none focus:ring-2 transition-all cursor-pointer duration-200
    ${isDark
      ? 'bg-gray-800 text-gray-100 border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
      : 'bg-white text-gray-600 border-gray-300 focus:ring-indigo-200 focus:border-indigo-200'
    }
  `

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
        {errors.name && <ErrorMessageForm message={errors.name.message} />}
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
        {errors.sellingPrice && <ErrorMessageForm message={errors.sellingPrice.message} />}
      </div>

      <section className="flex gap-5 items-center">

        <div className='w-full'>
          <Label className='mb-3 flex items-center justify-between gap-2'>Categoría del producto</Label>
          <select
            id="productCategory"
            {
            ...register('categoryId', {
              required: { value: true, message: 'La categoría es obligatorio' }
            })
            }
            className={selectClassName}
          >
            <option value="" className={isDark ? 'bg-gray-800 text-gray-400' : ''}>
              Seleccione una categoría
            </option>
            {allCategories?.map(cat => (
              <option 
                value={cat.id} 
                key={cat.id}
                className={isDark ? 'bg-gray-800 text-gray-100' : ''}
              >
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <ErrorMessageForm message={errors.categoryId.message} />}
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
            className={selectClassName}
          >
            <option value="" className={isDark ? 'bg-gray-800 text-gray-400' : ''}>
              Seleccione un proveedor
            </option>
            {suppliers?.map(supp => (
              <option 
                value={supp.id} 
                key={supp.id}
                className={isDark ? 'bg-gray-800 text-gray-100' : ''}
              >
                {supp.name} {supp.lastname}
              </option>
            ))}
          </select>
          {errors.supplierId && <ErrorMessageForm message={errors.supplierId.message} />}
        </div>

      </section>

      <div>
        <Label className='mb-3 flex items-center justify-between gap-2' htmlFor='productDescription'>Descripción del producto</Label>
        <Textarea
          id='productDescription'
          rows={5}
          {
          ...register('description', {
            maxLength: { value: 220, message: 'Máximo 220 caracteres' }
          })
          }
        />
        {errors.description && <ErrorMessageForm message={errors.description.message} />}
      </div>

      <div className='flex items-center justify-end gap-5'>
        <SaveButton className='flex-1 p-2 md:w-48' submit text='Editar Producto' />
        <CancelButton onClick={onCloseDrawers} text='Cancelar' className='p-2 flex-1 md:w-32' />
      </div>
    </form>
  )
}