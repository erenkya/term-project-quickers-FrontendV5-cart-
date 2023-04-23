import React from 'react'
import "../Dist/Style/Customer.css"
import { Link } from "react-router-dom";

export default function Option() {
  return (
    <div className='container'>
        <div className='optionContainer'>
          <h1 className='title'>Which Quicker Are You ?</h1>
          <div className='option'>
          <Link to={"/customer-login"}>
          <button className='optionButton'>Customer</button>
          </Link>
          </div>
          <div className='option'>
          <Link to={"/seller-login"}>
          <button className='optionButton'>Seller</button>
          </Link>

          </div>

        </div>
    </div>
  )
}
