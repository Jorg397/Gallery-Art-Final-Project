import React from 'react'

export default function ModalCat({ setOpenModal, img }) {
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
           <span><img 
            style={{
              width: "100px"
            }}
           src={img} alt="" /></span>      
          </span>
      </div>      
  )
}
