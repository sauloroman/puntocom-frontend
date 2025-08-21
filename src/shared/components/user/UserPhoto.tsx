import React from 'react'

interface UserPhotoProps {
    usernameInitial?: string,
    image: string
}

export const UserPhoto: React.FC<UserPhotoProps> = ({ usernameInitial, image }) => {
  return (
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center overflow-hidden bg-gray-50`}
    >
      {image === 'Usuario sin imagen' || !image ? (
        <span className='text-lg font-semibold text-gray-700'>{usernameInitial}</span>
      ) : (
        <img
          className='object-cover w-full h-full rounded-full'
          src={image}
          alt="Imagen del usuario"
        />
      )}
    </div>
  )
}
