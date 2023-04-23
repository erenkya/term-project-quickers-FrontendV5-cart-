import React from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CustomerLogin from "./Login-Register/Customer/CustomerLogin";
import { ToastContainer } from "react-toastify";
import CustomerRegister from "./Login-Register/Customer/CustomerRegister";
import "react-widgets/styles.css";
import "./Dist/Style/Customer.css"
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Pages/HomePage/Home.js";
import HomeProducts from "./Pages/HomePage/HomeProducts";

import Option from "./Login-Register/Option";
import SellerLogin from "./Login-Register/Seller/SellerLogin";
import SellerRegister from "./Login-Register/Seller/SellerRegister";
import Panel from "./Pages/Panel/Panel";

import Navbar from "./Components/Navbar";
import Forgot from "./Login-Register/Forgot/Forgot";
import HomeNavigate from "./Components/HomeNavigate";
import ProductSlider from "./Components/ProductSlider";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import SearchProduct from "./Pages/SearchPage/SearchProduct";
export default function App() {
  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>

          <Route exact path="/" element={<Option/>}/>
          <Route exact path="/forgot-password" element={<Forgot/>}/>

          <Route exact path="/customer-login" element={<CustomerLogin/>}/>
          <Route exact path="/customer-register" element={<CustomerRegister/>}/>
          <Route exact path="/seller-login" element={<SellerLogin/>}/>
          <Route exact path="/seller-register" element={<SellerRegister/>}/>
          <Route exact path="/home" element={
            <div className="home">
              <Navbar></Navbar>
              <Home/>
              <HomeProducts/>
              <ProductSlider/>
            </div>
          }/>
          <Route exact path="/panel" element={<Panel/>}/>
          <Route exact path="/search/:searchWord" element={<SearchProduct/>}/>

          <Route exact path="/productPage/:productId" element={<ProductDetail/>}/>

        </Routes>
    </Router>
          <HomeNavigate></HomeNavigate>
    </div>
  );
}
