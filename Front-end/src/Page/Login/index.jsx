import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Button from "../../components/Button/index";
// import google from "../../assets/icons/google.svg";
import TextField from "../../components/TextField/index";
import { validationsFields } from "../../utils/regularExpressions/validations";
import { login } from "../../services/post/login";
// import { google } from "../../services/post/googleLogin";
import { GoogleLogin } from "react-google-login";
import "./style.scss";
import { googlelogin } from "../../services/post/googleLogin";

const PORT =
  //"395216086999-0eb8o2a0jcr870t9ndclcnik3fvt564e.apps.googleusercontent.com";
  "293035429788-03unmah7i2rd3vpsihdplp6jqc2o5br9.apps.googleusercontent.com";
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

  const responseGoogle = async (response) => {
    console.log(response.profileObj);

    await googlelogin(response.profileObj)
      .then((res) => {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id_customer", res.data.id_customer);
        localStorage.setItem("name", res.data.name);
        window.location.href = "/home";
      })
  };

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
        console.log("esto viene en login ",res.data);
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id_customer", res.data.id_customer);
        localStorage.setItem("name", res.data.name);
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

          <div>
            <GoogleLogin
              clientId={PORT}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
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