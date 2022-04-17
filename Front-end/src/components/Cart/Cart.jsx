import { useSelector } from "react-redux";
import cartImage from "../../assets/shopping-cart.png";
function Cart({ openModal }) {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="grid pt-8 pr-6">
      <div
        className="place-self-end absolute z-10 grid cursor-pointer"
        onClick={openModal}
      >
        <img src={cartImage} alt="You Cart" />
        <span className="absolute top-0 place-self-center">{cart.length}</span>
      </div>
      ;
    </div>
  );
}

export default Cart;
