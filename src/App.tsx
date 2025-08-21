import React from 'react'
import { RoutesApp } from './router/Routes'
import { Provider } from 'react-redux'
import { store } from './store'

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RoutesApp />
    </Provider>
  )
} 
