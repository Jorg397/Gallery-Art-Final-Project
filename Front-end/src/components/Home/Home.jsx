import React, { useEffect, useState } from "react";
import About from "../About/About";
import Destacado from "../Destacado/Destacado";
import Footer from "../Footer/Footer";
import Ilustrame from "../Ilustrame/Ilustrame";
import Titulos from "../Titulos/Titulos";
import { useAuth0 } from "@auth0/auth0-react";
import s from "./home.module.css";
import Gallery from "../Gallery/Gallery";
import { useSelector, useDispatch } from "react-redux";
import { fetchPaints, getCategories } from "../../redux/actions";
import Slider from "../Slider/Slider";
import NavBar from "../NavBar/NavBar";
import Cart from "../Cart/Cart";
import CartModal from "../CartModal/CartModal";
import asd from "./Untitled.svg";
import asd1 from "./Untitled1.svg";
import asd2 from "./Untitled2.svg";

export default function Home() {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const dispatch = useDispatch();
  const paints = useSelector((state) => state.filteredPaints);
  const categories = useSelector((state) => state.categories);
  const [modalState, setmodalState] = useState(false);

  function openModal() {
    setmodalState(!modalState);
  }

  useEffect(() => {
    dispatch(fetchPaints());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={s.container}>
      {/* <button onClick={() => loginWithRedirect()}>Log-in</button>
			{isAuthenticated && (
				<div>
					<img src={user.picture} alt='Profile' />
					<h2>{user.name}</h2>
					<p>{user.email}</p>
					<button onClick={() => logout()}>Log out</button>
				</div>
			)} */}
      <NavBar />
      <Cart openModal={openModal} />
      <CartModal openModal={openModal} modalState={modalState} />
      <Slider paints={paints}></Slider>
      <h1
        style={{
          fontSize: "80px",
          fontWeight: "bolder",
          color: "white",
          letterSpacing: "5px",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        <label
          style={{
            fontSize: "65px",
            fontWeight: "bolder",
            color: "#9a8c98",
            letterSpacing: "5px",
          }}
        >
          .
        </label>
        ...
      </h1>
      <div style={{ textAlign: "center", borderTop: "2px solid gray" }}>
        <p style={{ marginBottom: "90px" }}></p>
        <Titulos titulo="Cuadros decorativos"></Titulos>
      </div>
      <Destacado cards={paints}></Destacado>
      <Titulos titulo="Una galeria explendida"></Titulos>
      <Gallery cards={paints} categories={categories}></Gallery>
      <Titulos titulo="Ilustramos tu personalidad"></Titulos>
      <Ilustrame></Ilustrame>
      <Titulos titulo="Sobre nosotros"></Titulos>
      <About></About>
      <Titulos></Titulos>
      <Footer></Footer>
    </div>
  );
}
