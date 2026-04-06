import React, { useState } from 'react'

interface Props {
    onToggle: (value: boolean) => void
}

export const ToggleButton: React.FC<Props> = ({ onToggle }) => {

    const [enabled, setEnabled] = useState(false)

    const handleToggle = () => {
        const newValue = !enabled
        setEnabled(newValue)
        onToggle(newValue)
    }

    return (
        <button
            onClick={handleToggle}
            className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${enabled ? 'bg-purple-600' : 'bg-gray-300'} cursor-pointer
            `}
        >
            <span
                className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${enabled ? 'translate-x-6' : 'translate-x-1'}
                `}
            />
        </button>
    )
}