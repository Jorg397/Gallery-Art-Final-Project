import React from 'react'

export default function ModalCat({ setOpenModal, order }) {
  console.log(order)

  return (
        <div className="modalContent">
          <span>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X 
          </button>
           {order.products.map((p, i) => (
             <p key={i} >
               <span>
                  <span>{p.sku + " "}</span>
               </span>
               <span>
               {p.name+ " "}
               </span>
                <span>
                ${p.price}.00
                </span>

            </p>))
               }     
                <p>
                  Importe total: {order.amount}
                </p>
          </span>
          <select style={{color:"black"}}>
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

      </div>      
  )
}
