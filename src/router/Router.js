import { Routes, Route } from "react-router-dom";

import Home from "../page/Home";
import About from "../page/About";
import Contact from "../page/Contact";
import Login from "../page/Login";
import Products from "../page/Products";
import Product from "../page/Product";
import Cart from "../page/Cart";
import CreateProducts from "../page/CreateProduct";
import ProductDetails from "../page/ProductDetails";
import ReducerScreen from "../page/ReducerScreen";
import Calculadora from "../page/Calculadora";

export default function MyRouters() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/create-product" element={<CreateProducts />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/usereducer-component" element={<ReducerScreen />} />

            <Route path="/calculadora" element={<Calculadora />} />
        </Routes>
    )
}