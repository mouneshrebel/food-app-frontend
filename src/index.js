import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NewProduct from "./pages/NewProduct";
import Signup from "./pages/Signup";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="home" element={<Home />}></Route>
      <Route path="menu" element={<Menu />}></Route>
      <Route path="menu/:dataFilter" element={<Menu />}></Route>
      <Route path="about" element={<About />}></Route>
      <Route path="contact" element={<Contact />}></Route>
      <Route path="login" element={<Login />}>
        {" "}
      </Route>
      <Route path="product" element={<NewProduct />}></Route>
      <Route index  element={<Signup />}></Route>
      <Route path="cart" element={<Cart />}></Route>
      <Route path="*" element= {<Error/>}></Route>
      <Route path="/checkout-success" element= {<CheckoutSuccess/>}></Route>
 
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
