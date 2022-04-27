import axios from "axios";
import { toast } from "react-toastify";
import Api from "../../interceptors/base";

export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_LOCAL_STORAGE = "ADD_LOCAL_STORAGE";
export const REMOVE_TO_CART = "REMOVE_TO_CART";
export const GET_PROFILE = "GET_PROFILE";

const local = "http://localhost:3001"

export function fetchPaints() {
  return function (dispatch) {
    dispatch({ type: "FETCH_PAINTS" });
    Api
      .get(`${local}/products`)
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
      .get(`${local}/product/${id}`)
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
      .get(`${local}/categories`)
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
      .get(`${local}/customer/${id}`)
      .then(function(response){
        dispatch({
          type: GET_PROFILE,
          payload: response.data,
        });
      })
  }
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
export function createPaint(data) {
  return function (dispatch) {
    dispatch({ type: "CREATE_PAINT" });
    Api
      .post(`${local}/product`, data)
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
  }
}

export function getCustomers() {
  return function (dispatch) {
    dispatch({ type: "FETCH_CUSTOMERS" });
    Api
      .get(`${local}/customer`)
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
export function getOrders() {
  return function (dispatch) {
    dispatch({ type: "FETCH_ORDERS" });
    Api
      .get(`${local}/orders`)
      .then(function (response) {
        dispatch({
          type: "FETCH_ORDERS_SUCCESS",
          payload: response.data,
        });
      })
      .catch(function (err) {
        dispatch({ type: "FETCH_ORDERS_FAILURE", payload: err });
      });
  };
}