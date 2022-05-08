import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
export default function Landing() {
  return (
    <div>
      <NavBar />

      <section className="px-2 py-32 md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="block xl:inline text-gray-600">
                    Galeria de Arte{" "}
                  </span>
                  <span className="block text-white  xl:inline">
                    Hugo Sotelino
                  </span>
                </h1>
                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                  Un lugar donde podras ver mis obras, comprar y contactarme por
                  pedidos a tu medida!
                </p>
                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                  <Link
                    to="/home"
                    className="flex items-center w-full px-6 py-3 mb-3 text-lg text-black	 bg-gray-200 rounded-md sm:mb-0 hover:bg-gray-300 sm:w-auto"
                  >
                    Ingresar
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                  <Link
                    to="/faq"
                    className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
                  >
                    Saber más
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full h-auto overflow-hidden justify-center flex">
                <img
                  src="https://i.ibb.co/zrBK52d/13010909-670348743102825-5116816458416428023-n.jpg"
                  className="rounded-md sm:rounded-xl shadow-x2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
