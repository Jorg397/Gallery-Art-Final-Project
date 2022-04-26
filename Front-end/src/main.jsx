import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// only change commit - change commit - opcion3 -opcion
ReactDOM.render(
	<Provider store={store}>
		<ToastContainer
			theme='colored'
			transition={Flip}
			position='top-right'
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
		<React.StrictMode>
			<BrowserRouter>
					<App />
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,
	document.getElementById("root")
);
