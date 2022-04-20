import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail, addToCart } from "../../redux/actions";
import s from "./Card.module.css";

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
		const itsCart = cart.find(
			(product) => product.id_product === idProduct
		);
		if (itsCart) {
			alert("Ya esta en el carrito");
		} else {
			dispatch(addToCart(idProduct));
			alert("Agregado al carrito");
		}
	};

	return (
		<div
			id={idProduct}
			className={s.card}
			style={{
				background: `url(${image}) no-repeat center center`,
				backgroundSize: "cover",
			}}>
			{console.log(name)}
			<div className={s.cardbody}>
				<Link
					key={idProduct}
					onClick={() => dispatch(getDetail(idProduct))}
					to={`/details/${idProduct}`}>
					<h1 className={s.cardtitle}>{name.toUpperCase()}</h1>
				</Link>
				<p className={s.cardsub}>{serie} </p>
				<p className={s.cardmed}>{measures}</p>
				<p className={s.cardcat}>
					{categories.map((e) => `${e.name}  `) || categories}
				</p>
				<button
					className={s.cardbtn}
					onClick={() => {
						handleAddToCart(idProduct);
					}}>
					Agregar al carrito
				</button>
				<span className={s.cardprice}>$ {price}</span>
			</div>
		</div>
	);
}
