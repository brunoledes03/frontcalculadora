const AppReducer = (state, action) => {
    switch (action.type) {
        case 'GET_GASTOS':
            return {
                ...state,
                gastos: action.payload,
                loading: false
            }
        case 'DELETE_GASTO':
            return {
                ...state,
                gastos: state.gastos.filter(gasto => gasto._id !== action.payload)
            }
        case 'ADD_GASTO':
            return {
                ...state,
                loading: false,
                gastos: [...state.gastos, action.payload]
            }
        case 'GASTOS_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default AppReducer