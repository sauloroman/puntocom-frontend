interface Props {
    value: boolean
    onToggle: (value: boolean) => void
}

export const ToggleButton: React.FC<Props> = ({ value, onToggle }) => {

    const handleToggle = () => {
        onToggle(!value)
    }

    return (
        <button
            onClick={handleToggle}
            className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${value ? 'bg-purple-600' : 'bg-gray-300'} cursor-pointer
            `}
        >
            <span
                className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${value ? 'translate-x-6' : 'translate-x-1'}
                `}
            />
        </button>
    )
}