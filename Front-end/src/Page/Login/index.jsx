import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button/index";
import google from "../../assets/icons/google.svg";
import TextField from "../../components/TextField/index";
import "./style.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="header"></div>
      <div className="login__container">
        <form className="login__container__form">
          <div className="login__container__form__title">
              <h1>Inicio sesion</h1>
          </div>
          <div className="login__container__form__inputs">
            <TextField name="Email : "/>
            <TextField name="contraseña : "/>
          </div>
          <div className="login__container__form__buttons">
            <div className="login__container__buttons-login">
              <Button
                name={"Ingresar"}
                version={"v1"}
                type={"submit"}
                width={"357px"}
                height={"50px"}
              />
              <Link to="/login" >¿Te olvidas tu contraseña?</Link>
            </div>

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
        <div className="login__container__Registry">
          <span>¿no tienes una cuenta?  </span><Link to="/login">Registrate aqui</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
