import {
  ADD_TO_CART,
  ADD_LOCAL_STORAGE,
  REMOVE_TO_CART,
  GET_PROFILE,
  CLEAN_CART,
  GET_ORDERS,
  GET_COMMENTS,
  RESET_TOTAL_PAGES,
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
  filterCategories: [],
  customers: [],
  orders: [],
  customer: [],
  comments: [],
  totalPages: 0,
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
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case "FETCH_PAINTS_SUCCESS":
      return {
        ...state,
        paints: state.paints.concat(action.payload.content),
        filteredPaints: state.filteredPaints.concat(action.payload.content),
        totalPages: action.payload.totalPages,
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
        filterCategories: action.payload,
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
    case "FETCH_CUSTOMERS_SUCCESS":
      return {
        ...state,
        customers: action.payload,
        loading: false,
      };
    case "FETCH_CUSTOMERS_FAILURE":
      return {
        ...state,
        loading: false,
      };
    case "FETCH_ORDERS_SUCCESS":
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case "FETCH_ORDERS_FAILURE":
      return {
        ...state,
        loading: false,
      };
    case "SEARCH_ALL_THAT_CONTAINS":
      return {
        ...state,
        filterCategories: [...state.categories].filter(
          (category) =>
            category.id_category
              .toString()
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            category.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case "FILTER_STATE":
      if (action.payload === "All") {
        return {
          ...state,
          filteredPaints: [...state.paints],
        };
      } else
        return {
          ...state,
          filteredPaints: [...state.paints].filter((paint) =>
            paint.state.toLowerCase().includes(action.payload.toLowerCase())
          ),
        };
    case "SEARCH_USER_THAT_CONTAINS":
      return {
        ...state,
        customers: [...state.customers].filter((customer) =>
          customer.email.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case "SEARCH_PAINT_THAT_CONTAINS":
      return {
        ...state,
        filteredPaints: [...state.paints].filter(
          (paint) =>
            paint.name.toLowerCase().includes(action.payload.toLowerCase()) ||
            paint.description
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            paint.categories
              .map((e) => e.name.toLowerCase())
              .includes(action.payload.toLowerCase()) ||
            paint.price.toString().includes(action.payload) ||
            paint.sku.includes(action.payload) ||
            paint.measures.toString().includes(action.payload) ||
            paint.technique
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            paint.released.toString().includes(action.payload)
        ),
      };
    case "FETCH_CUSTOMER_BY_ID_SUCCESS":
      return {
        ...state,
        customer: action.payload,
      };
    case RESET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    default:
      return state;
  }
}
