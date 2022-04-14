import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
	<Provider store={store}>
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
