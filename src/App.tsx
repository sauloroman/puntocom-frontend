import React from 'react'
import { RoutesApp } from './router'
import { AlertContainer } from './shared/components/alert'

export const App: React.FC = () => {
  return (
    <>
      <RoutesApp />
      <AlertContainer />
    </>
  )
} 
