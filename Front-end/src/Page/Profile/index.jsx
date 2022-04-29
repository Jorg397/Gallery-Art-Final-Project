import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import img from "../../assets/imgPerfil.png";
import { getProfile } from "../../redux/actions";
import { putProfile } from "../../services/put/profile";
import { toast } from "react-toastify";
import Button from "../../components/Button/index";
import { useLocalStorage } from "../../utils/customerHooks/useLocalStorage";
import Input from "./Input/input";
import "./style.scss";

const Profile = () => {
  const [name, setName] = useLocalStorage("name", "");
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [state, setState] = React.useState({});
  const [inputSate, setInputSate] = React.useState(true);
  const [editData, setEditData] = React.useState({
    name: "",
    lastName: "",
    phone: "",
    dni: "",
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

  const handleChangeInput = (value, name) => {
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
    const response = await putProfile(
      editData,
      localStorage.getItem("id_customer")
    )
      .then((res) => {
        setName(editData.name);
        toast(res.data.message);
        dispatch(getProfile());
        window.location.reload();
      })
    if(!inputSate){
      window.location.reload();
    }
  };

  React.useEffect(() => {
    dispatch(getProfile(localStorage.getItem("id_customer")));
  }, []);
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

  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile">
      <NavBar />
      <div className="profile__container">
        <h1 className="profile__container__title">Mi Perfil</h1>
        <div className="profile__container__body">
          <div className="profile__container__body-data">
            { profile.lastName && profile.name && (
              <form onSubmit={handleSubmit}>
                <div className="profile__container__body-data-row 1">
                  <Input
                    name={"dni"}
                    text={"Dni :"}
                    width={"250px"}
                    value={editData.dni}
                    state={state["dni"]}
                    type={"text"}
                    visibility={inputSate}
                    onchange={handleChangeInput}
                    onClick={handleClickIconInput}
                  />
                  <Input
                    name={"name"}
                    text={"Nombre :"}
                    width={"250px"}
                    value={editData.name}
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
                    value={editData.dni}
                    state={state["dni"]}
                    type={"text"}
                    visibility={inputSate}
                    onchange={handleChangeInput}
                    onClick={handleClickIconInput}
                  />
                  <Input
                    name={"name"}
                    text={"Nombre :"}
                    width={"250px"}
                    value={editData.name}
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
                    visibility={inputSate}
                    value={editData.phone}
                    state={state["phone"]}
                    onClick={handleClickIconInput}
                    onchange={handleChangeInput}
                  />
                </div>
                <Button
                    version={"v2"}
                    width="200px"
                    type="submit"
                    name="Actualizar datos"
                    height="45px"
                    onClick={handleSubmit}
                  />
              </form>
              
            )}
            {console.log("state" ,editData)}
            {!profile.lastName && !profile.name && (
              <div
                className="profile__container__body-buttonForm"
                style={
                  inputSate
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
            )}
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
