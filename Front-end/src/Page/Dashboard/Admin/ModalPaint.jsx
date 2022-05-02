import React from 'react'
import "./modal.scss"
import background from "../../../assets/background-cart-modal.png";

export default function ModalCat({ setOpenModal, modalState, img, cat, desc, name }) {
  return (
    <div
    className={`flex fixed w-full h-screen z-10 backdrop-blur top-0 left-0 bg-black bg-opacity-50 justify-center items-center ${
      !modalState ? `visible` : `invisible`
    }`}
  >
          <div
        style={{width: "55%",
          height: "90%",
         border: "4px solid #3a3f42",
         color: "white",
          backgroundColor: "#1b1b2e",backgroundImage: `url(${background})`, alignItems: "center", textAlign : "center", display: "flex", flexDirection: "column", }}
      >
  <button className="closeBtn flex items-center justify-center rounded-2xl cursor-pointer" onClick={() => setOpenModal(false)}>
            X 
          </button>
          <h1 style={{padding:"5px", fontSize:"28px", textDecoration:"underline"}}>{name}</h1>
           <img 
            style={{
              width: "300px",
              height: "auto",
              boxShadow: "8px 6px 16px 3px rgba(0, 0, 0, 0.7)",
              borderRadius: "10px",


              
            }}
           src={img} alt="" />     
          
          <p style={{padding:"5px", marginTop:"15px"}}>Categorias del producto: {cat}</p>
          <p >Descripcion: {desc}</p>
          </div>
      </div>      
  )
}
