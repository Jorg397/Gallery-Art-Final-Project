//returns a navbar component styled with tailwind that contains title and links to home, obras, about, iniciar sesion and registrarse
import React from 'react'
import s from './NavBar.module.css'

export default function NavBar() {
  return (
    <nav style={{backgroundColor:"#ffffff4a", borderRadius:"10px",margin:"8px"}} className="flex items-center justify-between flex-wrap p-2">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className={s.title}>
                Art<span  className={s.titleS}>.</span>Gallery
            </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
            </div>
            <div>
                <a href="/home" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12">
                    Inicio
                </a>
                <a href="/home#gallery" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12">
                    Obras
                </a>
                <a href="/home#about" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12">
                    About
                </a>
                <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12">
                    Iniciar sesion 
                </a>
                <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-8">
                    Registrarse 
                </a>
            </div>
        </div>
    </nav>

  )
}
