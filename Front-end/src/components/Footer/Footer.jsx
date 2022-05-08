import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  //returns a footer component with social media adress telephone and terms of use a link to the about page and a link to help page
  return (
    <div
      className="w-auto p-4 bottom-0 h-auto relative divide-y-2  border-gray-200"
      style={{ color: "white", marginBottom: "20px" }}
    >
      <div className="lg:flex  lg:mt-3 md:mx-12 lg:mx-28 lg:justify-between ">
        <div className="mb-4 lg:columns-1 w-96">
          <p className="ml-48" style={{ fontSize: "24px", fontWeight: "bold" }}>
            Art
            <label
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                color: "rgb(0, 173, 173)",
              }}
            >
              .
            </label>
            Gallery
          </p>
          <Link
            style={{
              marginLeft: "50px",
              textDecoration: "underline",
              fontSize: "14px",
              color: "white",
            }}
            to="/faq"
          >
            •Preguntas Frecuentes
          </Link>
          <Link
            style={{
              marginLeft: "5px",
              textDecoration: "underline",
              fontSize: "14px",
              color: "white",
            }}
            to="/home#about"
          >
            •Sobre Mi
          </Link>
          <Link
            style={{
              marginLeft: "5px",
              textDecoration: "underline",
              fontSize: "14px",
              color: "white",
            }}
            to="/home#destacado"
          >
            •Destacado
          </Link>
          <Link
            style={{
              marginLeft: "5px",
              textDecoration: "underline",
              fontSize: "14px",
              color: "white",
            }}
            to="/gallery"
          >
            •Ver galeria de pinturas
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 flex-col-reverse">
          <div>
            <label style={{ fontSize: "16px", fontWeight: "bold" }}>
              Direccion:
            </label>
            <p>
              <Link
                style={{ color: "white" }}
                to="https://www.google.com/maps/"
                target={"_blank"}
              >
                Alvear 1601, Buenos Aires, Argentina
              </Link>
            </p>
            <p>
              <label
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Telefono:
              </label>
            </p>
            <p>
              <Link style={{ color: "white" }} to="tel:+442033363636">
                +54 011-4567-7891
              </Link>
            </p>
          </div>
          <div className="flex">
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              Redes Sociales:
            </p>
            <Link target="_blank" to="https://www.facebook.com/">
              <img
                src="https://i.ibb.co/3CHKtq4/facebook.png"
                alt="facebook"
                className="w-10"
              />
            </Link>
            <Link to="https://www.instagram.com/" target="_blank">
              <img
                src="https://i.ibb.co/nj2sW43/instagram.png"
                alt="instagram"
                className="w-10 ml-2"
              />
            </Link>
            <Link target="_blank" to="https://www.twitter.com/">
              <img
                src="https://i.ibb.co/d7B0R7S/twitter-sign.png"
                alt="twitter"
                className="w-10 ml-2"
              />
            </Link>
            <Link target="_blank" to="https://www.youtube.com/">
              <img
                src="https://i.ibb.co/Zcw7r5C/youtube.png"
                alt="youtube"
                className="w-10 ml-2"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
