import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Detail from "./components/Detail/Detail";
import Landing from "./components/Landing/Landing";

function App() {
	return (
		<Routes>
			<Route path='/home' element={<Home />} />
			<Route path='/' element={<Landing />} />
			<Route path='/details/:id' element={<Detail />} />
		</Routes>
	);
}

export default App;
