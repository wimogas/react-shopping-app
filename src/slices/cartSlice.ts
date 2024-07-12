import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Product} from "../components/ProductCard.tsx";

export type CartProduct = {
    product: Product,
    quantity: number
}

type CartItemsState = {
    cartItems: CartProduct[],
    total: number
}

const localCart = localStorage.getItem('CART')

let initialState: CartItemsState = {
    cartItems: [],
    total: 0
}

if (localCart) {
   initialState = JSON.parse(localCart)
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartProduct>) => {
            const newProduct = action.payload
            const foundProduct = state.cartItems.findIndex((i: CartProduct) => i.product.id === newProduct.product.id)

            if(foundProduct >= 0) {
                state.cartItems = state.cartItems.map((product: CartProduct) => {
                    if (product.product.id === newProduct.product.id) {
                        product.quantity += newProduct.quantity
                    }
                    return product
                })
            } else {
                state.cartItems = [...state.cartItems, newProduct]
            }

            state.total = +state.cartItems.reduce((acc,curr) => acc + (curr.product.price * curr.quantity), 0).toFixed(2)
            localStorage.setItem('CART', JSON.stringify(state))
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter((product: CartProduct) => product.product.id !== action.payload)
            state.total = +state.cartItems.reduce((acc,curr) => acc + (curr.product.price * curr.quantity), 0).toFixed(2)
            if (state.cartItems.length > 0) {
                localStorage.setItem('CART', JSON.stringify(state))
            } else {
                localStorage.removeItem('CART');
            }
        },
        checkout: (state) => {
            state.cartItems = [];
            state.total = 0;
            localStorage.removeItem('CART');
        },
        updateProductQuantity: (state, action: PayloadAction<{id: number, qty: number}>) => {
            const newCartItems = state.cartItems.map(product => {
                if (product.product.id === action.payload.id) {
                    return {
                        ...product,
                        quantity: action.payload.qty > 0 ? action.payload.qty : 1,
                    }
                } else {
                    return product
                }
            })
            state.cartItems = [...newCartItems]
            state.total = +state.cartItems.reduce((acc,curr) => acc + (curr.product.price * curr.quantity), 0).toFixed(2)
            localStorage.setItem('CART', JSON.stringify(state))
        }
    }
})

export const { addToCart, removeFromCart , checkout , updateProductQuantity} = cartSlice.actions;

export default cartSlice.reducer