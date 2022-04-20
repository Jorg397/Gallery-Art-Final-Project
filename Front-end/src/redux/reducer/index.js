import {
    ADD_TO_CART,
    ADD_LOCAL_STORAGE,
    REMOVE_TO_CART,
} from "../actions/index";

const initialState = {
    paints: [],
    filteredPaints: [],
    loading: false,
    detail: [],
    cart: [],
    categories: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_PAINTS":
            return {
                ...state,
                loading: true,
            };
        case "FETCH_PAINTS_SUCCESS":
            return {
                ...state,
                paints: action.payload,
                filteredPaints: action.payload,
                loading: false,
            };
        case "FETCH_PAINTS_FAILURE":
            return {
                ...state,
                loading: false,
            };
        case "FETCH_PAINT_DETAIL":
            return {
                ...state,
                detail: action.payload,
                loading: false,
            };
        case "FETCH_CATEGORIES_SUCCESS":
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        case "FETCH_CATEGORIES_FAILURE":
            return {
                ...state,
                loading: false,
            };
        case "FILTER_BY_CATEGORY":
            let allPaints = state.paints;
            const mappedPaints = allPaints.map((paint) => {
                return {
                    ...paint,
                    categories: paint.categories.map((e) => e.name),
                };
            });
            const filtro =
                action.payload === "All" ?
                allPaints :
                mappedPaints.filter((paint) =>
                    paint.categories.includes(action.payload)
                );
            return {
                ...state,
                filteredPaints: filtro,
            };
        case "FILTER_BY_PRICE":
            return {
                ...state,
                filteredPaints: [...state.paints].sort((a, b) => {
                    if (a.price < b.price) {
                        return action.payload === "MAX" ? 1 : -1;
                    }
                    if (a.price > b.price) {
                        return action.payload === "MIN" ? -1 : 1;
                    }
                    return 0;
                }),
            };
        case ADD_LOCAL_STORAGE:
            return {
                ...state,
                cart: action.payload,
            };
        case ADD_TO_CART:
            return {
                ...state,
                cart: state.cart.concat(
                    state.paints.filter(
                        (paint) => paint.id_product === action.payload
                    )
                ),
            };
        case REMOVE_TO_CART:
            return {
                ...state,
                cart: state.cart.filter(
                    (product) => product.id_product !== action.payload
                ),
            };
        default:
            return state;
    }
}