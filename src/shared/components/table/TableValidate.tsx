import React from 'react'

interface Props {
    isValidated: boolean
}

export const TableValidate: React.FC<Props> = ({ isValidated }) => {
    return (
        <>
            {isValidated ? (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                    Validado
                </span>
            ) : (
                <span className="opacity-70 px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-500 border border-blue-200">
                    No validado
                </span>
            )}
        </>
    )
}
