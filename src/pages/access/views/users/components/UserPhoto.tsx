import React from 'react'

interface UserPhotoProps {
    usernameInitial?: string,
    image: string
}

export const UserPhoto: React.FC<UserPhotoProps> = ({ usernameInitial, image }) => {
  return (
    <div
      className={`w-15 h-15 md:w-10 md:h-10 rounded-full flex justify-center items-center overflow-hidden bg-gray-50 shadow-lg`}
    >
      {image === 'Usuario sin imagen' || !image ? (
        <div className='text-lg font-semibold w-full h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center'>{usernameInitial}</div>
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
