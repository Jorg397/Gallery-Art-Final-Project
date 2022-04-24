import React from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./SliderCard.module.css";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions";

export default function SliderCard({ e }) {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	const handleAddToCart = (idProduct) => {
		const itsCart = cart.find(
			(product) => product.id_product === idProduct
		);
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
		<div className='flex'>
			<div className={`text-white w-1/3 ${s.info}`}>
				<h2 className=' text-5xl font-thin'>{e.name}</h2>

				<p className='text-2xl mt-16'>Descripción</p>

				<p className='text-xl mt-10'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Officia nesciunt nostrum facere iste corrupti. Doloremque
					totam est fugit, error ullam deserunt quasi earum dolore
					velit quidem, molestias omnis reiciendis nobis ea quaerat
					quos culpa inventore mollitia quam, quia corrupti nemo quas
					corporis ratione? Pariatur possimus nisi ipsum dolore facere
					commodi fugiat, deleniti officia velit ea assumenda neque
					quo explicabo praesentium sequi, voluptas porro deserunt
					quos omnis vel illo quisquam accusamus? Repellat nihil
					necessitatibus sunt, praesentium, dolorem at delectus
					distinctio recusandae officia, corporis deleniti quo
					expedita? Soluta odit voluptatem sit. Illum laborum suscipit
					rerum voluptatem culpa, iste ratione officia nemo in.
				</p>

				<p className='text-6xl mt-10'>{`$${e.price}`}</p>

				<button
					className={`${s.cardbtn} mt-10`}
					onClick={() => {
						handleAddToCart(e.id_product);
					}}>
					Agregar al Carrito
				</button>
			</div>
			<div className={s.imageContainer}>
				<img src={e.image} alt={e.name} className='mr-10' />
			</div>
		</div>
	);
}
