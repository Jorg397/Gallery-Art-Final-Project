import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <Link style={{
							marginLeft: "5px",
							textDecoration: "underline",
							fontSize: "14px",
							color: "white",
						}} to="/home">Go to Home</Link>
    </div>
  )
}
