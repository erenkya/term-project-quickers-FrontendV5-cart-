import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';


export default function Forgot() {
    const mail = useRef();
    function inputFocus(e) {
        e.target.parentNode.childNodes[0].style.zIndex = "3";
        e.target.parentNode.childNodes[0].style.marginTop = "-15px";
        e.target.parentNode.childNodes[0].style.color = "black";
        e.target.parentNode.childNodes[0].style.fontSize = "1.14rem";
      }
      function inputOut(e) {
        if (!e.target.parentNode.childNodes[1].value) {
          e.target.parentNode.childNodes[0].style.zIndex = "2";
    
          e.target.parentNode.childNodes[0].style.marginTop = "12px";
          e.target.parentNode.childNodes[0].style.color = "rgb(108, 107, 107)";
          e.target.parentNode.childNodes[0].style.fontSize = "1rem";
        }
      }
  return (
    <div className="container forgotContainer">
          <div className="loginContainer">
    <h2 className="title">
      Forgot Password ?
    </h2>

    <div className="inputContainer">
      <div
        className="inputRow"
        onFocus={(e) => inputFocus(e)}
        onBlur={(e) => inputOut(e)}
      >
        <span className="inputPlaceholder">Email</span>

        <input ref={mail} className="basicInput"></input>
      </div>
     
    </div>
    <div className="butonContainer">

    <Link to="/" className="linkButton">
    <button className="button">
       Back
      </button>
      </Link>
      
      <button className="button">Send</button>
      
    </div>
  </div>
    </div>
  
  )
}
