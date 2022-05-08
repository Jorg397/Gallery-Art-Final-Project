import axios from "axios";
import responseInterceptor from "./responseInterceptors";
import requestInterceptor from "./requestInterceptors";

const Api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});
responseInterceptor(Api);
requestInterceptor(Api);
export default Api;
