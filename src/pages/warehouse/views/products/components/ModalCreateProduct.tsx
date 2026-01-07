import React from 'react'
import { useForm } from 'react-hook-form'
import { LuAsterisk } from 'react-icons/lu'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { CancelButton, Input, Label, SaveButton, Textarea } from '../../../../../shared/components'
import { useCategories, useModal, useSuppliers, useTheme } from '../../../../../shared/hooks'
import { useProducts } from '../../../../../shared/hooks/useProducts'
import type { CreateProduct } from '../../../../../interfaces/dto/product.interface'

export const ModalCreateProduct: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<CreateProduct>()

  const { onCloseModal } = useModal()
  const { onCreateProduct } = useProducts()
  const { allCategories } = useCategories()
  const { allSuppliers } = useSuppliers()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const onCreateProductAc = (data: CreateProduct) => {
    const { stock, stockMin, sellingPrice } = data
    if (sellingPrice < 0 || stock < 0 || stockMin < 0) return

    const productData = {
      ...data,
      stock: Number(stock),
      stockMin: Number(stockMin),
      sellingPrice: Number(sellingPrice)
    }

    onCreateProduct(productData)
    onCloseModal()
    reset()
  }

  return (
    <ModalLayout width="w-3xl">
      <form
        onSubmit={handleSubmit(onCreateProductAc)}
        className={`
          space-y-7 p-4 rounded-2xl transition-colors duration-200
          ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}
        `}
      >
        <div>
          <Label
            htmlFor="productName"
            className={`mb-3 flex items-center justify-between gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Nombre del producto
            <LuAsterisk size={15} className="text-indigo-600" />
          </Label>
          <Input
            id="productName"
            placeholder="CocaCola 600ml"
            type="text"
            className={`
              w-full p-2 rounded-lg border focus:ring-2 text-sm transition-colors
              ${isDark
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-indigo-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500'}
            `}
            {...register('name', {
              required: 'El nombre del producto es obligatorio',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' },
              maxLength: { value: 100, message: 'Máximo 100 caracteres' }
            })}
          />
          {errors.name && <p className="text-red-500 mt-1 text-right text-xs">{errors.name.message}</p>}
        </div>

        <div className="flex gap-5 w-full items-center">
          {[
            { id: 'sellingPrice', label: 'Precio de venta $', placeholder: '$25.00', min: 1 },
            { id: 'stock', label: 'Stock', placeholder: '15', min: 1 },
            { id: 'stockMin', label: 'Stock Mínimo', placeholder: '5', min: 1 }
          ].map((field) => (
            <div key={field.id} className="flex-1">
              <Label
                htmlFor={field.id}
                className={`mb-3 flex items-center justify-between gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {field.label}
                <LuAsterisk size={15} className="text-indigo-600" />
              </Label>
              <Input
                id={field.id}
                placeholder={field.placeholder}
                min={field.min}
                className={`
                  w-full p-2 rounded-lg border focus:ring-2 text-sm transition-colors
                  ${isDark
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-indigo-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500'}
                `}
                {...register(field.id as keyof CreateProduct, {
                  required: 'Obligatorio',
                  min: 1
                })}
              />
              {errors[field.id as keyof CreateProduct] && (
                <p className="text-red-500 mt-1 text-right text-xs">
                  {(errors[field.id as keyof CreateProduct] as any)?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-7">
          <div className="w-full">
            <Label htmlFor="productCategory" className={`mb-3 flex items-center justify-between gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Categoría del producto
              <LuAsterisk size={15} className="text-indigo-600" />
            </Label>
            <select
              id="productCategory"
              {...register('categoryId', {
                required: { value: true, message: 'La categoría es obligatoria' }
              })}
              className={`
                text-sm appearance-none w-full px-4 py-2 pr-10 rounded-lg border focus:ring-2 transition-all cursor-pointer
                ${isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-indigo-500'
                  : 'bg-white border-gray-300 text-gray-600 focus:ring-indigo-200'}
              `}
            >
              <option value="">Seleccione una categoría</option>
              {allCategories?.map((cat) => (
                <option value={cat.id} key={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 mt-1 text-right text-xs">{errors.categoryId.message}</p>}
          </div>

          <div className="w-full">
            <Label htmlFor="productSupplier" className={`mb-3 flex items-center justify-between gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Proveedor del producto
              <LuAsterisk size={15} className="text-indigo-600" />
            </Label>
            <select
              id="productSupplier"
              {...register('supplierId', {
                required: { value: true, message: 'El proveedor es obligatorio' }
              })}
              className={`
                text-sm appearance-none w-full px-4 py-2 pr-10 rounded-lg border focus:ring-2 transition-all cursor-pointer
                ${isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-indigo-500'
                  : 'bg-white border-gray-300 text-gray-600 focus:ring-indigo-200'}
              `}
            >
              <option value="">Seleccione un proveedor</option>
              {allSuppliers?.map((supp) => (
                <option value={supp.id} key={supp.id}>
                  {supp.name} {supp.lastname} - {supp.company}
                </option>
              ))}
            </select>
            {errors.supplierId && <p className="text-red-500 mt-1 text-right text-xs">{errors.supplierId.message}</p>}
          </div>
        </div>

        <div>
          <Label className={`mb-3 flex items-center justify-between gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Descripción del producto
          </Label>
          <Textarea
            placeholder="Coloca la descripción del producto"
            rows={4}
            className={`
              w-full rounded-lg border focus:ring-2 text-sm transition-colors
              ${isDark
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-indigo-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500'}
            `}
            {...register('description', {
              maxLength: { value: 220, message: 'Máximo 220 caracteres' }
            })}
          />
          {errors.description && <p className="text-red-500 mt-1 text-right text-xs">{errors.description.message}</p>}
        </div>

        <div className="flex gap-7 w-full justify-end">
          <SaveButton
            className={`
              p-2 w-54 font-medium rounded-lg transition-colors
              ${isDark ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}
            `}
            text="Guardar Producto"
            submit
          />
          <CancelButton
            className={`
              p-2 rounded-lg border transition-colors
              ${isDark
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
            `}
            onClick={onCloseModal}
            text="Cancelar"
          />
        </div>
      </form>
    </ModalLayout>
  )
}
