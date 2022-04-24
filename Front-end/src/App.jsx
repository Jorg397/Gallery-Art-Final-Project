import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Detail from "./components/Detail/Detail";
import Login from "./Page/Login/index";
import Registry from "./Page/Registry/index";
import "./App.css";
import Landing from "./components/Landing/Landing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addLocalStorage } from "./redux/actions/index";
import PaymentGateway from "./components/Payment";
import Gallery from "./Page/Gallery";
import Admin from "./Page/Dashboard/Admin/Admin";
import Clientes from "./Page/Dashboard/Admin/Clientes";
import Pinturas from "./Page/Dashboard/Admin/Pinturas";
import Profile from "./Page/Profile/Index";

export default function App() {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	useEffect(() => {
		if (cart.length) {
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}, [cart]);

	useEffect(() => {
		const localStorageCart = localStorage.getItem("cart");
		if (!localStorageCart) {
			localStorage.setItem("cart", JSON.stringify([]));
		} else {
			dispatch(addLocalStorage(JSON.parse(localStorageCart)));
		}
	}, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registry" element={<Registry />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Landing />} />
      <Route path="/details/:id" element={<Detail />} />
      <Route path="/payment" element={<PaymentGateway />} />
      <Route path='/gallery' element={<Gallery />} />
	  <Route path='/dashboard' element={<Admin />} />
	  <Route path='/dashboard/clients' element={<Clientes />} />
	  <Route path='/dashboard/orders' element={<Pinturas />} />
	  <Route path='/perfil' element={<Profile/>}/>
    </Routes>
  );
}

