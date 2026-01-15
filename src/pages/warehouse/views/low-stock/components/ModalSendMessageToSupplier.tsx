import React, { useState } from 'react'
import { ModalLayout } from '../../../../../layouts'
import { useModal, useProducts, useTheme } from '../../../../../shared/hooks'
import { CancelButton, WhatsAppButton  } from '../../../../../shared/components/button'
import { ProductInfo, SupplierInfo, SupplierMessage } from './'

export const ModalSendMessageToSupplier: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"
    
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
        <ModalLayout width='w-full sm:w-[95%] md:w-[850px] lg:w-[900px]'>
            <div className='p-3 sm:p-4 md:p-5 overflow-y-scroll h-[500px] md:h-[550px] no-scrollbar'>          
                <div className='hidden md:block mb-4 sm:mb-6'>
                    <h2 className={`
                        text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 transition-colors duration-200
                        ${isDark ? 'text-gray-100' : 'text-gray-800'}
                    `}>
                        Contactar Proveedor
                    </h2>
                    <p className={`
                        text-xs sm:text-sm transition-colors duration-200
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                        Envía un mensaje por WhatsApp para solicitar más unidades
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6'>
                    <div className='space-y-3 sm:space-y-4 lg:col-span-2'>
                        <ProductInfo product={productSelected} />
                    </div>

                    <div className='flex flex-col space-y-3 sm:space-y-4 lg:col-span-3'>
                        <SupplierInfo supplier={supplier} />
                        <SupplierMessage 
                            message={message}
                            defaultMessage={defaultMessage}
                            onChange={setMessage}
                        />
                    </div>
                </div>

                <div className={`
                    flex flex-col-reverse sm:flex-row gap-4 sm:gap-3 justify-end mt-4 sm:mt-6 pt-4 sm:pt-6 border-t transition-colors duration-200
                    ${isDark ? 'border-gray-700' : 'border-gray-200'}
                `}>
                    <CancelButton 
                        text="Cancelar"
                        onClick={onCloseModal}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2.5"
                    />
                    <WhatsAppButton
                        text="Enviar por WhatsApp"
                        onClick={handleSendWhatsApp}
                        disabled={!supplier?.phone}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2.5"
                    />
                </div>
            </div>
        </ModalLayout>
    )
}