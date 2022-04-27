import React from 'react'

export default function ModalCat({ setOpenModal, cat }) {
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
           <span> {cat}</span>        
          </span>
      </div>      
  )
}
