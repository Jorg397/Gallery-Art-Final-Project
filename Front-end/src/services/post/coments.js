import Api from "../../interceptors/base";
import axios from "axios";
import { toast } from "react-toastify";

export const coments = async (data, images) => {
  try {
   let array = images.map((item) => {
      return axios
        .post("https://api.cloudinary.com/v1_1/djuzewizj/upload", item)
    });
    let urlImages = [];
    await Promise.all(array).then(async (response) => {
      urlImages= response.map((item) => {
        return item = item.data.secure_url;
      }) 
    })
    .catch((error) => {console.log(error)});
    console.log("urlImages", urlImages);
    data.images=urlImages;
    const coments = await Api.post("/comment", data);
    console.log("esro cintesta ", coments);
    toast.success("comentario Guardado", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    return { status: false, message: error };
  }
};
