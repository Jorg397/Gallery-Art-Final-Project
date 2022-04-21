import React, { useEffect, useState } from "react";
import About from "../About/About";
import Destacado from "../Destacado/Destacado";
import Footer from "../Footer/Footer";
import Ilustrame from "../Ilustrame/Ilustrame";
import Titulos from "../Titulos/Titulos";
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

  useEffect(() => {
    dispatch(fetchPaints());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <NavBar />
      <div></div>

      <Slider paints={paints}></Slider>
      <h1
        style={{
          fontSize: "80px",
          fontWeight: "bolder",
          color: "white",
          letterSpacing: "5px",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        <label
          style={{
            fontSize: "65px",
            fontWeight: "bolder",
            color: "#9a8c98",
            letterSpacing: "5px",
          }}
        >
          .
        </label>
        ...
      </h1>
      <div style={{ textAlign: "center", borderTop: "2px solid gray" }}>
        <p style={{ marginBottom: "90px" }}></p>
        <Titulos titulo="Cuadros decorativos"></Titulos>
      </div>
      <Destacado cards={paints}></Destacado>
      <Titulos titulo="Una galeria explendida"></Titulos>
      <Gallery cards={paints} categories={categories}></Gallery>
      <Titulos titulo="Ilustramos tu personalidad"></Titulos>
      <Ilustrame></Ilustrame>
      <Titulos titulo="Sobre nosotros"></Titulos>
      <About></About>
      <Titulos></Titulos>
      <Footer></Footer>
    </div>
  );
}
