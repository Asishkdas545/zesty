import React, { useState } from "react";
import ReactDOM from "react-dom/client"; 
import Restaurant from "../components/restaurant";
import Home from "../components/home";
import { BrowserRouter, Routes, Route } from "react-router";
import RestaurantMenu from "../components/restaurantmenu";
import SearchFood from "../components/searchFood";
import SecondaryHome from "../components/secondaryHome";
import {store} from "../stored/stores"
import { Provider } from "react-redux";
import Checkout from "../components/checkout";
function App(){
    return(
        <>
        <Provider store={store}>
        <BrowserRouter>
        <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route element={<SecondaryHome></SecondaryHome>}>
                <Route path="/restaurant" element ={<Restaurant></Restaurant>}></Route>
                <Route path="/city/Delhi/:id" element={<RestaurantMenu></RestaurantMenu>}></Route>
                <Route path="/city/delhi/:id/search" element={<SearchFood></SearchFood>}></Route>
                </Route>
                <Route path="/Checkout" element={<Checkout></Checkout>}></Route>
        </Routes>
        </BrowserRouter>
        </Provider>
        </>
    )
}
ReactDOM.createRoot(document.getElementById('root')).render(<App></App>);