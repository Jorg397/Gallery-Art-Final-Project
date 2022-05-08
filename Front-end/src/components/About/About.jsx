import React from "react";
import { Link } from "react-router-dom";
import s from "./about.module.css";

export default function About() {
  return (
    <div style={{ paddingTop: "50px" }}>
      <div
        id="about"
        className={`box-border flex flex-col mb-48 items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-1 ${s.container}`}
      >
        <div className="box-border w-full text-white border-solid md:w-1/2 md:pl-6 xl:pl-20">
          <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
            Hugo Sotelino.
          </h2>
          <h3>Artista plástico</h3>
          <p className="pt-4 pb-8 m-0 leading-7 text-white-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
            Nace en Villa Ballester Pcia.de Buenos Aires el 30 de octubre de
            1958. En 1980 Toma clases de pintura con Carlos Monzani en los
            “Patios de San Telmo” Clases de miniatura y micro miniaturas con
            Morra En 1982 Viaja a Uruguay, Brasil, costa de Buenos Aires y San
            Pedro a realizar exposiciones de sus Oleos y Miniaturas. En 1986
            Expone en Casa do Desenho, Florianópolis, Brasil. En 1989 Primer
            Muestra de Artistas Plásticos por el Centenario de Villa Ballester,
            Provincia de Buenos Aires. Declarada de Interés Municipal por
            decreto Nº 1387/89. En 1996 Pinta un mural de 1,60 x 2 metros
            nombrado "Esperanza" en el Centro de Atención Primaria de Salud,
            Salsipuedes, en el Marco de la Semana Mundial de la Mujer Y de la
            Lactancia Materna.UNICEF.
          </p>
          <Link
            style={{ color: "white", textDecoration: "underline" }}
            to="https://www.facebook.com/hugo.sotelino/about_details"
            target={"_blank"}
          >
            Saber Más
          </Link>
        </div>

        <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
          <img
            src="https://i.ibb.co/g6Jc8m5/13043464-1364777910205679-4756238183954252517-n.jpg"
            className=" rounded-md sm:rounded-xl shadow-x2"
          />
        </div>
      </div>
    </div>
  );
}
