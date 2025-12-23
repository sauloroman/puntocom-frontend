import React, { useState } from 'react'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { useSuppliers, useTheme, useModal } from '../../../../../shared/hooks'
import { FaWhatsapp } from 'react-icons/fa'
import { CancelButton, SaveButton } from '../../../../../shared/components'

const predefinedMessages = [
    'Hola, necesito información sobre productos disponibles.',
    'Buenos días, quisiera hacer un pedido.',
    'Hola, ¿tienen disponibilidad de los siguientes productos?',
    'Buenos días, necesito cotización para los siguientes artículos.',
]

export const ModalWhatsappMessage: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"
    const { supplierSelected } = useSuppliers()
    const { onCloseModal } = useModal()
    const [message, setMessage] = useState('')

    const handleSendWhatsapp = () => {
        if (!supplierSelected || !message.trim()) return
        const cleanPhone = supplierSelected.phone.replace(/[-\s()]/g, '')        
        const encodedMessage = encodeURIComponent(message)        
        const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`
        window.open(whatsappUrl, '_blank')
        onCloseModal()
    }

    return (
        <ModalLayout width='w-2xl'>
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        ${isDark ? 'bg-green-900/30' : 'bg-green-100'}
                    `}>
                        <FaWhatsapp 
                            className={isDark ? 'text-green-400' : 'text-green-600'} 
                            size={24} 
                        />
                    </div>
                    <div>
                        <h2 className={`
                            text-xl font-bold transition-colors
                            ${isDark ? 'text-gray-100' : 'text-gray-900'}
                        `}>
                            Enviar mensaje por WhatsApp
                        </h2>
                        <p className={`
                            text-sm transition-colors
                            ${isDark ? 'text-gray-400' : 'text-gray-600'}
                        `}>
                            {supplierSelected?.name} {supplierSelected?.lastname}
                        </p>
                    </div>
                </div>

                <div className={`
                    rounded-lg p-4 mb-6 transition-colors
                    ${isDark 
                        ? 'bg-gray-800 border border-gray-700' 
                        : 'bg-gray-50 border border-gray-200'
                    }
                `}>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className={`
                                font-medium transition-colors
                                ${isDark ? 'text-gray-400' : 'text-gray-600'}
                            `}>
                                Empresa:
                            </span>
                            <p className={`
                                font-semibold transition-colors
                                ${isDark ? 'text-gray-200' : 'text-gray-900'}
                            `}>
                                {supplierSelected?.company}
                            </p>
                        </div>
                        <div>
                            <span className={`
                                font-medium transition-colors
                                ${isDark ? 'text-gray-400' : 'text-gray-600'}
                            `}>
                                Teléfono:
                            </span>
                            <p className={`
                                font-semibold transition-colors
                                ${isDark ? 'text-gray-200' : 'text-gray-900'}
                            `}>
                                {supplierSelected?.phone}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label className={`
                        block text-sm font-medium mb-2 transition-colors
                        ${isDark ? 'text-gray-300' : 'text-gray-700'}
                    `}>
                        Mensajes sugeridos
                    </label>
                    <select
                        onChange={(e) => {
                            if (e.target.value) {
                                setMessage(e.target.value)
                            }
                        }}
                        className={`
                            w-full px-4 py-3 rounded-lg text-sm transition-colors
                            focus:outline-none focus:ring-2 border cursor-pointer
                            ${isDark 
                                ? 'bg-gray-800 border-gray-700 text-gray-200 focus:ring-indigo-500' 
                                : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-200'
                            }
                        `}
                        defaultValue=""
                    >
                        <option value="">Selecciona un mensaje predefinido...</option>
                        {predefinedMessages.map((msg, index) => (
                            <option key={index} value={msg}>
                                {msg}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label className={`
                        block text-sm font-medium mb-2 transition-colors
                        ${isDark ? 'text-gray-300' : 'text-gray-700'}
                    `}>
                        Mensaje personalizado
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escribe tu mensaje aquí..."
                        rows={6}
                        className={`
                            w-full px-4 py-3 rounded-lg text-sm resize-none transition-colors
                            focus:outline-none focus:ring-2
                            ${isDark 
                                ? 'bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-indigo-500' 
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-200'
                            }
                            border
                        `}
                    />
                    <p className={`
                        text-xs mt-1 transition-colors
                        ${isDark ? 'text-gray-500' : 'text-gray-500'}
                    `}>
                        {message.length} caracteres
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <SaveButton
                        onClick={handleSendWhatsapp}
                        disabled={!message.trim()}
                        className={`
                            flex-1 p-3 flex items-center justify-center gap-2
                            ${!message.trim() && 'opacity-50 cursor-not-allowed'}
                        `}
                        text="Enviar por WhatsApp"
                    />
                    <CancelButton
                        onClick={onCloseModal}
                        className="flex-1 p-3"
                        text="Cancelar"
                    />
                </div>

                <div className={`
                    mt-4 p-3 rounded-lg text-xs transition-colors
                    ${isDark 
                        ? 'bg-blue-900/20 text-blue-300 border border-blue-800' 
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }
                `}>
                    <strong>Nota:</strong> Se abrirá WhatsApp Web o la aplicación de WhatsApp en tu dispositivo con el mensaje preparado. Solo necesitas presionar enviar.
                </div>
            </div>
        </ModalLayout>
    )
}