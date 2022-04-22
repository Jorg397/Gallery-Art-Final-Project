import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { ToastContainer, Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
				<Auth0Provider
					domain='dev-flotws23.us.auth0.com'
					clientId='pRJYzAopJub2qstKEvPHdoDBOBuX1yx5'
					redirectUri={window.location.origin}>
					<App />
				</Auth0Provider>
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,
	document.getElementById("root")
);
