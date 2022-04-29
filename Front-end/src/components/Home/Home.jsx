import React, { useEffect, useState, useRef } from "react";
import About from "../About/About";
import Destacado from "../Destacado/Destacado";
import Footer from "../Footer/Footer";
import Ilustrame from "../Ilustrame/Ilustrame";
import Author from "../Autor/index";
import Titulos from "../Titulos/Titulos";
import fondoSotelino from "../../assets/sotelinofondo.png";
import sotelino from "../../assets/sotelino.png";
import s from "./home.module.css";
import Gallery from "../Gallery/Gallery";
import { useSelector, useDispatch } from "react-redux";
import { fetchPaints, getCategories } from "../../redux/actions";
import Slider from "../Slider/Slider";
import NavBar from "../NavBar/NavBar";

export default function Home() {
  const dispatch = useDispatch();
  const paints = useSelector((state) => state.filteredPaints);
  const categories = useSelector((state) => state.categories);

  const gallery = useRef(null);
  const about = useRef(null);
  const slider = useRef(null);

  useEffect(() => {
    dispatch(fetchPaints());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <NavBar
        gallerySection={gallery}
        aboutSection={about}
        sliderSection={slider}
      />
      <div className={s.banner}>
        <div className={s.banner__img}>
          <img
            src={fondoSotelino}
            className={s.banner__img_fondo}
            alt="banner"
          />
          <img src={sotelino} className={s.banner__img_sotelino} alt="autor" />
        </div>
		<div>
			<Author/>
			<p>un artista muy enfocado a pintar cuadros de paisaje y naturaleza, te invito a ver mis obras en la siguentes secciones. </p>
		</div>
      </div>

      {/* <Slider paints={paints}></Slider> */}

      <div style={{ textAlign: "center", borderTop: "2px solid gray" }}>
        <p style={{ marginBottom: "70px" }}></p>
        <Titulos titulo="Cuadros decorativos"></Titulos>
      </div>
      <Destacado cards={paints}></Destacado>
      <Titulos titulo="Una galeria explendida"></Titulos>
      <Gallery cards={paints} categories={categories} innerRef={gallery} />
      <Titulos titulo="Ilustramos tu personalidad"></Titulos>
      <Ilustrame></Ilustrame>
      <Titulos titulo="Sobre nosotros"></Titulos>
      <About innerRef={about}></About>
      <Titulos></Titulos>
      <Footer></Footer>
    </div>
  );
}
