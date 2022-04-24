import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Navigate } from "react-router-dom";

import img from "../../assets/imgPerfil.png";
import Input from "./Input/input";
import "./style.scss";

const Profile = () => {
  const [state, setState] = React.useState({});
  const handleClickIconInput = (name) => {
    setState(!state);
    setState(() => {
      return {
        ...state,
        [name]: !state[name],
      };
    });
  };

  if (localStorage.getItem("token")=== null) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile">
      <NavBar />
      <div className="profile__container">
        <h1 className="profile__container__title">Mi Perfil</h1>
        <div className="profile__container__body">
          <div className="profile__container__body-data">
            <div>
              <div className="profile__container__body-data-row 1">
                <Input
                  name={"dni"}
                  text={"Dni :"}
                  width={"250px"}
                  value={"65325645"}
                  state={state["dni"]}
                  type={"text"}
                  onClick={handleClickIconInput}
                />
                <Input
                  name={"name"}
                  text={"Nombre :"}
                  width={"250px"}
                  value={"Rias Maria"}
                  state={state["name"]}
                  type={"text"}
                  onClick={handleClickIconInput}
                />
              </div>
              <div className="profile__container__body-data-row 1">
                <Input
                  name={"lastname"}
                  text={"Apellidos :"}
                  width={"250px"}
                  value={"Perez Ramires"}
                  state={state["lastname"]}
                  type={"text"}
                  onClick={handleClickIconInput}
                />
                <Input
                  name={"phone"}
                  text={"Telefono :"}
                  width={"250px"}
                  type={"text"}
                  value={"+51 975695848"}
                  state={state["phone"]}
                  onClick={handleClickIconInput}
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
                  onClick={handleClickIconInput}
                />
              </div>
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
