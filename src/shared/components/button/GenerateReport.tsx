import React from 'react'
import { GenerateReportButton } from '.'
import { useReports } from '../../hooks'
import { SpinnerContainer } from '..'

interface Props {
    onConfirm: () => void
}

export const GenerateReport: React.FC<Props> = ({ onConfirm }) => {

    const { isLoading } = useReports()

    const onConfirmPasswordModal = () => {
        onConfirm()
    }

    return (
        <div className='w-fit'>
            {
                isLoading
                ? (<SpinnerContainer color='bg-white' size='sm' />)
                : ((<GenerateReportButton onClick={onConfirmPasswordModal} text='Reporte' />))
            }
        </div>
    )
}
