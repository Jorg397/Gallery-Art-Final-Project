import { useSelector } from "react-redux";
import cartImage from "../../assets/shopping-cart.png";
function Cart({ openModal }) {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="grid pt-8 pr-6">
      <div
        className="place-self-end z-10 grid cursor-pointer"
        onClick={openModal}
      >
        <span className="static -mb-6 z-10 place-self-center">
          {cart.length}
        </span>
        <img src={cartImage} alt="You Cart" />
      </div>
    </div>
  );
}

export default Cart;
