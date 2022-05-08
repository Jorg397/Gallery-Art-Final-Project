import React, { useEffect, useState, useRef } from "react";
import About from "../About/About";
import Destacado from "../Destacado/Destacado";
import Footer from "../Footer/Footer";
import Ilustrame from "../Ilustrame/Ilustrame";
import Button from "../Button";
import Author from "../Autor/index";
import fondoSotelino from "../../assets/sotelinofondo.png";
import sotelino from "../../assets/sotelino.png";
import ArrowDown from "../ArrowDown/index";
import Titulos from "../Titulos/Titulos";

import s from "./home.module.css";
import Comments from "../Comments/index";
import Gallery from "../Gallery/Gallery";
import { useSelector, useDispatch } from "react-redux";
import { fetchPaints, getCategories } from "../../redux/actions";
import { Link } from "react-router-dom";

import NavBar from "../NavBar/NavBar";

export default function Home() {
  const dispatch = useDispatch();
  const paints = useSelector((state) => state.filteredPaints);
  let filterAviablePaints = paints.filter(
    (paint) => paint.state === "Available"
  );
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
      <div className={s.banner}>
        <div className={s.banner__img}>
          <img
            src={fondoSotelino}
            className={s.banner__img_fondo}
            alt="banner"
          />
          <img src={sotelino} className={s.banner__img_sotelino} alt="autor" />
        </div>
        <div className={s.banner__text}>
          <h1>Hola, soy Hugo Sotelino</h1>
          <p>
            Un artista enfocado a pintar cuadros de paisaje y naturaleza, te
            invito a ver mis obras en la siguentes secciones.{" "}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "50px",
            }}
          >
            <div className={s.banner__text_scrol}>
              <ArrowDown />
            </div>
            <Link to="/home">
              <p
                style={{
                  color: "white",
                  fontFamily: "mulish",
                  fontSize: "0.87rem",
                }}
              >
                Ver mas
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* <Slider paints={paints}></Slider> */}

      <div style={{ textAlign: "center", borderTop: "2px solid gray" }}>
        <p style={{ marginBottom: "70px" }}></p>
        <Titulos titulo="Cuadros decorativos"></Titulos>
      </div>
      <Destacado cards={filterAviablePaints}></Destacado>
      <Titulos titulo="Una galeria esplendida"></Titulos>
      <Gallery
        cards={filterAviablePaints}
        categories={categories}
        innerRef={gallery}
      />
      <Titulos titulo="Ilustramos tu personalidad"></Titulos>
      <Ilustrame></Ilustrame>
      <Titulos titulo="Comentarios"></Titulos>
      <Comments />
      <Titulos titulo="Sobre mi"></Titulos>
      <About innerRef={about}></About>
      <Titulos></Titulos>
      <Footer></Footer>
    </div>
  );
}
