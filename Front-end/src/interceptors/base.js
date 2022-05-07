import axios from "axios";
import responseInterceptor from "./responseInterceptors";
import requestInterceptor from "./requestInterceptors";

//const apiUrl = "https://15.228.78.162:3001";

const Api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});
responseInterceptor(Api);
requestInterceptor(Api);
export default Api;
