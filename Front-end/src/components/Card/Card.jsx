import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import s from "./Card.module.css";


export default function Card({ name, serie, measures, categories, price, image, idProduct }) {
	  const dispatch = useDispatch();

	return (
		<div
			id={idProduct}
			className={s.card}
			style={{
				background: `url(${image}) no-repeat center center`,
				backgroundSize: "cover",
			}}>
			<div className={s.cardbody}>
				<h1 className={s.cardtitle}>{name}</h1>
				<p className={s.cardsub}>{serie} </p>
				<p className={s.cardmed}>{measures}</p>
				<p className={s.cardcat}>{categories.map(e=> e.name)+" "}</p>
				<Link key={idProduct}
					onClick={()=>dispatch(getDetail(idProduct))}
					to={`/details/${idProduct}`}
				>
				<button className={s.cardbtn} type="submit">Agregar al carrito</button>
				</Link>
				<h2 className={s.cardprice}>$ {price}</h2>
			</div>
		</div>
	);
}
