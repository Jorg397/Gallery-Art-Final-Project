import React from 'react'
import NavBar from '../NavBar/NavBar'
import s from "./Landing.module.css"
import a from "../NavBar/NavBar.module.css"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"


// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';
import SliderCard from "../SliderCard/SliderCard";
SwiperCore.use([Navigation]);

export default function Landing() {
    return (
        <div className={s.container}>
            <nav style={{ borderRadius: "10px", margin: "8px" }} className="flex items-center justify-between flex-wrap p-2">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <span className={a.title}>
                        Art<span className={a.titleS}>.</span>Gallery
                    </span>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                    </div>
                    <div>
                        <a href="/home" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12">
                            Inicio
                        </a>
                        <a href="/home#gallery" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12">
                            Obras
                        </a>
                        <a href="/home#about" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12">
                            About
                        </a>
                        <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12">
                            Iniciar sesion
                        </a>
                        <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-8">
                            Registrarse
                        </a>
                    </div>
                </div>
            </nav>

            <div>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <Swiper navigation={true}>
                        <SwiperSlide>
                            <img src='https://i.ibb.co/fD4cXC3/2.png'/>
                        </SwiperSlide>
                        <SwiperSlide>
                        <img src='https://i.ibb.co/TWVT7yd/Sin-t-tulo-2.png'/>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
