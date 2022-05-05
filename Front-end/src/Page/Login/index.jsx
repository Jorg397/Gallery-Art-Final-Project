import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/index";
// import google from "../../assets/icons/google.svg";
import TextField from "../../components/TextField/index";
import { validationsFields } from "../../utils/regularExpressions/validations";
import { login } from "../../services/post/login";
// import { google } from "../../services/post/googleLogin";
import { GoogleLogin } from "react-google-login";
import "./style.scss";
import { googlelogin } from "../../services/post/googleLogin";
import { useLocalStorage } from "../../utils/customerHooks/useLocalStorage";

const PORT =
  //"395216086999-0eb8o2a0jcr870t9ndclcnik3fvt564e.apps.googleusercontent.com";
  "293035429788-03unmah7i2rd3vpsihdplp6jqc2o5br9.apps.googleusercontent.com";
const Login = () => {
  const [name, setName] = useLocalStorage("name","");
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

    await googlelogin(response.profileObj).then((res) => {
      console.log("entra aca login 1",res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id_customer", res.data.user.id_customer);
      setName(res.data.name);
      localStorage.setItem("role", res.data.user.role);
      console.log("entra aca login 2",res.data);
      console.log("entra aca login 3",res.data);
      return <Navigate to="/home" />;
    })
    .catch((err) => {return toast.error(err.response.data.message)});
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
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id_customer", res.data.user.id_customer);
        setName(res.data.user.name);
        localStorage.setItem("role", res.data.user.role);
        return <Navigate to="/home" />;
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
              <Link to="/resetPasswordEmail">¿Te olvidas tu contraseña?</Link>
            </div>
            <GoogleLogin
              clientId={PORT}
              buttonText="Continuar con Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </form>
        <div className="login__container__Registry">
          <span>¿No tienes una cuenta? </span>
          <Link to="/registry">Registrate aqui</Link>
          <br/>
          {/* <span>¿Olvidaste tu contraseña? </span>
          <Link to="/resetPasswordEmail">Oprime aqui</Link> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
