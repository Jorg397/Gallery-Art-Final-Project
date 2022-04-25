import React from "react";
import { Navigate } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import imgShopping from "../../assets/imgShopping.png";
import './style.scss';

const Shopping = () => {
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="shopping">
      <NavBar />
      <div className="shopping__container">
        <h1 className="shopping__container__title">Mis compras</h1>
        <div className="shopping__container__body">
          <div className="shopping__container__body-img">
            <img src={imgShopping} />
          </div>
          <div className="shopping__container__body-data">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopping;
