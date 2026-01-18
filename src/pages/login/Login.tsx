import React from 'react'
import { AuthLayout } from '../../layouts'
import { LoginHeader, LoginForm } from './components'

export const Login: React.FC = () => {
  return (
    <AuthLayout
      imageDark='https://res.cloudinary.com/dlamufioy/image/upload/v1768278902/puntocom/Dise%C3%B1o_sin_t%C3%ADtulo_4_oswdzm.png'
      imageWhite='https://res.cloudinary.com/dlamufioy/image/upload/v1768278903/puntocom/Dise%C3%B1o_sin_t%C3%ADtulo_3_beh20d.png'
    >
      <div className="w-full px-2 md:px-10 lg:px-8">
        <div className='flex flex-col justify-center'>  
          <LoginHeader />
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  )
}