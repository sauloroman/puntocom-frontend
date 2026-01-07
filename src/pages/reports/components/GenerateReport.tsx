import React from 'react'
import { useReports } from '../../../shared/hooks'
import { GenerateReportButton } from '../../../shared/components/button'
import { SpinnerContainer } from '../../../shared/components/spinner'

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
