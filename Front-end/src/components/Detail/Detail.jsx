import arrowimg from "../../assets/arroww.png";
import Cards from "../Cards/Cards";
import s from "./detail.module.css";
const Detail = () => {
	return (
		<div className={s.sectionContainer}>
			<section>
				<div
					className={` ${s.container} pt-32 flex justify-around pb-10`}>
					<div>
						<img
							src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/The_Scream_by_Edvard_Munch%2C_1893_-_Nasjonalgalleriet.png/640px-The_Scream_by_Edvard_Munch%2C_1893_-_Nasjonalgalleriet.png'
							alt='picture'
							className={`${s.mainImage}`}
						/>

						<div
							className={`flex ${s.secondImagesContainer} justify-center`}>
							<img
								src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/The_Scream_by_Edvard_Munch%2C_1893_-_Nasjonalgalleriet.png/640px-The_Scream_by_Edvard_Munch%2C_1893_-_Nasjonalgalleriet.png'
								alt=''
							/>
							<img
								src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/The_Scream_by_Edvard_Munch%2C_1893_-_Nasjonalgalleriet.png/640px-The_Scream_by_Edvard_Munch%2C_1893_-_Nasjonalgalleriet.png'
								alt=''
							/>
							<img
								src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/The_Scream_by_Edvard_Munch%2C_1893_-_Nasjonalgalleriet.png/640px-The_Scream_by_Edvard_Munch%2C_1893_-_Nasjonalgalleriet.png'
								alt=''
							/>
						</div>
					</div>

					<img src={arrowimg} alt='' className={`${s.arrow}`} />

					<div className={`${s.detailsContainer} flex flex-col`}>
						<h3 className='text-4xl text-white w-full text-center mt-10'>
							S/T 4 UNDER THE BRIDGE
						</h3>

						<div
							className={`p-10 px-16 text-2xl  text-white ${s.pSection}`}>
							<p>
								<span>Técnica: </span>
								Dibujo a pincel, tinta gouache sobre papel
							</p>
							<p>
								<span>Medida : </span> 50 x 42 cm
							</p>
							<p>
								<span>Código : </span>
								K26974
							</p>
							<p>
								<span>Año : </span>
								2015
							</p>

							<p>
								<span>Categoria: </span> Barraco, Minimalista
							</p>
							<p className='mt-12'>
								Nació en Buenos Aires en 1975 . Cursó estudios
								de arte en Paris, Francia, 1994-1998 en la
								Universidad de La Sorbonne, Paris VIII y en la
								École de Sévrès. Continuo luego sus estudios en
								la Escuela Nacional Prilidiano Pueyrredón. Desde
								2005 trabajó durante cinco años en el estudio
								Fran...
							</p>
							<a href='#' className='decoration-1'>
								Ver más
							</a>
						</div>

						<div
							className={`flex justify-between px-16 my-10 mb-5 ${s.priceSection} p-10 text-center`}>
							<p className='self-center text-white text-5xl'>
								S/. 150.00
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
