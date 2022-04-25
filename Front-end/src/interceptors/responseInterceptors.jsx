import { toast } from "react-toastify";

const responseInterceptors = (axiosInstance) => {
    axiosInstance.interceptors.response.use((response) => {
      //Response Successful
      console.log(response);
      return response;
    },(error) => {
       if (error.response.status === 401) {
        localStorage.removeItem("token");
        console.log({error});
        toast.error("sesion expirada");
        window.location.href = "/login";
       } else {
       console.log({error}); 
      }
    });
    };
    export default responseInterceptors;