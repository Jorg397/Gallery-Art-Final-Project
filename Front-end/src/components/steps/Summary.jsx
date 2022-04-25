import { useDispatch, useSelector } from "react-redux";
import { removeToCart } from "../../redux/actions/index";
import s from "./summary.module.css";
import backgroundTitle from "../../assets/background-cart-modal-title.png";
import buttonRemoveCart from "../../assets/button_cart_remove.png";

function Summary({ openModal, modalState }) {
  const cart = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.cartTotal);
  const dispatch = useDispatch();

  const handleDeleteToCart = (idProduct) => {
    dispatch(removeToCart(idProduct));
  };

  return (
    <div
      className={` grid grid-cols-1 grid-rows-4 my-10 relative h-64 rounded-3xl justify-end text-white`}
    >
      <div className="grid grid-cols-7 col-span-7 justify-between bg-no-repeat bg-center">
        <span className="col-span-5 font-semibold text-base">Producto</span>
        <span className="col-span-2 pr-3 font-semibold text-base">Precio</span>
      </div>
      <div className="grid grid-cols-7 col-span-7 gap-4 row-span-2 items-center overflow-scroll">
        {cart?.map((product) => (
          <>
            <div className="col-span-4 flex items-center justify-between pr-16">
              <span className="text-sm">{product.name}</span>
              <img
                src={product.image}
                alt=""
                className={`${s.img_product} w-14 h-16`}
              />
            </div>
            <div className="col-start-6 col-span-1">
              <span className="font-semibold">{product.price}</span>
            </div>
            <div className="flex col-span-1 justify-end cursor-pointer">
              <span onClick={() => handleDeleteToCart(product.id_product)}>
                <img
                  className="img_remove"
                  src={buttonRemoveCart}
                  alt="Remove to cart"
                />
              </span>
            </div>
          </>
        ))}
      </div>
      <div className="grid gap-y-4 grid-cols-7">
        <div className="grid col-start-6 col-span-2">
          <div className="flex justify-between font-semibold">
            <span>Total: </span>
            <span>{cartTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Summary;
