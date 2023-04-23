import React from "react";
import { useParams } from "react-router-dom";
import { productListe } from "../../Data/Product";
import { useState } from "react";
import "../../Dist/Style/ProductPage.css";
export default function ProductDetail() {
  let { productId } = useParams();
  const [product, setProduct] = useState(productListe[productId - 1]);
  return (
    <div>
      <div class="qqqq">
        <div class="product-cart">
          <div class="product-image">
            <img class="product-image-in" src={product.imgUrl} alt="" />
            <div class="colors">
              <button class="color blue">
                <img
                  alt=""
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/finish-blue-202209?wid=204&amp;amp;hei=204&amp;amp;fmt=jpeg&amp;amp;qlt=90&amp;amp;.v=1660774892141"
                  class="color-img"
                />
              </button>
              <button class="color purple">
                <img
                  alt=""
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/finish-purple-202209?wid=204&amp;amp;hei=204&amp;amp;fmt=jpeg&amp;amp;qlt=90&amp;amp;.v=1660774892139"
                  class="color-img"
                />
              </button>

              <button class="color yellow">
                <img
                  alt=""
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/finish-yellow-202303?wid=204&amp;amp;hei=204&amp;amp;fmt=jpeg&amp;amp;qlt=90&amp;amp;.v=1676425486393"
                  class="color-img"
                />
              </button>
              <button class="color">
                <img
                  alt=""
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/finish-midnight-202209?wid=204&amp;amp;hei=204&amp;amp;fmt=jpeg&amp;amp;qlt=90&amp;amp;.v=1660774892143"
                  class="color-img"
                />
              </button>
              <button class="color">
                <img
                  alt=""
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/finish-starlight-202209?wid=204&amp;amp;hei=204&amp;amp;fmt=jpeg&amp;amp;qlt=90&amp;amp;.v=1660774892142"
                  class="color-img"
                />
              </button>
            </div>
          </div>
          <div class="product-content">
            <p class="product-name">{product.productName}</p>
            <p class="product-price">{product.price}$ </p>
            <button class="btn">Add To Shopping Cart Now!</button>
            <p class="description">Description:</p>
            <p class="product-description">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
