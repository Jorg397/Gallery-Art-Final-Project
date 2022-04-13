import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Home from './components/Home/Home'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
    <Route path="/home" element={<Home/>}/>
    <Route path="/" element={<Home/>}/>

    </Routes> 

  )
}

export default App
