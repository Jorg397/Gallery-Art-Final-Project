import { useSelector } from "react-redux";
import arrowimg from "../../assets/arroww.png";
import Cards from "../Cards/Cards";
import s from "./detail.module.css";
import { useDispatch } from "react-redux";
import { fetchPaints, getDetail, addToCart } from "../../redux/actions";
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Card from "../Cart/Cart";
import Cart from "../Cart/Cart";
import CartModal from "../CartModal/CartModal";
const Detail = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [modalState, setmodalState] = useState(false);

  function openModal() {
    setmodalState(!modalState);
  }

  useEffect(() => {
    dispatch(fetchPaints());
  }, [dispatch]);

  const resp = useSelector((state) => state.detail);

  const handleAddToCart = (idProduct) => {
    const itsCart = cart.find((product) => product.idProduct === idProduct);
    if (itsCart) {
      alert("Ya esta en el carrito");
    } else {
      dispatch(addToCart(idProduct));
      alert("Agregado al carrito");
    }
  };

  return (
    <div>
      <NavBar></NavBar>
      <Cart openModal={openModal} />
      <CartModal openModal={openModal} modalState={modalState} />
      <section>
        <div className={`pt-32 flex justify-around pb-10`}>
          <div>
            <img
              src={`${resp?.image[0]}`}
              alt="picture"
              className={`${s.mainImage}`}
            />

            <div className={`flex ${s.secondImagesContainer} justify-center`}>
              <img src={`${resp?.image[0]}`} alt="" />
              <img src={`${resp?.image[0]}`} alt="" />
              <img src={`${resp?.image[0]}`} alt="" />
            </div>
          </div>
          <div className="flex items-center">
            <img src={arrowimg} alt="" />
          </div>
          <div className={`${s.detailsContainer} flex flex-col`}>
            <h3 className="text-4xl text-white w-full text-center mt-10">
              {resp?.name}
            </h3>

            <div className={`p-10 px-16 text-2xl  text-white ${s.pSection}`}>
              <p>
                <span>Técnica: </span>
                {resp?.technique}
              </p>
              <p>
                <span>Medida : </span> {resp?.measures}
              </p>
              <p>
                <span>Código : </span>
                {resp?.idProduct}
              </p>
              <p>
                <span>Año : </span>
                {resp?.released}
              </p>

              <p>
                <span>Categoria: </span>{" "}
                {resp?.categories.map((e) => e.name) + " "}
              </p>
              <p className="mt-12">{resp?.description}</p>
              <a href="#" className="decoration-1">
                Ver más
              </a>
            </div>

            <div
              className={`flex justify-between px-16 my-10 mb-5 ${s.priceSection} p-10 text-center`}
            >
              <p className="self-center text-white text-5xl">$ {resp?.price}</p>
              <button
                className={`${s.button}`}
                onClick={() => handleAddToCart(resp?.idProduct)}
              >
                Agregar al carrito
              </button>
            </div>

            <p className="text-xl text-white mx-5 my-5">
              * El pago del envio sera cubierto por cada comprador de las cuales
              se referenciara el costo con la direccion de envio y se coordinara
              con el venderdor via whatsApp
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 text-2xl">
        <p className="uppercase text-gray-500 ml-24">
          Ver más de <span className="text-white">arte abstracto</span>
        </p>

        <div className="flex">
          <Cards />
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Detail;
