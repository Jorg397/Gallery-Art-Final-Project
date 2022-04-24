import React from 'react'
import { Link } from 'react-router-dom'
import s from './NavAdmin.module.css'

//export a function that returns a component that renders a navbar with links to Inicio, Productos, Clientes and Ordenes

export default function NavAdmin() {
    return (
        <div style={{ background: "#ffffff4a", borderRadius: "15px", margin: "5px" }} className="flex justify-between items-center p-4">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link to="/home"
                    className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12">
                    <span className={s.title}>
                        Art<span className={s.titleS}>.</span>Gallery
                    </span>
                </Link>
            </div>
            <div className="text-sm lg:flex-grow"></div>
            <div className="flex justify-center items-center content-center">
                <Link
                    to="/dashboard"
                    className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12 "

                >
                    Pedidos
                </Link>
                <Link
                    to="/dashboard/clients"
                    className="block mt-4 lg:inline-block lg:mt-0 text-gray-200
                hover:text-white mr-12"
                >
                    Clientes
                </Link>

                <Link
                    to="/dashboard/orders"
                    className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12"
                >
                    Pinturas
                </Link>

                <Link
                    to="/dashboard/orders"
                    className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12"
                >
                    Username
                </Link>
            </div>
        </div>
    )
}
