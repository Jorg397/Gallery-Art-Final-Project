import React from 'react'
import NavAdmin from './NavAdmin.jsx'

export default function Admin() {
  return (
    <div>
      <NavAdmin></NavAdmin>
      <div style={{margin:"20px",}}/>
    <div className="box-border flex flex-col mb-48 items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-1">
        <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-white bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2"> 
            <h1 style={{marginBottom:"30px", marginLeft:"30px", fontSize:"20px"}}>Hola USER es bueno verte</h1>
            <img src="https://i.ibb.co/Fn4SJrj/Group-60-1.png" alt="" />
        </div>

        <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-white bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
        <h1 style={{marginBottom:"8px", marginLeft:"0px", fontSize:"20px"}}>Revisa tus pedidos pendientes de envio</h1>
            <div>
               <img src="https://i.ibb.co/4d7znyT/Group-61.png" alt="" />
            </div>
            <div style={{marginTop:"20px", marginBottom:"20px"}}>
                <img src="https://i.ibb.co/RzfLYt0/Group-61-1.png" alt="" />
            </div>
 
        </div>
    </div>
    </div>
  )
}

