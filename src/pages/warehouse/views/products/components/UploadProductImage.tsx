import React, { useState } from 'react'
import { useDrawer, useProducts } from '../../../../../shared/hooks'
import { ImageButton } from '../../../../../shared/components/button'
import { UploadImage } from '../../../../../shared/components/upload'

export const UploadProductImage: React.FC = () => {
    
    const [showUploadBox, setShowUploadBox] = useState<boolean>(false)
    const { onCloseDrawers } = useDrawer()
    const { onUploadProductImage, productSelected} = useProducts()

    const uploadIcon = ( formData: FormData ) => {
        onUploadProductImage( productSelected?.id!, formData )
        onCloseDrawers()
    }

    return (
        <>
            {
                showUploadBox
                ? <div className='mb-5' onClick={() => setShowUploadBox(false)}><ImageButton text="Cancelar Actualización de ícono" /></div>
                : <div className='mb-5' onClick={() => setShowUploadBox(true)}><ImageButton text="Actualizar ícono" /></div>
            }
            {showUploadBox && <UploadImage onUpload={uploadIcon} />}
        </>
    )
}
