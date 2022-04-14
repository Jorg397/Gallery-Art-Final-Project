import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Home from './components/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

function App() {


  return (
    <Routes>
    <Route path="/home" element={<Home/>}/>
    <Route path="/" element={<Home/>}/>
 
   

    </Routes> 

  )
}

export default App
