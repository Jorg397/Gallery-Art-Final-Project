import axios from "axios";
import { toast } from "react-toastify";
import Api from "../../interceptors/base";

export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_LOCAL_STORAGE = "ADD_LOCAL_STORAGE";
export const REMOVE_TO_CART = "REMOVE_TO_CART";
export const GET_PROFILE = "GET_PROFILE";
export const GET_ORDERS = "GET_ORDERS";



export function fetchPaints() {
  return function (dispatch) {
    dispatch({ type: "FETCH_PAINTS" });
    Api
      .get(`/products`)
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
    Api
      .get(`/product/${id}`)
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
    Api
      .get(`/categories`)
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

export function getProfile(id){
  return function(dispatch){
    Api
      .get(`/customer/${id}`)
      .then(function(response){
        dispatch({
          type: GET_PROFILE,
          payload: response.data,
        });
      })
  }
}

export const getOrders = (idCustomer) => {
  return function (dispatch) {
    Api
      .get(`/orders/${idCustomer}`)
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
}

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
    toast.success("Eliminado con éxito del carrito", {
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
