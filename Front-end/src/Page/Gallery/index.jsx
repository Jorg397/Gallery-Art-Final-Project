import s from "./gallery.module.css";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPaints, getCategories } from "../../redux/actions";
import Cards from "../../components/Cards/Cards";

const Gallery = () => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const paints = useSelector((state) => state.paints);

	useEffect(() => {
		dispatch(fetchPaints());
		dispatch(getCategories());
	}, []);

	return (
		<div className='text-white md:p-20'>
			<h3 className='text-3xl border-b-2 inline-block'>Gallery</h3>

			<div className='flex justify-end'>
				<p className='mr-8 text-2xl self-center'>Filtros: </p>

				<select name='filtros' className={`${s.selectInput}`}>
					<option value='reset'>All</option>
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

			{categories.map((category) => {
				return (
					<div>
						<h3 className='text-3xl border-b-2 inline-block'>
							{category.name}
						</h3>

						<Cards
							cards={paints.filter(
								(paint) =>
									paint.categories[0].name ===
										category.name ||
									paint.categories[1].name === category.name
							)}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Gallery;
