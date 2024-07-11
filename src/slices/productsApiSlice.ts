import {apiSlice} from "./apiSlice.ts";
import {Product} from "../components/ProductCard.tsx";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => '/products'
        }),
        getProductById: builder.query<Product, string>({
            query: (id: string) => `/products/${id}`
        })
    })
})