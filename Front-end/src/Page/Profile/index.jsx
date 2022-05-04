import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import img from "../../assets/imgPerfil.png";
import { getProfile } from "../../redux/actions";
import { putProfile } from "../../services/put/profile";
import { useLocalStorage } from "../../utils/customerHooks/useLocalStorage";
import { validationsFields } from "../../utils/regularExpressions/validations";
import { toast } from "react-toastify";
import Button from "../../components/Button/index";
import Input from "./Input/input";
import "./style.scss";

const Profile = () => {
  const [name, setName] = useLocalStorage("name", "");
  const validations = validationsFields();
  const [submit, setSubmit] = React.useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [state, setState] = React.useState({});
  const [inputSate, setInputSate] = React.useState(true);
  const [editData, setEditData] = React.useState({
    name: profile.name,
    lastName: profile.lastName,
    phone: profile.phone,
    dni: profile.dni,
  });
  const [error, setError] = React.useState({
    name: { status: editData.name !== "" ? false : true, message: "" },
    lastName: { status: editData.lastName !== "" ? false : true, message: "" },
    phone: { status: editData.phone !== "" ? false : true, message: "" },
    dni: { status: editData.dni !== "" ? false : true, message: "" },
  });
  const handleClickIconInput = (name) => {
    setState(!state);
    setState(() => {
      return {
        ...state,
        [name]: !state[name],
      };
    });
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

  const handleChangeInput = (value, name) => {
    console.log(value, " ", name);
    const validate = validations[name](value);
    console.log("slida del eeror", validate);
    changeSetError(name, validate);
    setEditData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleVisibleForm = () => {
    setInputSate(!inputSate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit ene el submit", submit);
    if (submit) {
      const response = await putProfile(
        editData,
        localStorage.getItem("id_customer")
      ).then((res) => {
        toast(res.data.message);
        dispatch(getProfile());
        setName(editData.name);
        window.location.reload();
      });
      if (!inputSate) {
        window.location.reload();
      }
    } else {
      toast.error("Complete los campos correctamente");
    }
  };

  React.useEffect(() => {
    setEditData((prevState) => {
      return {
        ...prevState,
        name: profile.name,
        lastName: profile.lastName,
        phone: profile.phone,
        dni: profile.dni,
      };
    });
  }, [profile]);

  React.useEffect(() => {
    console.log("submit ", error);
    if (
      !error.dni.status &&
      !error.name.status &&
      !error.lastName.status &&
      !error.phone.status
    ) {
      console.log("entro submit");
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [editData]);

  React.useEffect(() => {
    if (
      !error.name.status &&
      !error.lastName.status &&
      !error.phone.status &&
      !error.dni.status
    ) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [error]);

  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile">
      <NavBar />
      {console.log("editData ", editData)}
      <div className="profile__container">
        <h1 className="profile__container__title">Mi Perfil</h1>
        <div className="profile__container__body">
          <div className="profile__container__body-data">
            {profile.lastName && profile.name && (
              <form onSubmit={handleSubmit}>
                <div className="profile__container__body-data-row 1">
                  <Input
                    name={"dni"}
                    text={"Dni :"}
                    width={"250px"}
                    value={editData.dni}
                    state={state["dni"]}
                    type={"text"}
                    error={error.dni.message}
                    visibility={inputSate}
                    onchange={handleChangeInput}
                    onBlur={handleChangeInput}
                    onClick={handleClickIconInput}
                  />
                  <Input
                    name={"name"}
                    text={"Nombre :"}
                    width={"250px"}
                    error={error.name.message}
                    value={editData.name}
                    onBlur={handleChangeInput}
                    state={state["name"]}
                    type={"text"}
                    visibility={inputSate}
                    onClick={handleClickIconInput}
                    onchange={handleChangeInput}
                  />
                </div>
                <div className="profile__container__body-data-row 1">
                  <Input
                    name={"lastName"}
                    text={"Apellidos :"}
                    width={"250px"}
                    error={error.lastName.message}
                    onBlur={handleChangeInput}
                    value={editData.lastName}
                    state={state["lastName"]}
                    type={"text"}
                    visibility={inputSate}
                    onClick={handleClickIconInput}
                    onchange={handleChangeInput}
                  />
                  <Input
                    name={"phone"}
                    text={"Telefono :"}
                    width={"250px"}
                    type={"text"}
                    error={error.phone.message}
                    onBlur={handleChangeInput}
                    visibility={inputSate}
                    value={editData.phone}
                    state={state["phone"]}
                    onClick={handleClickIconInput}
                    onchange={handleChangeInput}
                  />
                </div>
                <div className="profile__container__body-data-row 1">
                  <Input
                    name={"address"}
                    text={"Direcciones :"}
                    width={"450px"}
                    value={"+51 975695848"}
                    state={state["address"]}
                    type={"select"}
                    visibility={inputSate}
                    onClick={handleClickIconInput}
                  />
                  <p>
                    Recuerda que podras modificar tu direccion con tu compra
                  </p>
                </div>
                <div
                  style={
                    inputSate
                      ? {
                          display: "none",
                        }
                      : { display: "block" }
                  }
                >
                  <Button
                    version={"v2"}
                    width="200px"
                    type="submit"
                    name="Actualizar datos"
                    height="45px"
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            )}
            {!inputSate && (
              <form onSubmit={handleSubmit}>
                <div className="profile__container__body-data-row 1">
                  <Input
                    name={"dni"}
                    text={"Dni :"}
                    width={"250px"}
                    error={error.dni.message}
                    value={editData.dni}
                    state={state["dni"]}
                    type={"text"}
                    visibility={inputSate}
                    onchange={handleChangeInput}
                    onBlur={handleChangeInput}
                    onClick={handleClickIconInput}
                  />
                  <Input
                    name={"name"}
                    text={"Nombre :"}
                    error={error.name.message}
                    width={"250px"}
                    value={editData.name}
                    state={state["name"]}
                    type={"text"}
                    visibility={inputSate}
                    onBlur={handleChangeInput}
                    onClick={handleClickIconInput}
                    onchange={handleChangeInput}
                  />
                </div>
                <div className="profile__container__body-data-row 1">
                  <Input
                    name={"lastName"}
                    text={"Apellidos :"}
                    width={"250px"}
                    error={error.lastName.message}
                    value={editData.lastName}
                    state={state["lastName"]}
                    type={"text"}
                    visibility={inputSate}
                    onBlur={handleChangeInput}
                    onClick={handleClickIconInput}
                    onchange={handleChangeInput}
                  />
                  <Input
                    name={"phone"}
                    text={"Telefono :"}
                    width={"250px"}
                    type={"text"}
                    error={error.phone.message}
                    visibility={inputSate}
                    value={editData.phone}
                    state={state["phone"]}
                    onBlur={handleChangeInput}
                    onClick={handleClickIconInput}
                    onchange={handleChangeInput}
                  />
                </div>
                <Button
                  version={"v2"}
                  width="200px"
                  type="submit"
                  disabled={submit ? "" : "disabled"}
                  name="Actualizar datos"
                  height="45px"
                  onClick={handleSubmit}
                />
              </form>
            )}
            <div
              className="profile__container__body-buttonForm"
              style={
                inputSate && (!profile.lastName || !profile.name)
                  ? {
                      display: "block",
                    }
                  : { display: "none" }
              }
            >
              <h1></h1>
              <Button
                version={"v1"}
                width="300px"
                type="button"
                name="Completar datos"
                height="40px"
                onClick={handleVisibleForm}
              />
            </div>
          </div>
          <div className="profile__container__body-img">
            <img src={img} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
