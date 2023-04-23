import React, { useLayoutEffect } from "react";
import "../../Dist/Style/Product.css";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../../Redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";

import { productListe } from "../../Data/Product.js";
import Filter from "../../Components/Filter";

export default function HomeProducts() {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorities")) ?? []
  );
  const cart = useSelector((state) => state.cart.cart);
  const searchValue = useSelector((state) => state.cart.searchValue);
  const filterPrices = useSelector((state) => state.cart.filterPrices);

  const productList = productListe;
  function removeMethod(product) {
    dispatch(removeProduct(product));
  }
  function addMethod(product) {
    dispatch(addProduct(product));
  }
  function addFavorite(product) {
    let newList;

    if (!favorites.includes(product.productId)) {
      newList = [...favorites, product.productId];
      setFavorites([...favorites, product.productId]);
      toast.success(`${product.productName} Added the Favorities`, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      newList = [...favorites];
      newList.splice(newList.indexOf(product.productId), 1);
      setFavorites(newList);
      toast.error(`${product.productName} Removed from the Favorities`, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    localStorage.setItem("favorities", JSON.stringify(newList));
  }
  return (
    <div>
      <Filter></Filter>
      <div className="productContainer">
        {productList.map((product, index) => (
          <div key={index} >
            {(product.productName.includes(searchValue) && (product.price > filterPrices[0] && product.price < filterPrices[1]))? (
              <div className="product">
                <Link
                  to={`/productPage/${product.productId}`}
                  key={product.productId}
                  className="productLink"
                >
                  <div className="imgCont">
                    <img className="productImg" src={`${product.imgUrl}`} />
                  </div>
                  <div className="productTitle">{product.productName}</div>
                  <div className="text">{product.description}</div>
                  <div className="price">{product.price}$</div>

                  <a
                    onClick={() => addFavorite(product)}
                    className="hearthButton"
                  >
                    {favorites.includes(product.productId) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    ) : (
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
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    )}
                  </a>
                </Link>
                <div className="buttonCont">
                  {cart.filter(
                    (cartProduct) => product.productId == cartProduct.productId
                  )[0] ? (
                    <div className="buttonCont2">
                      <button
                        className="buyButton buyButtonCount"
                        onClick={() => removeMethod(product)}
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
                        onClick={() => addMethod(product)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="buyButton"
                      onClick={() => addMethod(product)}
                    >
                      Puschase
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <p className="d-none"></p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
