import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Button from "../../components/Button/index";
import google from "../../assets/icons/google.svg";
import TextField from "../../components/TextField/index";
import { validationsFields } from "../../utils/regularExpressions/validations";
import { login } from "../../services/post/login";
import "./style.scss";

const Login = () => {
  const [GetDataLogin, setGetDataLogin] = useState({
    email: "",
    password: "",
  });
  const validationsField = validationsFields();
  const [error, setError] = useState({
    email: { status: true, message: "" },
    password: { status: true, message: "" },
  });

  const changeSetError = (field, value) => {
    setError((prevState) => {
      return {
        ...prevState,
        [field]: {
          status: value.status,
          message: value.message,
        },
      };
    });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const validate = validationsField[name](value);
    changeSetError(name, validate);
    setGetDataLogin((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error.email.status || error.password.status) {
      changeSetError("email", validationsField.email(GetDataLogin.email));
      changeSetError(
        "password",
        validationsField.password(GetDataLogin.password)
      );
      return alert("Por favor verifica los campos, no pueden tener error");
    }
    await login(GetDataLogin)
      .then((res) => {
        console.log({ res });
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/home";
      })
      .catch((res) => alert("Usuario o contraseña incorrectos"));
  };

  if (localStorage.getItem("token")) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="login">
      <div className="header">
        <Link to="/home">Gallery Art</Link>
      </div>
      <div className="login__container">
        <form className="login__container__form" onSubmit={handleSubmit}>
          <div className="login__container__form__title">
            <h1>Inicio sesion</h1>
          </div>
          <div className="login__container__form__inputs">
            <TextField
              onBlur={handleChangeInput}
              name="email"
              type="text"
              label="Email : "
              error={error.email.message}
              onChange={handleChangeInput}
            />
            <TextField
              name="password"
              label="Contraseña : "
              type={"password"}
              error={error.password.message}
              onChange={handleChangeInput}
            />
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
              <Link to="/login">¿Te olvidas tu contraseña?</Link>
            </div>

            {/* <Button
              name={"continuar con Google"}
              icon={google}
              version={"v2"}
              type={"submit"}
              width={"357px"}
              height={"50px"}
            /> */}
          </div>
        </form>
        <div className="login__container__Registry">
          <span>¿no tienes una cuenta? </span>
          <Link to="/registry">Registrate aqui</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
