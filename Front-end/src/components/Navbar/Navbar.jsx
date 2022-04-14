import React from "react";
import { Link} from 'react-router-dom';
import style from '../Navbar/Navbar.css'
import Car from './../../Image/car.png'
// import Search  from './../../Image/search.png'


export default function Navbar() {
  return (
    <div className=" w-auto p-4 bottom-0 h-auto relative bg-gray-600 " style={{color: 'white'}} >
    <div className="lg:flex  lg:mt-2 md:mx-5 lg:mx-18 lg:justify-between "> 
      <h1 className='text-2xl font-bold text-center uppercase'>Art<label style={{fontSize:"38px", fontWeight:"bold", color:"rgb(0, 173, 173)"}}>.</label>Gallery</h1> 
  

      <div className="pt-0 relative mx-auto text-gray-600">
        <input className="border-4 border-gray-300 bg-white h-11 px-6 pr-16  rounded-lg text-sm focus:outline-none"
          type="search" name="search" placeholder="Search"/>
        <button type="submit" className="absolute right-0 top-11 mt-6 mr-0 ml-4  ">
        <svg  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  mr-10 text-black-400 hover:text-blue-400 transition duration-100 cursor-pointer" 
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        </button>
      </div>





     {/* <form>
        <input className={style.input} type="text" placeholder="Buscar Obras..." /> 
        </form>
        {/* <img className={style.lupa} src={Search}/> */}
   
    
   
      {/* <input className={style.input} type="text" placeholder="  Buscar Obras..." />
      <button>
        <span>
        <svg  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  mr-10 text-gray-400 hover:text-blue-400 transition duration-100 cursor-pointer" 
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        </span>
      </button>
     */}
  

  
      {/* <input className={input}type='text' placeholder=" Buscar Obras..."/>
      <button className=" w-96  mr-5  justify-center px-5 ">
             <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
               <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
              </svg>
          </button>
          */}
   
    
        {/* <div className='hidden md:flex gap-8 p-6  bg-white/15'>  */}
        <ul className='hidden md:flex gap-8 p-6 bg-white/10' style={{alingItems:'flex-end'}}>
        <li><Link to='/'>Inicio</Link></li>
        <li><Link to='/'>Obras</Link></li>
        <li><Link to='/'>Sobre Nosotros</Link></li>
        <li><Link to='/'>Iniciar Sesión</Link></li>
        <li><Link to='/'>Registrarse</Link></li>
        <li><Link to='/'></Link></li>
<button>
<img className={style.img} src={Car}/>
</button>

  

       
        {/* <a style={{marginLeft:"10px", textDecoration:"underline"}}href="https://www.iraldiban.com/Inicio">Inicio</a>
        <a style={{marginLeft:"10px", textDecoration:"underline"}}href="https://www.iraldiban.com/Obras">Obras</a>
        <a style={{marginLeft:"10px", textDecoration:"underline"}}href="https://www.iraldiban.com/about">Sobre nosotros</a>
        <a style={{marginLeft:"10px", textDecoration:"underline"}}href="https://www.iraldiban.com/Login">Iniciar Sesión</a>
        <a style={{marginLeft:"10px", textDecoration:"underline"}}href="https://www.iraldiban.com/registrarse">Registrarse</a> */}
        </ul>
    {/* </div>  */}

   
    </div> 
    
</div>


)
}
