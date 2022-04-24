import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/actions";
import s from "./Destacado.module.css";
import { toast } from "react-toastify";

export default function Destacado({ cards }) {
	const dispatch = useDispatch();
	let Destacado = cards[4];

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
		<div
			style={{ marginTop: "45px" }}
			className={`box-border flex flex-col mb-48 px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid  xl:mt-0 md:flex-row max-w-7xl lg:px-1 ${s.container} h-72`}>
			<div
				className={`box-border mt-32 pb-12 text-white border-solid md:w-2/4 md:pl-6 xl:pl-10 ${s.infoContainer}`}>
				<h2 className='text-5xl mb-24'>Decora a tu estilo</h2>
				<h4 className='text-2xl mb-24'>{Destacado?.name}</h4>
				<p className='text-xl'>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Pariatur obcaecati molestiae natus consectetur officia
					tempora dicta corrupti, nihil modi fugit, est facere nisi
					ipsum voluptates odit quod esse animi ab laborum qui! Nisi
					maxime velit voluptates? Est quis voluptas explicabo fugiat
					nam illo unde. Quo saepe, alias harum aut quidem, eum error
					commodi corporis nesciunt sint tempore cupiditate sunt
					dolorem veritatis accusantium delectus amet fuga aliquid
					minima voluptas consequatur necessitatibus! Beatae, error
					modi! Maxime obcaecati, saepe voluptatem provident inventore
					sapiente at aliquam, non, ad labore minus voluptatum. Quam
					ullam beatae ab laborum voluptatum nisi, reiciendis
					consequuntur voluptate expedita, corrupti quibusdam!
				</p>
				<button
					className={s.btn}
					onClick={() => {
						handleAddToCart(Destacado.id_product);
					}}>
					Agregar al carrito
				</button>
				<Link to={"/gallery"}>
					<button
						className={s.btn}
						style={{ marginLeft: "70px", color: "white" }}>
						Ver mas cuadros
					</button>
				</Link>
			</div>

			<div className='max-w-md px-4 mt-10 mb-4 text-center  md:mt-0 md:max-w-none lg:mb-0 md:w-1/2'>
				<img
					src={Destacado?.image}
					className='pl-4 sm:pr-10 xl:pl-10 lg:pr-32'
				/>
				<div className='flex text-white'>
					<div className='ml-10 mt-16 mr-64'>
						<h3 className='text-5xl font-bold mb-10'>John, Doe</h3>
						<p className='text-3xl -ml-24'>{Destacado?.name}</p>
					</div>

					<p className=' place-self-center mt-16	 text-6xl ml-64'>{`$${Destacado?.price}`}</p>
				</div>
			</div>
		</div>
	);
}
