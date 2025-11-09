import React from 'react'

interface Props {
    message?: string,
}

export const ErrorMessageForm: React.FC<Props> = ({ message }) => {
  return (
    <p className='text-red-600 mt-1 text-right text-xs'>{message}</p>
  )
}
