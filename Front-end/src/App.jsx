import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Detail from "./components/Detail/Detail";
import Login from "./Page/Login/index";
import Registry from "./Page/Registry/index";
import './App.css';

function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/registry' element={<Registry />} />
			<Route path='/home' element={<Home />} />
			<Route path='/' element={<Home />} />
			<Route path='/detail' element={<Detail />} />
		</Routes>
	);
}

export default App;
