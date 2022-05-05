import React from "react";
import { Link } from "react-router-dom";
import s from "./NavAdmin.module.css";

//export a function that returns a component that renders a navbar with links to Inicio, Productos, Clientes and Ordenes

export default function NavAdmin() {
  return (
    <div
      id="admin"
      style={{ background: "#ffffff4a", padding: "28px" }}
      className="flex justify-between items-center p-4"
    >
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link
          to="/home"
          className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12"
        >
          <span className={s.title}>Sotelino</span>
        </Link>
      </div>
      <div className="text-sm lg:flex-grow"></div>
      <div className="flex justify-center items-center content-center">
        <Link
          to="/home"
          className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12 "
        >
          Inicio
        </Link>
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
          to="/dashboard/paints"
          className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12"
        >
          Pinturas
        </Link>

        <Link
          to="/dashboard/categories"
          className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12"
        >
          Categorias
        </Link>
      </div>
    </div>
  );
}
