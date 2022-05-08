import React from "react";
import { Link } from "react-router-dom";
import s from "../SliderCard/SliderCard.module.css";
import ss from "./ilustrame.module.css";

export default function Ilustrame() {
  return (
    <section className={`w-full pt-7 pb-7 md:pt-20 md:pb-24 ${ss.container}`}>
      <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
        <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
          <img
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
            src="https://i.ibb.co/Ks5gqJ5/18767848-1801894706493995-6079544335035068337-n.jpg"
            className="w-full h-full object-cover object-center "
          />
        </div>

        <div className="box-border order-first w-full text-white border-solid md:w-1/2 md:pl-10 md:order-none">
          <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
            Ilustracion perfecta
          </h2>
          <p className="pt-4 pb-8 m-0 leading-7 text-white-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
            Realizo trabajos individuales a pedido, tanto retratos como obras de
            arte de distintos géneros. También puedo realizar trabajos en
            conjunto con otros artistas. Ante cualquier duda o consulta, puedo
            ayudarte a encontrar la ilustración perfecta para tu obra.
          </p>
          <Link to="https://www.whatsapp.com" target="_blank">
            <button
              type="button"
              className={`${s.cardbtn} flex justify-around py-6`}
            >
              <p className=" self-center text-2xl	">Contáctame</p>
              <img
                src="https://i.ibb.co/znDXnbn/whatsapp.png"
                alt="facebook"
                className="w-6 self-center"
              />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
