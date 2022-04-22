import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_LOCAL_STORAGE = "ADD_LOCAL_STORAGE";
export const REMOVE_TO_CART = "REMOVE_TO_CART";

export function fetchPaints() {
    return function(dispatch) {
        dispatch({ type: "FETCH_PAINTS" });
        axios
            .get("http://localhost:3001/products")
            .then(function(response) {
                dispatch({
                    type: "FETCH_PAINTS_SUCCESS",
                    payload: response.data.content,
                });
            })
            .catch(function(err) {
                dispatch({ type: "FETCH_PAINTS_FAILURE", payload: err });
            });
    };
}

export function getDetail(id) {
    return function(dispatch) {
        dispatch({ type: "FETCH_PAINT_DETAIL" });
        axios
            .get("http://localhost:3001/product/" + id)
            .then(function(response) {
                dispatch({
                    type: "FETCH_PAINT_DETAIL",
                    payload: response.data,
                });
            })
            .catch(function(err) {
                dispatch({ type: "FETCH_PAINT_DETAIL_FAILURE", payload: err });
            });
    };
}

export function getCategories() {
    return function(dispatch) {
        dispatch({ type: "FETCH_CATEGORIES" });
        axios
            .get("http://localhost:3001/categories")
            .then(function(response) {
                dispatch({
                    type: "FETCH_CATEGORIES_SUCCESS",
                    payload: response.data,
                });
            })
            .catch(function(err) {
                dispatch({ type: "FETCH_CATEGORIES_FAILURE", payload: err });
            });
    };
}

export function filterByCategory(category) {
    return function(dispatch) {
        dispatch({ type: "FILTER_BY_CATEGORY", payload: category });
    };
}

export function filterByPrice(price) {
    return function(dispatch) {
        dispatch({ type: "FILTER_BY_PRICE", payload: price });
    };
}

export function addToCart(idProduct) {
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
    return {
        type: REMOVE_TO_CART,
        payload: idProduct,
    };
}