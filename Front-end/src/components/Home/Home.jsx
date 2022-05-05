import React, { useEffect, useState, useRef } from "react";
import About from "../About/About";
import Destacado from "../Destacado/Destacado";
import Footer from "../Footer/Footer";
import Ilustrame from "../Ilustrame/Ilustrame";

import Titulos from "../Titulos/Titulos";

import s from "./home.module.css";
import Comments from "../Comments/index";
import Gallery from "../Gallery/Gallery";
import { useSelector, useDispatch } from "react-redux";
import { fetchPaints, getCategories } from "../../redux/actions";

import NavBar from "../NavBar/NavBar";

export default function Home() {
  const dispatch = useDispatch();
  const paints = useSelector((state) => state.filteredPaints);
  let filterAviablePaints = paints.filter((paint) => paint.state === "Available");
  const categories = useSelector((state) => state.categories);
  const scrollToSection = (sectionref) => {
    window.scrollTo({
      top: sectionref.current.offsetTop,
      behavior: "smooth",
    });
  };
  const gallery = useRef(null);
  const about = useRef(null);
  const slider = useRef(null);

  useEffect(() => {
    dispatch(fetchPaints());
    dispatch(getCategories());
  }, [dispatch]);

  const handleClickPicture = () => {
    window.location.href = "/gallery";
  };

  const handleClickAbout = () => {
    scrollToSection("about");
  };

  return (
    <div className={s.container}>
      <NavBar
        gallerySection={gallery}
        aboutSection={about}
        sliderSection={slider}
      />
      <section class="px-2 py-32 md:px-0">
  <div class="container items-center max-w-6xl px-8 mx-auto xl:px-5">
    <div class="flex flex-wrap items-center sm:-mx-3">
      <div class="w-full md:w-1/2 md:px-3">
        <div class="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
            <span class="block xl:inline text-gray-600" >Galeria de Arte  </span>
            <span class="block text-white  xl:inline">Hugo Sotelino</span>
          </h1>
          <p class="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">Un lugar donde podras ver mis obras, comprar y contactarme por pedidos a tu medida!</p>
          <div class="relative flex flex-col sm:flex-row sm:space-x-4">
            <a href="/home" class="flex items-center w-full px-6 py-3 mb-3 text-lg text-black	 bg-gray-200 rounded-md sm:mb-0 hover:bg-gray-300 sm:w-auto">
              Ingresar
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="/faq" class="flex items-center px-6 py-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
              Saber más
            </a>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <div class="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
            <img src="https://elnoti.com/wp-content/uploads/2017/04/3a.jpg" class=""/>
          </div>
      </div>
    </div>
  </div>
</section>

      {/* <Slider paints={paints}></Slider> */}

      <div style={{ textAlign: "center", borderTop: "2px solid gray" }}>
        <p style={{ marginBottom: "70px" }}></p>
        <Titulos titulo="Cuadros decorativos"></Titulos>
      </div>
      <Destacado cards={filterAviablePaints}></Destacado>
      <Titulos titulo="Una galeria esplendida"></Titulos>
      <Gallery cards={filterAviablePaints} categories={categories} innerRef={gallery} />
      <Titulos titulo="Ilustramos tu personalidad"></Titulos>
      <Ilustrame></Ilustrame>
      <Titulos titulo="Comentarios"></Titulos>
      <Comments/>
      <Titulos titulo="Sobre mi"></Titulos>
      <About innerRef={about}></About>
      <Titulos></Titulos>
      <Footer></Footer>
    </div>
  );
}
