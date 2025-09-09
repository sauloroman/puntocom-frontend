import React, { useState } from 'react'
import { ImageButton, UploadImage } from '../../../../../shared/components'
import { useDrawer, useUsers } from '../../../../../shared/hooks'


export const UploadUserImage: React.FC = () => {

    const { onCloseDrawers } = useDrawer()
    const { uploadUserImage, userSelected } = useUsers()
    const [showUploadBox, setShowUploadBox] = useState<boolean>(false)

    const uploadImage = (formData: FormData) => {
        uploadUserImage(userSelected?.id!, formData)
        onCloseDrawers()
    }

    return (
        <div>
            {
                showUploadBox
                    ? <div className='mb-5' onClick={() => setShowUploadBox(false)}><ImageButton text="Cancelar Actualización de imagen" /></div>
                    : <div className='mb-5' onClick={() => setShowUploadBox(true)}><ImageButton text="Cargar imagen" /></div>
            }
            {showUploadBox && <UploadImage onUpload={uploadImage} />}
        </div>
    )
}
