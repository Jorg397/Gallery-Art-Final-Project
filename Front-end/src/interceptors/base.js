import axios from "axios";
import responseInterceptor from "./responseInterceptors";
import requestInterceptor from "./requestInterceptors";

const apiUrl = "http://localhost:3001";

//const apiUrl = "https://15.228.78.162:3001";



const Api = axios.create({
  baseURL: apiUrl,
});
responseInterceptor(Api);
requestInterceptor(Api);
export default Api;
