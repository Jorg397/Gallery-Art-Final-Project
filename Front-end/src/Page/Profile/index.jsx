import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import img from "../../assets/imgPerfil.png";
import { getProfile } from "../../redux/actions";
import { putProfile } from "../../services/put/profile";
import { toast } from "react-toastify";
import Input from "./Input/input";
import "./style.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [state, setState] = React.useState({});
  const [inputSate, setInputSate] = React.useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await putProfile(
      editData,
      localStorage.getItem("id_customer")
    )
      .then((res) => {
        toast(res.data.message);
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
    if (response.status === 200) {
      dispatch(getProfile());
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
            <form onSubmit={handleSubmit}>
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
                  value={profile.lastName}
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
                <p>Recuerda que podras modificar tu direccion con tu compra</p>
              </div>
            </form>
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
