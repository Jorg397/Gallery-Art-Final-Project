const initialState = {
    paints: [],
    filteredPaints: [],
    loading: false,
    detail: []

}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_PAINTS':
            return {
                ...state,
                loading: true,
            }
        case 'FETCH_PAINTS_SUCCESS':
            return {
                ...state,
                paints: action.payload,
                filteredPaints: action.payload,
                loading: false,
            };
        case 'FETCH_PAINTS_FAILURE':
            return {
                ...state,
                loading: false,
            };
        case 'FETCH_PAINT_DETAIL':
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
            const mappedPaints = allPaints.map(paint => {
                return { ...paint, categories: paint.categories.map(e => e.name) };
            });
            const filtro = action.payload === "All" ? allPaints : mappedPaints.filter(paint => paint.categories.includes(action.payload));
            return {
                ...state,
                filteredPaints: filtro,
            };
        case "FILTER_BY_PRICE":
            return {
                ...state,
                filteredPaints: [...state.paints]?.sort((a, b) => {
                    if (a.price < b.price) {
                        return action.payload === "MAX" ? 1 : -1;
                    }
                    if (a.price > b.price) {
                        return action.payload === "MIN" ? -1 : 1;
                    }
                    return 0;

                })
            }
        default:
            return state;
    }
}