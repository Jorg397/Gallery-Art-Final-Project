import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import img from "../../assets/imgPerfil.png";
import { getProfile } from "../../redux/actions";
import Input from "./Input/input";
import "./style.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const data = {
    name: "sofia",
    lastName: "perez",
    dni:'85692456',
    phone: '988888888',
  }
  const [state, setState] = React.useState({});
  const [editData, setEditData] = React.useState({
    name: data.name,
    lastName: data.lastName,
    phone: data.phone,
    dni: data.dni,
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

  const handleChangeInput = (value,name) => {
    console.log("editData", editData);
    setEditData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  React.useEffect(()=>{
    dispatch(getProfile(localStorage.getItem('id_customer')));
  },[]);

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
                  value={editData.dni}
                  state={state["dni"]}
                  type={"text"}
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
                  onClick={handleClickIconInput}
                  onchange={handleChangeInput}
                />
                <Input
                  name={"phone"}
                  text={"Telefono :"}
                  width={"250px"}
                  type={"text"}
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
