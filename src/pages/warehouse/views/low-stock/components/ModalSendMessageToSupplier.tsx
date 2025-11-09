import React, { useState } from 'react'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { useModal, useProducts } from '../../../../../shared/hooks'
import { ProductInfo } from './ProductInfo'
import { SupplierInfo } from './SupplierInfo'
import { SupplierMessage } from './SupplierMessage'
import { CancelButton } from '../../../../../shared/components'
import { WhatsAppButton } from '../../../../../shared/components/button/WhatsAppButton'

export const ModalSendMessageToSupplier: React.FC = () => {
    
    const [message, setMessage] = useState('')
    const { productSelected } = useProducts()
    const { onCloseModal } = useModal()

    if (!productSelected) return null

    const supplier = productSelected.Supplier

    const defaultMessage = `Hola ${supplier?.name || ''}, necesito solicitar más unidades del producto:\n\n*${productSelected.name}*\nCódigo: ${productSelected.code}\nStock actual: ${productSelected.stock}\nStock mínimo: ${productSelected.stockMin}\n\n¿Podrían ayudarme con esta solicitud?`

    const handleSendWhatsApp = () => {
        if (!supplier?.phone) {
            alert('El proveedor no tiene un número de teléfono registrado')
            return
        }

        const messageToSend = message.trim() || defaultMessage
        let phoneNumber = supplier.phone.replace(/\D/g, '')
        
        if (!phoneNumber.startsWith('52') && phoneNumber.length === 10) {
            phoneNumber = '52' + phoneNumber
        }

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageToSend)}`
        window.open(whatsappUrl, '_blank')
    }

    return (
        <ModalLayout width='w-[900px]'>
            <div className='p-2'>          
                <div className='mb-6'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                        Contactar Proveedor
                    </h2>
                    <p className='text-sm text-gray-500'>
                        Envía un mensaje por WhatsApp para solicitar más unidades
                    </p>
                </div>

                <div className='grid grid-cols-5 gap-6'>
                    <div className='space-y-4 col-span-2'>
                        <ProductInfo product={productSelected} />
                    </div>

                    <div className='flex flex-col space-y-4 col-span-3'>
                        <SupplierInfo supplier={supplier} />
                        <SupplierMessage 
                            message={message}
                            defaultMessage={defaultMessage}
                            onChange={setMessage}
                        />
                    </div>
                </div>

                <div className='flex gap-3 justify-end mt-6 pt-6 border-t border-gray-200'>
                    <CancelButton 
                        text="Cancelar"
                        onClick={onCloseModal}
                        className="px-6 py-2.5"
                    />
                    <WhatsAppButton
                        text="Enviar por WhatsApp"
                        onClick={handleSendWhatsApp}
                        disabled={!supplier?.phone}
                        className="px-6 py-2.5"
                    />
                </div>
            </div>
        </ModalLayout>
    )
}
