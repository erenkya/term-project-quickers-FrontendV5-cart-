import React, { useEffect } from "react";
import { useState } from "react";
import "../Dist/Style/Product.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  editSearchValue
} from "../Redux/features/cart/cartSlice";
import "../Dist/Style/Navbar.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const overlay = useRef();
  const cartBar = useRef();
  const searchInput = useRef();


  const [searchValue, setSearchValue] = useState("");


  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
   
    let sumPrice = 0;
    let sumProducts = 0;
    for (let a = 0; a < cart.length; a++) {
      sumPrice += cart[a].count * cart[a].price;
      sumProducts += cart[a].count;
    }
    setTotalPrice(sumPrice);
    setTotalProducts(sumProducts);
  }, [cart]);

  function addFunction(product) {
    dispatch(addProduct(product));
  }
  function removeFunction(product) {
    dispatch(removeProduct(product));
  }

  function slideHandler() {
    setIsSlideOpen(!isSlideOpen);

    if (!isSlideOpen) {
      setTimeout(() => {
        overlay.current.style.display = "block";
      }, 10);
      setTimeout(() => {
        overlay.current.style.opacity = "1";
      }, 30);
    } else {
      setTimeout(() => {
        overlay.current.style.opacity = "0";
      }, 10);
      setTimeout(() => {
        overlay.current.style.display = "none";
      }, 20);
    }
  }

  function inputHandler(e){
    setSearchValue(e.target.value)
    dispatch(editSearchValue(e.target.value))
  }
  return (
    <div>
      <div onClick={()=> slideHandler()} ref={overlay} className="overlay"></div>

      <div className="navbarContainer">
      <div className="searchOverlay"></div>

        <h3 className="navBrand">Quickers</h3>
        <div className="navLinks">
          <a className="navLink">Erkek</a>
          <a className="navLink">Kadın</a>
          <a className="navLink">Elektronik</a>
          <a className="navLink">İndirim</a>

        </div>
        <div className="navButtons">
          <input onChange={(e) => inputHandler(e)} ref={searchInput} className="navbarInput navbarFocused"></input>
        <button onClick={()=> dispatch(editSearchValue(searchValue))} className="navButton searchButton searchButtonFocused"> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

        </button>
        <a onClick={() => slideHandler()} className="navButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </a>
          <a onClick={() => slideHandler()} className="navButton">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
    <span className="cartFeedback">{totalProducts < 10 ? totalProducts : <div><span className="plus">+</span>9</div>}</span>
          </a>
        </div>
      </div>
      <div ref={cartBar} className={`cartContainer ` + (isSlideOpen ? " slideOpen " : " slideClose ")}
      >
        <a onClick={() => slideHandler()} className="closeButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </a>
        {cart.map((product, index) => (
          <div key={index} id="home" className="menu-item" href="/">
            <div className="imgContainer">
              <img className="cartProductImg" src={product.imgUrl}></img>
            </div>
            <div className="detailContainer">
              <p className="cartProductTitle">{product.productName}</p>
              <p className="cartProductPrice">{product.price * product.count}$</p>
              <div>
                <button
                  className="buyButton buyButtonCount"
                  onClick={() => removeFunction(product)}
                >
                  -
                </button>
                <span className="countText">
                  {
                    cart.filter(
                      (cartProduct) =>
                        product.productId == cartProduct.productId
                    )[0].count
                  }
                </span>

                <button
                  className="buyButton buyButtonCount"
                  onClick={() => addFunction(product)}
                >
                  +
                </button>
              </div>
            </div>

          </div>
        ))}
        <div className="buttonContainer2">
          <div>
            {totalPrice > 0 ? (
              <div>
                <div>
                  <button className="btn TotalButton">
                    <span className="totalTitle">Total: </span> {totalPrice} $
                  </button>
                </div>
                <div>
                  <button className="btn ShoppingCardButton TotalButton">
                    Shopping Card
                  </button>
                </div>
              </div>
            ) : (
              <p className="price ">Cart is Empty</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
 <div key={index} id="home" className="menu-item" href="/">
            <div key={index} className="product product2">
              <div className="btn">
                <button
                  id="delete"
                  className="del-btn"
                  onClick={() => dispatch(deleteProduct(product))}
                >
                  <HiTrash className="icon" />
                </button>
              </div>

              <img
                className="productImg productImage2"
                src={`${product.imgUrl}`}
              />
              <div>
                <button
                  className="buyButton buyButtonCount"
                  onClick={() => removeFunction(product)}
                >
                  -
                </button>
                <span className="countText">
                  {
                    cart.filter(
                      (cartProduct) =>
                        product.productId == cartProduct.productId
                    )[0].count
                  }
                </span>

                <button
                  className="buyButton buyButtonCount"
                  onClick={() => addFunction(product)}
                >
                  +
                </button>
              </div>

              <div className="productTitle productTitle2">
                {product.productName}
              </div>

              <div className="price price2">
                {product.count} x {product.price}$
              </div>
            </div>
          </div>
*/