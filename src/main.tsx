import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './store'

import App from './App.tsx'
import './index.css'
import HomePage from "./pages/HomePage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CartPage from "./pages/CartPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index={true} path="/" element={<HomePage/>}></Route>
            <Route path="/products" element={<HomePage/>}></Route>
            <Route path="/products/page/:page" element={<HomePage/>}></Route>
            <Route path="/products/:id" element={<ProductPage/>}></Route>
            <Route path="/cart" element={<CartPage/>}></Route>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
      </Provider>
  </React.StrictMode>,
)
