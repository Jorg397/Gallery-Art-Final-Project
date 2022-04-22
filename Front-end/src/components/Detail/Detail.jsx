import { useSelector } from "react-redux";
import arrowimg from "../../assets/arroww.png";
import Cards from "../Cards/Cards";
import s from "./detail.module.css";
import { useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { fetchPaints, getDetail, addToCart } from "../../redux/actions";
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Card from "../Cart/Cart";
import Cart from "../Cart/Cart";
import CartModal from "../CartModal/CartModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'

const Detail = () => {
  console.log("Detail");
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [modalState, setmodalState] = useState(false);

  const [descriptionText , setDescriptionText] = useState(false);


  function openModal() {
    setmodalState(!modalState);
  }

  useEffect(() => {
    console.log("useEffect");
    dispatch(getDetail(id));
  },[]);

  const resp = useSelector((state) => state.detail);
  console.log({resp});

  const handleAddToCart = (idProduct) => {
    const itsCart = cart.find((product) => product.id_product === idProduct);
    if (itsCart) {
      alert("Ya esta en el carrito");
    } else {
      dispatch(addToCart(idProduct));
      alert("Agregado al carrito");
    }
  };
  
  let d = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

  
  return (
    <div className={s.containerG}>
      <NavBar></NavBar>
      <div className={s.containerRoute}>
        <div className={s.containerRoute__title}>
          <div>
            <NavLink to={'/home'} className={`${s.route}`}>Home  {'>'} </NavLink>
            <NavLink to={'/gallery'} className={`${s.route}`}>Galería  {'>'} </NavLink>
            <NavLink to={'#'} className={`${s.route}`}>{resp?.name} {'>'} </NavLink>
          </div>
        </div>
        <div className={s.separator}>

        </div>
        
       
        
      </div>

      <div className={`${s.principalContainer}`}>
        <section>
          <div className={`pt-32 flex justify-around pb-10 ${s.secondContainer}`}>
            <div className={`${s.containerIMG}`}>
              <div>
                <img
                  src={`${resp?.image}`}
                  alt="picture"
                  className={`${s.mainImage}`}
                />
              </div>
              <div className={`flex ${s.secondImagesContainer} justify-center`}>
                <img src={`${resp?.image}`} alt="" />
                <img src={`${resp?.image}`} alt="" />
                <img src={`${resp?.image}`} alt="" />
              </div>
            </div>
            <div className={`flex items-center `}>
              <FontAwesomeIcon icon={faCircleChevronRight}  className={`${s.arrowimg}`}/>
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
                  {resp?.sku}
                </p>
                <p>
                  <span>Año : </span>
                  {resp?.released}
                </p>

                <p>
                  <span>Categoria: </span>{" "}
                  {resp?.categories?.map((e) => e.name) + " "}
        
                </p>
                {}
                <p className="mt-12">
                    <span>Descripción: </span>

                  {/* {resp?.description} */}


                 {resp?.description?.length > 56 ? (
                    <>
                      {resp?.description?.substring(0, 56)}
                      <p className={descriptionText? s.show: s.hide}>
                        {resp?.description?.substring(56, resp?.description?.length)}
                      </p>
                        <span onClick={() => {
                          setDescriptionText(!descriptionText)
                        }} className = {s.leerSpans}>
                          <span className={descriptionText? s.hide: s.show }>
                            ...Leer más
                          </span>
                          <br/>
                          <span className={descriptionText? `${s.show}`: s.hide }>
                            ...Ver menos
                          </span>
                        </span>
                    </>
                  ) : (
                    <>
                      {resp?.description}
                    </>
                  )}
                  
                  
                </p>
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
      </div>

      <div className={`${s.particulas}`}></div>
      <div className={`${s.particulas}`}></div>
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
