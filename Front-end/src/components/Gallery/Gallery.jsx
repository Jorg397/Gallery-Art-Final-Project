import React from "react";
import s from "./gallery.module.css";
import Cards from "../Cards/Cards";
import { Link } from "react-router-dom";

export default function Gallery({ cards }) {
	return (
		<div className='flex flex-col'>
			<Cards cards={cards}></Cards>
			<Link
				to={"/gallery"}
				className={`${s.btn} self-end mr-24 mb-12 text-center`}>
				<button>Ir a Galeria</button>
			</Link>
		</div>
	);
}
