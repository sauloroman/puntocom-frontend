import React from 'react'

interface Props {
    message: string
    defaultMessage: string
    onChange: (message: string) => void
}

export const SupplierMessage: React.FC<Props> = ({ message, defaultMessage, onChange }) => {
    return (
        <div className='flex-1 flex flex-col bg-white rounded-xl p-5 border border-gray-200'>
            <label className='text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2'>
                <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
                </svg>
                Mensaje
            </label>
            <textarea
                className='flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none custom-scrollbar text-sm'
                placeholder={defaultMessage}
                value={message}
                onChange={(e) => onChange(e.target.value)}
            />
            <p className='text-xs text-gray-500 mt-2'>
                💡 Si no escribes nada, se enviará un mensaje predeterminado
            </p>
        </div>
    )
}