import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from './AppReducer'

//Estado inical
const initialState = {
    gastos: [],
    loading: true,
    error: null
}
//URL de nuestra API
const API_URL = 'https://backendcalc-hwyz.onrender.com/api/gastos'

//creamos el contexto
export const GlobalContext = createContext(initialState)

//creamos el provider
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    //Cargar los datos al iniciar la app
    useEffect(() => {
        getGastos()
    },[])

    //Actions
    async function getGastos() {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'GET'
        })
        const data = await response.json()

        console.log("GET DATA:", data) // 👈 AGREGA ESTO

        dispatch({
            type: 'GET_GASTOS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'GASTOS_ERROR',
            payload: error.message
        })
    }
}

    async function deleteGasto(id) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })

            dispatch({
                type: 'DELETE_GASTO',
                payload: id
            })
        } catch (error) {
            dispatch({
                type: 'GASTOS_ERROR',
                payload: error.message
            })
        }
    }

    async function addGasto(gasto) {
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gasto)
            })
            const data = await response.json()
            dispatch({
                type: 'ADD_GASTO',
                payload: data
            })
        } catch (error) {
            dispatch({
                type: 'GASTOS_ERROR',
                payload: error.message
            })
        }
    }
    return (
        <GlobalContext.Provider value={{
            gastos: state.gastos,
            loading: state.loading,
            error: state.error,
            deleteGasto,
            addGasto
        }}>
            {children}
        </GlobalContext.Provider>)
}