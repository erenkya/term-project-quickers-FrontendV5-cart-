import React, { useEffect, useRef, useState } from "react";
import "../../Dist/Style/Customer.css"
import gif from "../../Dist/img/rabbit.gif";
import { toast } from "react-toastify";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

export default function SellerLogin() {
    const navigate = useNavigate();

  const rabbit = useRef();
  const loader = useRef();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") ?? false
  );
  const mail = useRef();
  const password = useRef();
  useEffect(() => {
    setTimeout(() => {
      rabbit.current.style.translate = "2400px";
    }, 80);
    setTimeout(() => {
      loader.current.style.opacity = "0";
    }, 3000);
    setTimeout(() => {
      loader.current.style.display = "none";

      rabbit.current.style.transition = "0s";
      rabbit.current.style.translate = "0px";
    }, 3900);
  }, []);

  function logIn() {
    if (mail.current.value && password.current.value) {
      if (localStorage.getItem("sellerList")) {
        let userList = JSON.parse(localStorage.getItem("sellerList"));
        let isLogged = false;
        for (let a = 0; a < userList.length; a++) {
          if (
            userList[a].email == mail.current.value &&
            userList[a].password == password.current.value
          ) {
            setIsLogin(true);
            localStorage.setItem("seller", JSON.stringify(userList[a]));
            localStorage.setItem("isLogin", true);
            showAlert(1, "Succesfully Logged In.");
            isLogged = true;
            navigate('/panel');

            break;
          }
        }
        if (!isLogged) {
          showAlert(3, "Could'nt find this account");
        }
      } else {
        showAlert(3, "Could'nt find this account");
      }
    } else {
      showAlert(3, "Could'nt find this account");
    }
  }
  function showAlert(type, message) {
    switch (type) {
      case 1:
        toast.success(`${message}`, {
          position: "top-left",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      case 2:
        toast.warning(`${message}`, {
          position: "top-left",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      case 3:
        toast.error(`${message}`, {
          position: "top-left",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      default:
        break;
    }
  }
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
    <div className="container container3">
      <div ref={loader} className="loader">
        <img ref={rabbit} className="gif" src={gif}></img>
      </div>
    <div>{!localStorage.getItem("user") && !localStorage.getItem("seller") ?
      <Fade bottom delay={3400} cascade>
      <div className="loginContainer">
        <h2 className="title">
          Log In <span className="brand">QUICKERS</span>
        </h2>
        <div className="inputContainer">
          <div
            className="inputRow"
            onFocus={(e) => inputFocus(e)}
            onBlur={(e) => inputOut(e)}
          >
            <span className="inputPlaceholder">Username Or Email</span>

            <input ref={mail} className="basicInput"></input>
          </div>
          <div
            className="inputRow second"
            onFocus={(e) => inputFocus(e)}
            onBlur={(e) => inputOut(e)}
          >
            <span className="inputPlaceholder">Password</span>

            <input
              ref={password}
              type="password"
              className="basicInput"
            ></input>
          </div>
          <Link to={"/forgot-password"} className="forgot">Forgot password</Link>
        </div>
        <div className="butonContainer">
          <button className="button" onClick={() => logIn()}>
            Log In
          </button>
          <Link to="/seller-register" className="linkButton">
            <button className="button">Sign In</button>
          </Link>
        </div>
      </div>
    </Fade>:
             <div className="loggedContainer">
              {localStorage.getItem("user")?
              <div>
                 <div className="title top">You Are Already Logged As A Customer</div>  
                  <Link to="/home" className="linkButton">
              <button className="button top2">Go Home</button>
            </Link>  
              </div>:
                <div>
                <div className="title top">You Are Already Logged As A Seller</div>  
                 <Link to="/panel" className="linkButton">
             <button className="button top2">Go Panel</button>
           </Link>  
             </div>
              }
             </div>
}</div>
    
    </div>
  );
}
