import React, { useEffect, useState } from 'react'
import NavAdmin from './NavAdmin'



export default function Clientes() {
    return (
        <div>
            <NavAdmin></NavAdmin>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <img src="https://i.ibb.co/hyhzpqV/Group-61-3.png" alt="" />
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                <a href='asd'><button style={{ background: "grey", width: "250px" }}>Pagination</button></a>
            </div>
        </div>
    )
}