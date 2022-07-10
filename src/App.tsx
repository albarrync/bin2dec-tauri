import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { EntryForm } from './entry-form'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h3>Bin 2 Dec</h3>
      </header>
      <div className="App-body">
        <EntryForm  />
      </div>
    </div>
  )
}

export default App
