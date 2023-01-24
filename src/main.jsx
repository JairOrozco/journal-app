// React
import React from 'react'
import ReactDOM from 'react-dom/client'

//import componentes
import { JournalApp } from './JournalApp'

//import react router
import { BrowserRouter } from 'react-router-dom'

//import redux
import { Provider } from 'react-redux'
import { store } from './store'

//import estilos
import './index.css'





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store } >
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
