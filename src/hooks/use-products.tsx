import { BASE_URL } from "@/api.config";
import type { ActionProps, InitialStateProps } from "@/types/use-products";
import { useEffect, useReducer } from "react";


const reducer = (state: InitialStateProps, action: ActionProps): InitialStateProps => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: true, error: null }

        case "LOAD_PRODUCTS":
            return { ...state, products: action.payload, loading: false }

        case "SET_ERROR":
            return { ...state, error: action.payload, loading: false }

        default:
            return state
    }
}


export function useProducts() {
    const [content, dispatch] = useReducer(reducer, {
        filter: null,
        products: null,
        loading: false,
        error: null
    })

    useEffect(() => {
        const getProducts = async () => {
            try {
                dispatch({ type: "SET_LOADING", payload: true })

                const res = await fetch(BASE_URL, {
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                })

                const data = await res.json()

                dispatch({ type: "LOAD_PRODUCTS", payload: data })
            } catch (err) {
                if (err instanceof Error) {
                    dispatch({ type: "SET_ERROR", payload: err })
                    console.error(`Unexpected error occurred when load products: ${err.message}`)
                }
            }
        }

        getProducts()
    }, [])

    return content
}