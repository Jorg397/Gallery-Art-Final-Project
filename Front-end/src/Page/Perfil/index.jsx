import React from "react";
import NavBar from "../../components/NavBar/NavBar";

const Perfil = () => {
  return (
    <div className="perfil">
      <NavBar />
      <div className="perfil__container">
        <h1 className="perfil__container__title">Perfil</h1>
        <div className="perfil__container__body">
          <div className="perfil__container__body-data">
            <form></form>
          </div>
          <div className="perfil__container__body-imag">
            <img />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
