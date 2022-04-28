import {
  ADD_TO_CART,
  ADD_LOCAL_STORAGE,
  REMOVE_TO_CART,
  GET_PROFILE,
  GET_ORDERS,
} from "../actions/index";

const initialState = {
  paints: [],
  filteredPaints: [],
  loading: false,
  detail: [],
  cart: [],
  profile: [],
  cartTotal: 0,
  categories: [],
  orders: [],
};

export default function rootReducer(state = initialState, action) {
  const getProduct = (id_product) => {
    return state.paints.find((paint) => paint.id_product === id_product);
  };
  const getProductCart = (id_product) => {
    return state.cart.find((paint) => paint.id_product === id_product);
  };
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
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
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
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
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
        action.payload === "All"
          ? allPaints
          : mappedPaints.filter((paint) =>
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
        cartTotal: action.payload.reduce(
          (previousValue, currentValue) =>
            previousValue + (currentValue.price || 0),
          0
        ),
      };
    case ADD_TO_CART:
      let addProduct = getProduct(action.payload);
      return {
        ...state,
        cart: state.cart.concat(addProduct),
        cartTotal: state.cartTotal + addProduct.price,
      };
    case REMOVE_TO_CART:
      let removeProduct = getProductCart(action.payload);
      console.log(action.payload);
      let products = state.cart.filter(
        (paint) => paint.id_product !== action.payload
      );
      return {
        ...state,
        cart: products,
        cartTotal: state.cartTotal - removeProduct.price,
      };
    default:
      return state;
  }
}
