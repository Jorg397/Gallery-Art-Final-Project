import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Card from '../Card/Card'
import { fetchPaints } from '../../redux/actions'


export default function Cards() {
	const dispatch = useDispatch()
	const paints = useSelector(state => state.filteredPaints)
	const isLoading = useSelector(state => state.isLoading)

	useEffect(() => {
		dispatch(fetchPaints())
	}, [dispatch])







  return (
		<div className='grid grid-cols-3 gap-3'>
			{isLoading ? ( <h1>Cargando...</h1> ) : (
				paints.map(e => (
					<div key={e.idProduct}>
					<Card idProduct={e.idProduct} name={e.name} serie={e.serie} measures={e.measures} categories={e.categories} price={e.price} image={e.image}/>
					</div>
				))
			)}
		</div>
  )
}
