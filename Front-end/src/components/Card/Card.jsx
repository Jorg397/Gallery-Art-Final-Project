import React from "react";
import s from "./Card.module.css";
export default function Card() {
	return (
		<div
			className={s.card}
			style={{
				background:
					"url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/The_Scream_by_Edvard_Munch%2C_1893_-_Nasjonalgalleriet.png/640px-The_Scream_by_Edvard_Munch%2C_1893_-_Nasjonalgalleriet.png)",
				backgroundSize: "cover",
			}}>
			<div className={s.cardbody}>
				<h1 className={s.cardtitle}>UNDER THE BRIDGE</h1>
				<p className={s.cardsub}>Serie/ 1 </p>
				<p className={s.cardmed}>150x150 cm</p>
				<p className={s.cardcat}>Paisaje, Minimalista.</p>
				<button className={s.cardbtn}>Agregar al carrito</button>
				<h2 className={s.cardprice}>$500.00</h2>
			</div>
		</div>
	);
}
