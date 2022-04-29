const requestInterceptors = (axiosInstance) => {
    axiosInstance.interceptors.request.use((config) => {
       const jwtToken = localStorage.getItem("token");
       config.headers["Authorization"] ='bearer ' + jwtToken;
       return config;
    },(error) => {
       console.log("require error",error);
    });
    };
    export default requestInterceptors;