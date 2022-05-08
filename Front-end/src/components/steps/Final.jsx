import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cleanCart } from "../../redux/actions";

export default function Final() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanCart());
    localStorage.setItem("cart", "[]");
  }, []);
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <div className="mt-3 text-xl font-semibold uppercase text-green-500">
          Gracias por su compra
        </div>
        <div className="text-lg font-semibold text-gray-500 text-center">
          <p>
            En unos minutos le llegara la confirmación en el correo registrado.
            <br></br>
            Sino le llega el correo puede escribirnos a nuestro numero Whatsapp{" "}
            <Link
              to="https://www.whatsapp.com"
              target="_blank"
              className="text-white"
            >
              985623586
            </Link>
            <br></br>
            Mencionando que no recibio el correo de confirmación.
          </p>
        </div>
        <Link to="/shopping" className="mt-10">
          <button className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100">
            Ver Ordenes
          </button>
        </Link>
      </div>
    </div>
  );
}
