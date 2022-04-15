import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card/Card'



export default function Cards({cards}) {

	const isLoading = useSelector(state => state.isLoading)



  return (
<div className="container my-12 mx-auto px-4 md:px-12">
    <div className="flex flex-wrap -mx-1 lg:-mx-4">
			{isLoading ? (<Loading/>) : (
				cards?.map(e => (
					<div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" key={e.idProduct}>
					<Card idProduct={e.idProduct} name={e.name} serie={e.serie} measures={e.measures} categories={e.categories} price={e.price} image={e.image}/>
					</div>
				))
			)}
		</div>
	</div>
  )
}
