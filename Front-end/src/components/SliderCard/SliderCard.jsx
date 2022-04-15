import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDetail } from '../../redux/actions'
import  s  from "./SliderCard.module.css"


export default function SliderCard({e}) {
    const dispatch = useDispatch()
  return (

    <div className="box-border flex flex-col mb-48 items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-1">

        <div className="box-border w-full text-white border-solid md:w-1/2 md:pl-6 xl:pl-20">
            <h2 className="m-0 text-xl font-light leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
        {e.name}
            </h2>
            <p className="pt-4 pb-8 m-0 leading-7 text-white-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
                Descripcion:
            </p>
            <p >
               {e.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, consequatur officia! Modi veritatis, ad doloribus eveniet distinctio fuga iste quidem animi laboriosam odio incidunt voluptatem vitae eos nam. Omnis, atque.lore Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, non aspernatur! Reprehenderit, repudiandae dolore a non in id officia ipsum quas numquam suscipit corporis, culpa quia sit, facere corrupti soluta.
            </p>
            <h1 style={{fontSize:"30px", marginTop:"30px", marginBottom:"30px"}}>$ {e.price}</h1>
            <Link key={e.idProduct}
					onClick={()=>dispatch(getDetail(e.idProduct))}
					to={`/details/${e.idProduct}`}
				>
				<button className={s.cardbtn}>Agregar al carrito</button>
				</Link>
        </div>


        <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
            <span className='flex'  style={{marginTop:"30px",}}>
                <img src={`${e.image[0]}`} style={{width:"450px", height:"450px", position:"relative", left:"20px", }} className="pl-4 sm:pr-10 xl:pl-10 lg:pr-32"/>
                <img src={`${e.image[1]}`} style={{width:"450px", height:"450px", position:"relative", left:"-130px"}} className="pl-4 sm:pr-10 xl:pl-10 lg:pr-32"/>
                </span>
            
        </div>
    </div>

  )
}
