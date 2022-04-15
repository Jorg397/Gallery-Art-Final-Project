import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button/index";
import google from "../../assets/icons/google.svg";
import TextField from "../../components/TextField/index";
import "./style.scss";

const Login = () => {
  return (
    <div className="registry">
      <div className="header">
          <h1>Gallery Art</h1>
      </div>
      <div className="registry__container">
        <form className="registry__container__form">
          <div className="registry__container__form__title">
            <h1>Registro</h1>
          </div>
          <div className="registry__container__form__inputs">
            <TextField name="Email : " />
            <TextField name="Contraseña : " />
            <TextField name="Repite la contraseña : " />
          </div>
          <div className="registry__container__form__buttons">
            <Button
              name={"Ingresar"}
              version={"v1"}
              type={"submit"}
              width={"357px"}
              height={"50px"}
            />
            <Button
              name={"continuar con Google"}
              icon={google}
              version={"v2"}
              type={"submit"}
              width={"357px"}
              height={"50px"}
            />
          </div>
        </form>
        <div className="registry__container__Login">
          <span>¿Ya tienes una cuenta?  </span>
          <Link to="/login">Inicia sesion aqui</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
