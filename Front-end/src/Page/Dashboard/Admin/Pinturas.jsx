import React, { useEffect } from 'react'
import NavAdmin from './NavAdmin'


export default function Pinturas() {

  return (
    <div>

      <NavAdmin></NavAdmin>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <div style={{ minWidth: "1200px", borderRadius: "10px" }}>

        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <img src="https://i.ibb.co/d5tk95C/Group-61-2.png" alt="" />
      </div>
    </div>
  )
}
