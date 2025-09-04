import React, { useEffect } from 'react'
import { PuntoComLayout } from '../../layouts/PuntoComLayout'

export const Access: React.FC = () => {
  return (
    <PuntoComLayout>
      <div className='grid grid-cols-3'>
        <div className='lg:col-span-2'>Usuarios</div>
        <div className='lg:col-span-1'>Roles</div>
      </div>
    </PuntoComLayout>
  )
}
