import React, { useState } from 'react'
import { useCategories, useDrawer } from '../../../../../shared/hooks'
import { ImageButton } from '../../../../../shared/components/button'
import { UploadImage } from '../../../../../shared/components/upload'

export const UploadCategoryImage: React.FC = () => {

    const { categorySelected, uploadCategoryIcon } = useCategories()
    const [ showUploadBox, setShowUploadBox ] = useState<boolean>(false)
    const { onCloseDrawers } = useDrawer()

    const uploadIcon = ( formData: FormData ) => {
        uploadCategoryIcon( categorySelected?.id!, formData )
        onCloseDrawers()
    }

    return (
        <>
            {
                showUploadBox
                ? <div className='mb-5' onClick={() => setShowUploadBox(false)}><ImageButton text="Cancelar Actualización de ícono" /></div>
                : <div className='mb-5' onClick={() => setShowUploadBox(true)}><ImageButton text="Actualizar ícono" /></div>
            }
            { showUploadBox && <UploadImage onUpload={uploadIcon} />}
        </>
    )
}
