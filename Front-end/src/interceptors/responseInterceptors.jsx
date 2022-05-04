import { toast } from "react-toastify";

const responseInterceptors = (axiosInstance) => {
    axiosInstance.interceptors.response.use((response) => {
      //Response Successful
      console.log("esponse en base ",response);
      return response;
    },(error) => {
       if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('id_customer');
        console.log({error});
        toast.error("sesion expirada");
        window.location.href = "/login";
       } else {
       console.log({error}); 
      }
    });
    };
    export default responseInterceptors;