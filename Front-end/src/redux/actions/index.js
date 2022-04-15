import axios from 'axios';

export function fetchPaints() {
    return function(dispatch) {
        dispatch({ type: 'FETCH_PAINTS' });
        axios.get('http://localhost:3010/products')
            .then(function(response) {
                dispatch({ type: 'FETCH_PAINTS_SUCCESS', payload: response.data });
            })
            .catch(function(err) {
                dispatch({ type: 'FETCH_PAINTS_FAILURE', payload: err });
            });
    };
}

export function getDetail(id) {
    return function(dispatch) {
        dispatch({ type: 'FETCH_PAINT_DETAIL' });
        axios.get('http://localhost:3010/products/' + id)
            .then(function(response) {
                dispatch({ type: 'FETCH_PAINT_DETAIL', payload: response.data });
            })
            .catch(function(err) {
                dispatch({ type: 'FETCH_PAINT_DETAIL_FAILURE', payload: err });
            });
    };
}

export function getCategories() {
    return function(dispatch) {
        dispatch({ type: 'FETCH_CATEGORIES' });
        axios.get('http://localhost:3010/categories')
            .then(function(response) {
                dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: response.data });
            })
            .catch(function(err) {
                dispatch({ type: 'FETCH_CATEGORIES_FAILURE', payload: err });
            });
    };
}

export function filterByCategory(category) {
    return function(dispatch) {
        dispatch({ type: 'FILTER_BY_CATEGORY', payload: category });
    };
}

export function filterByPrice(price) {
    return function(dispatch) {
        dispatch({ type: 'FILTER_BY_PRICE', payload: price });
    };
}
