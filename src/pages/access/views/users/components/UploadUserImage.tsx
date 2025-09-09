import React, { useState } from 'react'
import { ImageButton, UploadImage } from '../../../../../shared/components'


export const UploadUserImage: React.FC = () => {

    const [showUploadBox, setShowUploadBox] = useState<boolean>(false)

    const uploadIcon = (formData: FormData) => {
    
    }

    return (
        <div>
            {
                showUploadBox
                    ? <div className='mb-5' onClick={() => setShowUploadBox(false)}><ImageButton text="Cancelar Actualización de imagen" /></div>
                    : <div className='mb-5' onClick={() => setShowUploadBox(true)}><ImageButton text="Cargar imagen" /></div>
            }
            {showUploadBox && <UploadImage onUpload={uploadIcon} />}
        </div>
    )
}
