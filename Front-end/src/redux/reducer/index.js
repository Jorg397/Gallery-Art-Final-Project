const initialState={
    paints: [],
    filteredPaints: [],
    loading: false,
    detail: []

}

export default function rootReducer(state = initialState, action){
    switch(action.type){
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
        default:
         return state;
    }
}