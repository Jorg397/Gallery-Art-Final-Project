import React from 'react'
import s from './Destacado.module.css'

export default function Destacado() {
  return (
    <div className="box-border flex flex-col mb-48 items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-1">

        <div className="box-border w-full text-white border-solid md:w-1/2 md:pl-6 xl:pl-10">
            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
            Decora a tu estilo
            </h2>
            <h4 style={{marginTop:"15px", fontWeight:"bold"}}>UNDER THE BRIDGE</h4>
            <p style={{fontWeight:"lighter"}} className="pt-4 pb-8 m-0 leading-7 border-0 border-gray-300 sm:pr-10 lg:text-lg">
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando Lorem Ipsum 
            </p>
            <button className={s.btn}>Agregar al carrito</button> <button className={s.btn} style={{marginLeft:"70px"}}>Ver mas cuadros</button>
        </div>

        <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
            <img src="https://i.ibb.co/h7NsttW/Sin-t-tulo-4.png" className="pl-4 sm:pr-10 xl:pl-10 lg:pr-32"/>
            <h1 className={s.price}>$500.00</h1>
        </div>
    </div>
  )
}
