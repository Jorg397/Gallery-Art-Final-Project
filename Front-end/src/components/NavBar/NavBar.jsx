//returns a navbar component styled with tailwind that contains title and links to home, obras, about, iniciar sesion and registrarse
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import s from "./NavBar.module.css";
import { useState, useEffect } from "react";
import CartModal from "../CartModal/CartModal";

export default function NavBar() {
  const handleclicklogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [background, setBackground] = useState(false);

  const [modalState, setmodalState] = useState(false);

  function openModal() {
    setmodalState(!modalState);
  }

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }
      if (window.scrollY >= 40) {
        setBackground(true);
      } else {
        setBackground(false);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  /*   const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    // find current scroll position
    console.log(window.pageYOffset);
    const currentScrollPos = window.pageYOffset;
    // set state based on location info (explained in more detail below)
    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );
    // set state to new scroll position
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);
 */
  return (
    <nav
      className={`flex items-center justify-between flex-wrap p-2 fixed w-screen z-10 ${
        background && s.background
      } ${show ? s.active : s.hidden}`}
    >
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className={s.title}>
          Art<span className={s.titleS}>.</span>Gallery
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow"></div>
        <div className="flex justify-center items-center content-center">
          <Link
            to="/home"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12"
          >
            Inicio
          </Link>
          <Link
            to="/home#gallery"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200
            hover:text-white mr-12"
          >
            Obras
          </Link>

          <Link
            to="/home#about"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12"
          >
            About
          </Link>
          {!localStorage.getItem("token") ? (
            <Link
              to="/login"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12"
            >
              Iniciar sesion
            </Link>
          ) : (
            <button
              onClick={handleclicklogout}
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12 cursor-pointer"
            >
              Cerrar sesion
            </button>
          )}
          {!localStorage.getItem("token") ? (
            <Link
              to="/registry"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-8 cursor-pointer"
            >
              Registrarse
            </Link>
          ) : (
            ""
          )}
          <Cart openModal={openModal} />
          <CartModal openModal={openModal} modalState={modalState} />
        </div>
      </div>
    </nav>
  );
}
