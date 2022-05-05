import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/actions";
import s from "./Destacado.module.css";
import { toast } from "react-toastify";

export default function Destacado({ cards }) {
  const dispatch = useDispatch();
  let Destacado = cards[0];

  const cart = useSelector((state) => state.cart);

  const handleAddToCart = (idProduct) => {
    const itsCart = cart.find((product) => product.id_product === idProduct);
    if (itsCart) {
      toast.warn("Ya fue agregado al carrito!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(addToCart(idProduct));
    }
  };
  return (
    <section className="py-20 bg-gray-50">
      <div className="container items-center max-w-6xl px-4 px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
        <div className="flex flex-wrap items-center -mx-3">
          <div className="order-1 w-full px-3 lg:w-1/2 lg:order-0">
            <div className="w-full lg:max-w-md">
              <h2 className="mb-4 text-3xl text-white font-bold leading-tight tracking-tight sm:text-4xl font-heading">
                {Destacado?.name}
              </h2>
              <p className="mb-4 font-medium tracking-tight text-gray-400 xl:mb-6">
                {Destacado?.description}
              </p>
              <ul>
                <li className="flex items-center text-center py-2 space-x-4 xl:py-3">
                  <span
                    style={{ fontSize: "24px" }}
                    className="text-white text-center"
                  >
                    ${Destacado?.price}.00
                  </span>
                </li>
                <li className="flex items-center py-2 space-x-4 xl:py-3">
                  <button
                    className={s.btn}
                    onClick={() => {
                      handleAddToCart(Destacado.id_product);
                    }}
                  >
                    Agregar al carrito
                  </button>
                  <Link to={"/gallery"}>
                    <button className={s.btn} style={{ maxWidth: "220px" }}>
                      Ver mas cuadros
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0">
            <img
              className=" rounded-md sm:rounded-xl shadow-x2"
              src={Destacado?.image}
              alt="No se encontró una imagen"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
