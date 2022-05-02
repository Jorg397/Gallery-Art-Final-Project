import React from 'react'

export default function ModalCat({ setOpenModal, desc }) {
  return (
        <div className="modalContent">
          <span>
          <button
            onClick={() => {
              setOpenModal({});
            }}
          >
            X 
          </button>
           <span> {desc}</span>        
          </span>
      </div>      
  )
}
