import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Button from "../../components/Button/index";
import google from "../../assets/icons/google.svg";
import TextField from "../../components/TextField/index";
import { validationsFields } from "../../utils/regularExpressions/validations";
import { createCustomer } from "../../services/post/registry";
import "./style.scss";
import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";
import { googlelogin } from "../../services/post/googleLogin";

const PORT =
  //"395216086999-0eb8o2a0jcr870t9ndclcnik3fvt564e.apps.googleusercontent.com";
  "293035429788-03unmah7i2rd3vpsihdplp6jqc2o5br9.apps.googleusercontent.com";

const Registry = () => {
  const [GetDataRegistry, setGetDataRegistry] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const validationsField = validationsFields();
  const [error, setError] = useState({
    email: { status: true, message: "" },
    password: { status: true, message: "" },
    repeatPassword: { status: true, message: "" },
  });
  const responseGoogle = async (response) => {
    console.log(response.profileObj);

    await googlelogin(response.profileObj)
      .then((res) => {
        console.log({ res });
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id_customer", res.data.user.id_customer);
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("role", res.data.user.role);
        window.location.href = "/home";
      })
      .catch((res) => alert("Usuario o contraseña incorrectos"));
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
    const validate = validationsField[name](value, GetDataRegistry.password);
    changeSetError(name, validate);
    if (name === "password" && GetDataRegistry.repeatPassword !== "") {
      changeSetError(
        "repeatPassword",
        validationsField.repeatPassword(value, GetDataRegistry.password)
      );
    }
    setGetDataRegistry((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      error.email.status ||
      error.password.status ||
      error.repeatPassword.status
    ) {
      changeSetError("email", validationsField.email(GetDataRegistry.email));
      changeSetError(
        "password",
        validationsField.password(GetDataRegistry.password)
      );
      return toast.error("Por favor verifica todos los campos", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    await createCustomer(GetDataRegistry)
      .then((res) => {
        console.log({ res });
        toast(res.data.message + ", iniciar sesion", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      })
      .catch((res) =>
        toast.error(
          "Oops, ya existe una cuenta con estos datos o ocurrió un error",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      );
  };
  if (localStorage.getItem("token")) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="registry">
      <div className="header">
        <Link to="/home">Gallery Art</Link>
      </div>
      <div className="registry__container">
        <form className="registry__container__form" onSubmit={handleSubmit}>
          <div className="registry__container__form__title">
            <h1>Registro</h1>
          </div>
          <div className="registry__container__form__inputs">
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
            <TextField
              name="repeatPassword"
              label="Repite la contraseña : "
              type={"password"}
              error={error.repeatPassword.message}
              onChange={handleChangeInput}
            />
          </div>
          <div className="registry__container__form__buttons">
            <Button
              name={"Ingresar"}
              version={"v1"}
              type={"submit"}
              width={"357px"}
              height={"50px"}
            />
              <GoogleLogin
                clientId={PORT}
                buttonText="Continuar con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            <div>
            </div>
          </div>
        </form>
        <div className="registry__container__Login">
          <span>¿Ya tienes una cuenta? </span>
          <Link to="/login">Inicia sesion aqui</Link>
        </div>
      </div>
    </div>
  );
};

export default Registry;
