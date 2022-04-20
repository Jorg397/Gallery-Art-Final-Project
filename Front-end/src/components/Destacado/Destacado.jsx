import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import s from "./Destacado.module.css";

export default function Destacado({ cards }) {
	const dispatch = useDispatch();
	let Destacado = cards[4];
	console.log(Destacado);

	return (
		<div
			style={{ marginTop: "90px" }}
			className='box-border flex flex-col mb-48 items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-1'>
			<div className='box-border w-full text-white border-solid md:w-1/2 md:pl-6 xl:pl-10'>
				<h2 className='m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl'>
					Decora a tu estilo
				</h2>
				<h4 style={{ marginTop: "15px", fontWeight: "bold" }}>
					{Destacado?.name}
				</h4>
				<p
					style={{ fontWeight: "lighter" }}
					className='pt-4 pb-8 m-0 leading-7 border-0 border-gray-300 sm:pr-10 lg:text-lg'>
					{Destacado?.description} Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Nostrum porro tenetur quia
					quis asperiores consequatur laboriosam. Laboriosam
					voluptatem velit ipsum excepturi enim similique. Asperiores,
					sequi. Soluta ipsum quidem maiores facere?
				</p>
				<Link
					key={Destacado?.idProduct}
					onClick={() => dispatch(getDetail(Destacado?.idProduct))}
					to={`/details/${Destacado?.idProduct}`}>
					<button className={s.btn}>Agregar al carrito</button>
				</Link>{" "}
				<a href='/home#gallery'>
					<button
						className={s.btn}
						style={{ marginLeft: "70px", color: "white" }}>
						Ver mas cuadros
					</button>
				</a>
			</div>

			<div className='box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2'>
				<img
					src={Destacado?.image}
					className='pl-4 sm:pr-10 xl:pl-10 lg:pr-32'
				/>
				<h1 className={s.price}>$ {Destacado?.price}.00</h1>
			</div>
		</div>
	);
}
