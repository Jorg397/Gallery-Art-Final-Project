import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Detail from "./components/Detail/Detail";

function App() {
	return (
		<Routes>
			<Route path='/home' element={<Home />} />
			<Route path='/' element={<Home />} />
			<Route path='/detail' element={<Detail />} />
		</Routes>
	);
}

export default App;
