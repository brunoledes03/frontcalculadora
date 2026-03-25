import React from 'react'
import Header from './components/header'
import { GlobalProvider } from './context/GlobalState'
import Balance from './components/Balance'
import IngresosEgresos from './components/IngresosEgresos'
import AddForm from './components/AddForm'
import GastosLista from './components/GastosLista'

const App = () => {
  return (
    <GlobalProvider>  
      <Header />
      <div className='container'>
        <Balance />
        <IngresosEgresos />
        <GastosLista />
        <AddForm />
      </div>
    </GlobalProvider>
    
  )
}

export default App