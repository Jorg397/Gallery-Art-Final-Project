import { useSelector } from "react-redux";
import arrowimg from "../../assets/arroww.png";
import Cards from "../Cards/Cards";
import s from "./detail.module.css";
import { useDispatch } from "react-redux";
import { fetchPaints, getDetail } from "../../redux/actions";
import { useEffect } from "react";

const Detail = () => {
	  const dispatch = useDispatch();	
	  useEffect(() => {
		dispatch(fetchPaints())
	}, [dispatch])
	  const resp = useSelector((state) => state.detail);
	  console.log(resp);



	return (
		<div className={s.sectionContainer} >
			<section>
				<div
					className={` ${s.container} pt-32 flex justify-around pb-10`}>
					<div>
						<img
							src={`${resp?.image[0]}`}
							alt='picture'
							className={`${s.mainImage}`}
						/>

						<div
							className={`flex ${s.secondImagesContainer} justify-center`}>
							<img
								src={`${resp?.image[0]}`}
								alt=''
							/>
							<img
								src={`${resp?.image[0]}`}
								alt=''
							/>
							<img
								src={`${resp?.image[0]}`}
								alt=''
							/>
						</div>
					</div>

					<img src={arrowimg} alt='' className={`${s.arrow}`} />

					<div className={`${s.detailsContainer} flex flex-col`}>
						<h3 className='text-4xl text-white w-full text-center mt-10'>
							{resp?.name}
						</h3>

						<div
							className={`p-10 px-16 text-2xl  text-white ${s.pSection}`}>
							<p>
								<span>Técnica: </span>
								{resp?.technique}
							</p>
							<p>
								<span>Medida : </span> {resp?.measures}
							</p>
							<p>
								<span>Código : </span>
								{resp?.idProduct}
							</p>
							<p>
								<span>Año : </span>
								{resp?.released}
							</p>

							<p>
								<span>Categoria: </span> {resp?.categories.map(e=> e.name)+" "}
							</p>
							<p className='mt-12'>
								{resp?.description}
							</p>
							<a href='#' className='decoration-1'>
								Ver más
							</a>
						</div>

						<div
							className={`flex justify-between px-16 my-10 mb-5 ${s.priceSection} p-10 text-center`}>
							<p className='self-center text-white text-5xl'>
								$ {resp?.price}
							</p>
							<button className={`${s.button}`}>
								Agregar al carrito
							</button>
						</div>

						<p className='text-xl text-white mx-5 my-5'>
							* El pago del envio sera cubierto por cada comprador
							de las cuales se referenciara el costo con la
							direccion de envio y se coordinara con el venderdor
							via whatsApp
						</p>
					</div>
				</div>
			</section>

			<section className='mt-16 text-2xl'>
				<p className='uppercase text-gray-500 ml-24'>
					Ver más de{" "}
					<span className='text-white'>arte abstracto</span>
				</p>

				<div className='flex'>
					<Cards />
				</div>
			</section>
		</div>
	);
};

export default Detail;