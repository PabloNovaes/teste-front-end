import type { Product } from "./product"

export interface InitialStateProps {
    products: null | Product[]
    filter: null
    loading: boolean
    error: null | Error
}


export type ActionProps =
    { type: "LOAD_PRODUCTS", payload: Product[] } |
    { type: "SET_LOADING", payload: boolean } |
    { type: "SET_ERROR", payload: Error } 