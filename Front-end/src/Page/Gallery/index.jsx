import s from "./gallery.module.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchPaints,
	filterByCategory,
	getCategories,
} from "../../redux/actions";
import Cards from "../../components/Cards/Cards";
import divider from "../../assets/divider.png";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const Gallery = () => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const paints = useSelector((state) => state.filteredPaints);

	const [filter, setFilter] = useState(false);

	useEffect(() => {
		dispatch(fetchPaints());
		dispatch(getCategories());
	}, []);

	const handleSelect = (e) => {
		let value = e.target.value;
		if (value === "All") {
			setFilter(false);
			return dispatch(filterByCategory(value));
		}

		dispatch(filterByCategory(value));
		setFilter(true);
	};
	return (
		<>
			<NavBar />
			<div className={`text-white pt-24 ${s.container}`}>
				<h3 className='text-3xl border-b-2 inline-block ml-12'>
					Gallery
				</h3>
				<div className='flex justify-end mr-24'>
					<p className='mr-8 text-2xl self-center'>Filtros: </p>

					<select
						name='filtros'
						className={`${s.selectInput}`}
						onChange={(e) => handleSelect(e)}>
						<option value='All'>All</option>
						<optgroup label='Categorias'>
							{categories.map((category) => {
								return (
									<option value={category.name}>
										{category.name}
									</option>
								);
							})}
						</optgroup>
					</select>
				</div>

				<Cards cards={paints} />

				{filter ? null : (
					<>
						{categories.map((category) => {
							return (
								<div>
									<h3 className='text-3xl border-b-2 inline-block ml-12'>
										{category.name}
									</h3>
									<img src={divider} className='w-full' />

									<Cards
										cards={paints.filter(
											(paint) =>
												paint.categories[0].name ===
													category.name ||
												paint.categories[1].name ===
													category.name
										)}
									/>
								</div>
							);
						})}
					</>
				)}
			</div>
			<Footer />
		</>
	);
};

export default Gallery;
