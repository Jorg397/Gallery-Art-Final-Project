import Api from "../../interceptors/base";
import axios from "axios";

export const coments = async (data, images) => {
  try {
    images.forEach((item) => {
      axios
        .post("https://api.cloudinary.com/v1_1/djuzewizj/upload", item)
        .then(function (response) {
          data.images.push(response.data.secure_url);
        })
        .catch(function (err) {
          console.log(err);
        });
    });
    console.log("promiseImages 2", data.images);

    //productData.image = uploadImage.data.secure_url;

    const coments = await Api.post("/coment", data);
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

    //     return {
    //       status: addProduct.status === 201 && true,
    //       message: addProduct.statusText,
    //     };
  } catch (error) {
    return { status: false, message: error };
  }
};
