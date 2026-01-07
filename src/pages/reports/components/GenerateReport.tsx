import React from 'react'
import { GenerateReportButton } from '../../../shared/components/button'
import { useReports } from '../../../shared/hooks'
import { SpinnerContainer } from '../../../shared/components/spinner/SpinnerContainer'

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
