import React from 'react'
import { useParams } from 'react-router-dom'
import { productListe } from '../../Data/Product';
import { useState } from 'react';
export default function ProductDetail() {
    let {productId} = useParams();
    const [product, setProduct] = useState(productListe[productId-1])
  return (
    <div>
        <h3>You can acces the choosed product with product attribute</h3>
        <h2>Product Name: {product.productName}</h2>
        <h4>Product Description: {product.description}</h4>

        <div>Product Price: {product.price}</div>
        <div>Product Count: {product.count}</div>
        <img src={product.imgUrl}></img>
    </div>
  )
}
