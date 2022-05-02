import React from 'react'
import "./modal.scss"
import background from "../../../assets/background-cart-modal.png";
import backgroundTitle from "../../../assets/background-cart-modal-title.png";
import buttonRemoveCart from "../../../assets/button_cart_remove.png";
export default function ModalCat({ setOpenModal, modalState, order }) {
  console.log(order)

  return (
    <div
    className={`flex fixed w-full h-screen z-10 backdrop-blur top-0 left-0 bg-black bg-opacity-50 justify-center items-center ${
      !modalState ? `visible` : `invisible`
    }`}
  >
      <div
        className="cartContainer grid grid-cols-1 grid-rows-5 p-6 bg-white relative h-64 rounded-3xl justify-end text-white bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      >
          
          <span>
          <button className="closeBtn flex items-center justify-center rounded-2xl cursor-pointer" onClick={() => setOpenModal(false)}>
      
            X 
          </button >
          <p>Boleta numero: {order.id_order}</p>
           {order.products?.map((p, i) => (
             <div style={{border: "2px solid gray"}} key={i}  >
               <p>

               <span>
                  <span>{p.sku + " "} - </span>
               </span>
               <span>
               {p.name+ " "} - {" "}
               </span>
                <span>
                 Price: ${p.price}.00
                </span>
               </p>
                

            </div>))
               }     
                <p>
                  Importe total: ${order.amount}.00
                </p>
                
          </span>
          <select style={{color:"black", height:"50px", marginTop:"15px"}}>
            <option value="">
              {order.order_status}
            </option>
            <option value="Pendiente">
              Pendiente
            </option>
            <option value="Enviado">
              Enviado
            </option>
            <option value="Entregado">
              Entregado
            </option>
          </select>
          <p>Datos de envio:
            {order.products?.map((p, i) => (
              <p key={i} >
                  </p>))}
                  <p>Compañia: {order.companySend}</p>
                  <p>Numero de envio: {order.codeSend}</p>
          </p>
          </div>

      </div>      
  )
}
