import React from "react";
import Button from "../Button";
import Author from "../Autor/index";
import s from "../Home/home.module.css";
import fondoSotelino from "../../assets/sotelinofondo.png";
import sotelino from "../../assets/sotelino.png";
import ArrowDown from "../ArrowDown/index";
import NavBar from "../NavBar/NavBar";
export default function Landing() {
	return (
    <div>
      <NavBar/>
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
        <a href="/home">
        <p
          style={{
            color: "white",
            fontFamily: "mulish",
            fontSize: "0.87rem",
          }}
        >
          Ver mas
        </p>

        </a>
      </div>
    </div>
  </div>
    </div>


	);
}
