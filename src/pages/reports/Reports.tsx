import React, { useEffect } from 'react'
import { PuntoComLayout } from '../../layouts/PuntoComLayout'
import { ReportsFolder } from './components'
import { useReports } from '../../shared/hooks'

export const Reports: React.FC = () => {

  const { allReports, getAllReports } = useReports()
  
  useEffect(() => {
    if ( !allReports ) {
      getAllReports()
    }
  }, [])

  return (
    <PuntoComLayout>
      <ReportsFolder />
    </PuntoComLayout>
  )
}
