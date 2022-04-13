import React, { useState } from 'react'
import About from '../About/About'
import Card from '../Card/Card'
import Destacado from '../Destacado/Destacado'
import Footer from '../Footer/Footer'
import Ilustrame from '../Ilustrame/Ilustrame'
import Titulos from '../Titulos/Titulos'
import { useAuth0 } from '@auth0/auth0-react'
import Profile from '../Profile/Profile'

export default function Home() { 
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();  

    return (
        <div>
          <button onClick={()=> loginWithRedirect()}>Log-in</button>
          {
            isAuthenticated && <div>
              <img src={user.picture} alt="Profile" />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <button onClick={() => logout()}>Log out</button>
              </div>
          }

            <Titulos titulo="Cuadros decorativos"></Titulos>
            <Destacado></Destacado>
            <Titulos titulo="Una galeria explendida"></Titulos>
            <Card></Card>
            <Titulos titulo="Ilustramos tu personalidad"></Titulos>
            <Ilustrame></Ilustrame>
            <Titulos titulo="Sobre nosotros"></Titulos>
            <About></About>
            <Footer></Footer>
        </div>
    )
}