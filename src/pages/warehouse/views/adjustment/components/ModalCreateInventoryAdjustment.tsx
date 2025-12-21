import React, { useEffect } from 'react'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { useForm } from 'react-hook-form'
import { type SaveInventoryAdjustment } from '../../../../../interfaces/inventory-adjustment.interface'
import {
    CancelButton,
    ErrorMessageForm,
    Input,
    Label,
    SaveButton,
    Textarea
} from '../../../../../shared/components'
import { SelectActiveProducts, SelectAdjustmentType } from './'
import { useAuth, useInventoryAdjustment, useModal, useProducts } from '../../../../../shared/hooks'

export const ModalCreateInventoryAdjustment: React.FC = () => {

    const { getMinimalProducts, productsMinimal } = useProducts()
    const { user } = useAuth()
    const { onCloseModal } = useModal()
    const { saveInventoryAdjustment } = useInventoryAdjustment()

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<SaveInventoryAdjustment>()

    const onSaveInventoryAdjustment = (data: SaveInventoryAdjustment) => {
        const payload: SaveInventoryAdjustment = {
            ...data,
            adjustmentQuantity: Number(data.adjustmentQuantity),
            userId: user?.id ?? ''
        }
        saveInventoryAdjustment(payload)
        onCloseModalSaveAdjustment()
    }

    const onCloseModalSaveAdjustment = () => {
        onCloseModal()
        reset()
    }

    useEffect(() => {
        if (!productsMinimal) getMinimalProducts()
    }, [])

    return (
        <ModalLayout width="w-xl">
            <form
                onSubmit={handleSubmit(onSaveInventoryAdjustment)}
                className="flex-2 space-y-6 mb-4 rounded-md"
            >
                <div className="flex-1">
                    <Label htmlFor="productId">Producto a realizar ajuste</Label>
                    <SelectActiveProducts products={productsMinimal ?? []} register={register} />
                    {errors.productId && <ErrorMessageForm message={errors.productId.message} />}
                </div>

                <div className="flex-1">
                    <Label htmlFor="adjustmentType">Tipo de Ajuste</Label>
                    <SelectAdjustmentType register={register} />
                    {errors.adjustmentType && <ErrorMessageForm message={errors.adjustmentType.message} />}
                </div>

                <div className="flex-1">
                    <Label htmlFor="adjustmentQuantity">Nueva cantidad de stock</Label>
                    <Input
                        id="adjustmentQuantity"
                        autoComplete="off"
                        type="number"
                        min={1}
                        placeholder="50"
                        {...register('adjustmentQuantity', {
                            required: 'La nueva cantidad es requerida',
                            min: { value: 1, message: 'Valor mínimo 1' }
                        })}
                    />
                    {errors.adjustmentQuantity && (
                        <ErrorMessageForm message={errors.adjustmentQuantity.message} />
                    )}
                </div>

                <div className="flex-1">
                    <Label htmlFor="adjustmentReason">Motivo de ajuste</Label>
                    <Textarea
                        id="adjustmentReason"
                        placeholder="Se encontraron 2 cajas con 6 botellas rotas cada una, se han desechado"
                        autoComplete="off"
                        {...register('adjustmentReason', {
                            required: 'El motivo es requerido',
                            minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                            maxLength: { value: 255, message: 'Máximo 255 caracteres' }
                        })}
                    />
                    {errors.adjustmentReason && (
                        <ErrorMessageForm message={errors.adjustmentReason.message} />
                    )}
                </div>

                <div className="flex items-center gap-5 justify-end mt-6 w-full">
                    <SaveButton
                        className="p-2 flex-1"
                        submit
                        text="Guardar Ajuste"
                    />
                    <CancelButton
                        className="p-2 flex-1"
                        onClick={onCloseModalSaveAdjustment}
                        text="Cancelar"
                    />
                </div>
            </form>
        </ModalLayout>
    )
}