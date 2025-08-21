import React from 'react'
import { RoutesApp } from './router/Routes'
import { AlertContainer } from './shared/components/AlertContainer'

export const App: React.FC = () => {
  return (
    <>
      <RoutesApp />
      <AlertContainer />
    </>
  )
} 
