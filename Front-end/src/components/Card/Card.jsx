import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail, addToCart } from "../../redux/actions";
import s from "./Card.module.css";
import { toast } from "react-toastify";

export default function Card({
  name,
  serie,
  measures,
  categories,
  price,
  image,
  idProduct,
}) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = (idProduct) => {
    const itsCart = cart.find((product) => product.id_product === idProduct);
    if (itsCart) {
      toast.warn("Ya fue agregada al carrito!", {
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
    <div
      id={idProduct}
      className={s.card}
      style={{
        background: `url(${image}) no-repeat center center`,
        backgroundSize: "cover",
      }}
    >
      <div className={s.cardbody}>
        <Link
          key={idProduct}
          onClick={() => dispatch(getDetail(idProduct))}
          to={`/details/${idProduct}`}
        >
          <h1 className={s.cardtitle}>{name.toUpperCase()}</h1>
        </Link>
        <p className={s.cardsub}>Serie: {serie} </p>
        <p className={s.cardmed}>Medidas: {measures}</p>
        <p className={s.cardcat}>
			{console.log("categorias card filter", categories)}
          {categories &&
            categories.map((e, index) => {
              return (
                <p
                  key={index}
                  style={{ display: "inline-block", margin: "0 2px" }}
                >
                  {e.name   || e}
                </p>
              );
            })}
        </p>
        <button
          className={s.cardbtn}
          onClick={() => {
            handleAddToCart(idProduct);
          }}
        >
          Agregar al carrito
        </button>
        <span className={s.cardprice}>$ {price}</span>
      </div>
    </div>
  );
}
