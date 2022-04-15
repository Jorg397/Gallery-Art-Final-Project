import React from 'react'
import { useDispatch } from 'react-redux'
import { filterByCategory, filterByPrice } from '../../redux/actions'
import Cards from '../Cards/Cards'

export default function Gallery({cards, categories}) {
    const dispatch = useDispatch()
    let filterCards = cards

    function handleCategory(e) {
		dispatch(filterByCategory(e.target.value))
	}
    
    function handlePrice(e) {
        dispatch(filterByPrice(e.target.value))
    }


    return (

        <div id='gallery'>
            <select style={{background:"none", border:"2px solid white", padding:"8px", color:"white", borderRadius:"9px", marginLeft:"20px"}}onChange={e => handlePrice(e)}>
                <option style={{color:"black"}}value='MAX'>Filtrar por precio</option>
                <option style={{color:"black"}}value="MIN">Max-Min</option>
                <option style={{color:"black"}}value="MAX">Min-Max</option>
            </select>
            <select style={{background:"none", border:"2px solid white", padding:"8px", color:"white", borderRadius:"9px", marginLeft:"20px"}} onChange={(e) => handleCategory(e)}>
                <option value="All" style={{color:"gray"}}>Todas las categorias</option>
                {
                categories?.map((category, i) => (
                    <option 
                        key={i}
                        value={category.name}
                        style={{color:"black"}}
                    >
                        {category.name}
                    </option>
                ))
                } 
            </select>
            <Cards cards={filterCards}></Cards>
        </div>
    )
}
