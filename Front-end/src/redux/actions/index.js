import axios from "axios";
import { toast } from "react-toastify";
import Api from "../../interceptors/base";

export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_LOCAL_STORAGE = "ADD_LOCAL_STORAGE";
export const REMOVE_TO_CART = "REMOVE_TO_CART";
export const GET_PROFILE = "GET_PROFILE";
export const CLEAN_CART = "CLEAN_CART";
export const GET_ORDERS = "GET_ORDERS";

const local = "http://localhost:3001";

export function fetchPaints() {
  return function (dispatch) {
    dispatch({ type: "FETCH_PAINTS" });
    Api.get(`${local}/products`)
      .then(function (response) {
        dispatch({
          type: "FETCH_PAINTS_SUCCESS",
          payload: response.data.content,
        });
      })
      .catch(function (err) {
        dispatch({ type: "FETCH_PAINTS_FAILURE", payload: err });
      });
  };
}

export function getDetail(id) {
  return function (dispatch) {
    dispatch({ type: "FETCH_PAINT_DETAIL" });
    Api.get(`${local}/product/${id}`)
      .then(function (response) {
        dispatch({
          type: "FETCH_PAINT_DETAIL",
          payload: response.data,
        });
      })
      .catch(function (err) {
        dispatch({ type: "FETCH_PAINT_DETAIL_FAILURE", payload: err });
      });
  };
}

export function getCategories() {
  return function (dispatch) {
    dispatch({ type: "FETCH_CATEGORIES" });
    Api.get(`${local}/categories`)
      .then(function (response) {
        dispatch({
          type: "FETCH_CATEGORIES_SUCCESS",
          payload: response.data,
        });
      })
      .catch(function (err) {
        dispatch({ type: "FETCH_CATEGORIES_FAILURE", payload: err });
      });
  };
}

export function getProfile(id) {
  return function (dispatch) {
    Api.get(`/customer/${id}`).then(function (response) {
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      });
    });
  };
}

export const getOrders = (idCustomer) => {
  return function (dispatch) {
    Api.get(`${local}/customer/${id}`)
      .then(function (response) {
        dispatch({
          type: GET_ORDERS,
          payload: response.data,
        });
      })
      .catch(function (err) {
        toast.error(err.response.data.message);
      });
  };
};

export function filterByCategory(category) {
  return function (dispatch) {
    dispatch({ type: "FILTER_BY_CATEGORY", payload: category });
  };
}

export function filterByPrice(price) {
  return function (dispatch) {
    dispatch({ type: "FILTER_BY_PRICE", payload: price });
  };
}

export function addToCart(idProduct) {
  toast.success("Agregado al carrito", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return {
    type: ADD_TO_CART,
    payload: idProduct,
  };
}

export function addLocalStorage(cart) {
  return {
    type: ADD_LOCAL_STORAGE,
    payload: cart,
  };
}

export function removeToCart(idProduct) {
  toast.error("Eliminado con éxito del carrito", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return {
    type: REMOVE_TO_CART,
    payload: idProduct,
  };
}
export function cleanCart() {
  return {
    type: CLEAN_CART,
    payload: [],
  };
}
export function createPaint(data) {
  return function (dispatch) {
    dispatch({ type: "CREATE_PAINT" });
    Api.post(`${local}/product`, data)
      .then(function (response) {
        dispatch({
          type: "CREATE_PAINT_SUCCESS",
          payload: response.data,
        });
      })
      .catch(function (err) {
        dispatch({ type: "CREATE_PAINT_FAILURE", payload: err });
      });
  };
}
export function filterState(state) {
  return {
    type: "FILTER_STATE",
    payload: state,
  };
}
export function searchAllThatContains(search) {
  return {
    type: "SEARCH_ALL_THAT_CONTAINS",
    payload: search,
  };
}

export function getCustomers() {
  return function (dispatch) {
    dispatch({ type: "FETCH_CUSTOMERS" });
    Api.get(`${local}/customer`)
      .then(function (response) {
        dispatch({
          type: "FETCH_CUSTOMERS_SUCCESS",
          payload: response.data,
        });
      })
      .catch(function (err) {
        dispatch({ type: "FETCH_CUSTOMERS_FAILURE", payload: err });
      });
  };
}

export function filterUserState(state) {
  return {
    type: "FILTER_USER_STATE",
    payload: state,
  };
}
export function switchUserState(state) {
  return {
    type: "SWITCH_USER_STATE",
    payload: state,
  };
}
export function getOrder(id) {
  return function (dispatch) {
    dispatch({ type: "FETCH_ORDER" });
    Api.get(`${local}/order/${id}`)
      .then(function (response) {
        dispatch({
          type: "FETCH_ORDER_SUCCESS",
          payload: response.data,
        });
      })
      .catch(function (err) {
        dispatch({ type: "FETCH_ORDER_FAILURE", payload: err });
      });
  };
}
export function searchUserThatContains(search) {
  return {
    type: "SEARCH_USER_THAT_CONTAINS",
    payload: search,
  };
}
export function searchPaintThatContains(search) {
  return {
    type: "SEARCH_PAINT_THAT_CONTAINS",
    payload: search,
  };
}
export function getCustomerById(id) {
  return function (dispatch) {
    dispatch({ type: "FETCH_CUSTOMER_BY_ID" });
    Api.get(`${local}/customer/${id}`)
      .then(function (response) {
        dispatch({
          type: "FETCH_CUSTOMER_BY_ID_SUCCESS",
          payload: response.data,
        });
      })
      .catch(function (err) {
        dispatch({ type: "FETCH_CUSTOMER_BY_ID_FAILURE", payload: err });
      });
  };
}

export function createProduct(formImage, productData) {
  return async function () {
    try {
      const uploadImage = await Api.post(
        "https://api.cloudinary.com/v1_1/djuzewizj/upload",
        formImage
      );

      productData.image = uploadImage.data.secure_url;

      const addProduct = await Api.post(`${local}/product`, productData);

      toast.success("Producto Guardado", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return {
        status: addProduct.status === 201 && true,
        message: addProduct.statusText,
      };
    } catch (error) {
      return { status: false, message: error };
    }
  };
}

export function updateOrders(idOrder, data) {
  return async function () {
    try {
      const result = await Api.put(`${local}/order/status/${idOrder}`, data);

      toast.success("Orden Actualizada");

      return result.data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
}

export function getOrdersForAdmin() {
  return async function () {
    try {
      const result = await Api.get(`${local}/orders`);

      return result.data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
}

export function updateCustomer(id_customer, customerData) {
  return async function () {
    try {
      const result = await Api.put(
        `${local}/customer/${id_customer}`,
        customerData
      );

      toast.success("Usuario Actualizado", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return result.data;
    } catch (error) {
      return { status: false, message: error };
    }
  };
}

export function createdCategories(name) {
  return async function () {
    try {
      const result = await Api.post(`${local}/categories`, name);

      toast.success("Categoria Agregada", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return result.data;
    } catch (error) {
      return { status: false, message: error };
    }
  };
}
