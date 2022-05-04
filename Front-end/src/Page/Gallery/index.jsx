import s from "./gallery.module.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchPaints,
	filterByCategory,
	filterByPrice,
	getCategories,
	searchPaintThatContains,
} from "../../redux/actions";
import Cards from "../../components/Cards/Cards";
import divider from "../../assets/divider.png";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const Gallery = () => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const [search, setSearch] = useState("");
	const paints = useSelector((state) => state.filteredPaints);


	let filterAviablePaints = paints.filter((paint) => paint.state === "Available");


	const [filter, setFilter] = useState(false);

	useEffect(() => {
		dispatch(fetchPaints());
		dispatch(getCategories());
	}, []);

	const handleChange = (e) => {
		dispatch(searchPaintThatContains(e.target.value))
		setSearch(e.target.value);
	};

	const handleSelect = (e) => {
		let value = e.target.value;
		if (value === "All") {
			setFilter(false);
			return dispatch(filterByCategory(value));
		}
		if (value === "MAX" || value === "MIN") {
			setFilter(true);
			return dispatch(filterByPrice(value));
		}
		dispatch(filterByCategory(value));
		setFilter(true);
	};

	return (
		<>
			<NavBar />
			<div className={`text-white pt-24 ${s.container}`}>
				<h3 className='text-3xl border-b-2 inline-block ml-12'>
					Galeria de obras:
				</h3>
				<div className='flex justify-end mr-24'>
					<p className='mr-8 text-2xl self-center'>
						Filtros: 
					</p>

					<select
						name='filtros'
						className={`${s.selectInput}`}
						onChange={(e) => handleSelect(e)}>
						<option value='All'>All</option>
						<optgroup label='Categorias'>
							{categories?.map((category) => {
								return (
									<option value={category?.name}>
										{category?.name}
									</option>
								);
							})}
						</optgroup>
						<optgroup label='Precio'>
							<option value='MAX'>Max-Min</option>
							<option value='MIN'>Min-Max</option>
						</optgroup>
					</select>
								<input className={`${s.selectInput2} ml-3`}   type="text" placeholder=" Buscar..." onChange={handleChange} />
				</div>

				<Cards cards={filterAviablePaints} />

				
			</div>
			<Footer />
		</>
	);
};

export default Gallery;
