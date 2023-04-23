import React, { useRef, useState } from "react";
import Fade from "react-reveal/Fade";
import {toast } from "react-toastify";
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom';


export default function SellerRegister() {
    const navigate = useNavigate();

  const shopName = useRef();
  const username = useRef();
  const password = useRef();
  const repassword = useRef();
  const mail = useRef();
  const country = useRef();
  const city = useRef();
  const adress = useRef();
  function inputFocus(e) {
    e.target.previousSibling.style.zIndex = "3";
      setTimeout(() => {
        e.target.previousSibling.style.marginTop = "-12px";
        e.target.previousSibling.style.color = "black";
        e.target.previousSibling.style.fontSize = "1.05rem";
      }, 100);
    
  }
  function inputOut(e) {
    if (!e.target.value) {
      e.target.previousSibling.style.zIndex = "0";
      e.target.previousSibling.style.marginTop = "12px";
      e.target.previousSibling.style.color = "rgb(108, 107, 107)";
      e.target.previousSibling.style.fontSize = "1rem";
    }
  }

  function signIn() {
    if (
      shopName.current.value &&
      username.current.value &&
      password.current.value &&
      repassword.current.value &&
      mail.current.value &&
      country.current.value &&
      city.current.value
    ) {
      if (password.current.value === repassword.current.value) {
        
            if(checkMail(mail.current.value)){
                showAlert(1,`Succesfully registered ! ${username.current.value}`)
                setTimeout(()=>{
                    navigate('/seller-login');

                },2000)
                const seller = {
                    username:username.current.value,
                    shopName:shopName.current.value,
                    email:mail.current.value,
                    password:password.current.value,
                    country:country.current.value,
                    city:city.current.value,
                    adress:adress.current.value};
                    setLocal(seller)
                   
              }else{
                showAlert(2,`This mail is already used ! ${username.current.value}`)
    
              }
        
      } else {
        showAlert(3,`Check your password ! ${username.current.value}`)
      }
    } else {
      showAlert(3,`Fill the blanks ! ${username.current.value}`)
    }
  }
  function checkMail(mail){
    let userList = [];
    let sellerList = [];
    let isOkey = true;
    if(localStorage.getItem("userList")){
      userList = JSON.parse(localStorage.getItem("userList"));
    }
    
    if(localStorage.getItem("sellerList")){
      sellerList = JSON.parse(localStorage.getItem("sellerList"));
    }

    for(let a = 0; a<userList.length; a++){
      if(userList[a].email == mail){
         isOkey = false;
      }
    }
    for(let a = 0; a<sellerList.length; a++){
      if(sellerList[a].email == mail){
         isOkey = false;
      }
    }

    return isOkey;
  }
  function resetInputs() {
    Swal.fire({
      title: "Do you want to reset all inputs ?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more  isConfirmed, isDenied below */
      if (result.isConfirmed) {
        shopName.current.value = "";
        username.current.value = "";
        password.current.value = "";
        repassword.current.value = "";
        mail.current.value = "";
        country.current.value = "";
        city.current.value = "";
        adress.current.value = "";
        resetLabels();
      }
    });

    function resetLabels() {
      let labels = document.getElementsByClassName("inputPlaceholder");
      console.log(labels[0]);
      for (let a = 0; a < labels.length; a++) {
        labels[a].style.marginTop = "12px";
        labels[a].style.color = "rgb(108, 107, 107)";
        labels[a].style.fontSize = "1rem";
      }
    }
  }

  function setLocal(seller){
    let sellerList = []
    if(localStorage.getItem("sellerList")){
        sellerList = JSON.parse(localStorage.getItem("sellerList"));
        sellerList.push(seller);

        
    }else{
        sellerList.push(seller);
    }
    localStorage.setItem("sellerList",JSON.stringify(sellerList))

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

  return (
    <div className="container container2 container3">
      <div className="loginContainer registerContainer">
        <Fade top delay={400}>
          <h2 className="title">
            Register <span className="brand brand2">QUICKERS</span>
          </h2>
        </Fade>
        <div className="inputContainer">
          <Fade bottom delay={400}>
            <div
              className="inputRow"
              onFocus={(e) => inputFocus(e)}
              onBlur={(e) => inputOut(e)}
            >
              <span className="inputPlaceholder">Username</span>
              <input ref={username} className="basicInput basicInput3"></input>
              <span className="inputPlaceholder spanLeft">Shop Name</span>
              <input
                ref={shopName}
                className="basicInput basicInput3 basicLeft"
              ></input>
            </div>
         
            <div
              className="inputRow secondRegister"
              onFocus={(e) => inputFocus(e)}
              onBlur={(e) => inputOut(e)}
            >
              <span className="inputPlaceholder">Email</span>

              <input
                ref={mail}
                type="email"
                className="basicInput basicInput2"
              ></input>
            </div>

            <div
              className="inputRow secondRegister"
              onFocus={(e) => inputFocus(e)}
              onBlur={(e) => inputOut(e)}
            >
              <span className="inputPlaceholder">Password</span>

              <input
                ref={password}
                type="password"
                className="basicInput basicInput3"
              ></input>
              <span className="inputPlaceholder spanLeft">Password</span>
              <input
                ref={repassword}
                type="password"
                className="basicInput basicInput3 basicLeft"
              ></input>
            </div>

           
            <div
              className="inputRow secondRegister"
              onFocus={(e) => inputFocus(e)}
              onBlur={(e) => inputOut(e)}
            >
              <span className="inputPlaceholder">Country</span>
              <input
                ref={country}
                type="text"
                className="basicInput basicInput2"
              ></input>
            </div>
            <div
              className="inputRow secondRegister"
              onFocus={(e) => inputFocus(e)}
              onBlur={(e) => inputOut(e)}
            >
              <span className="inputPlaceholder">City</span>
              <input
                ref={city}
                type="text"
                className="basicInput basicInput2"
              ></input>
            </div>
            <div
              className="inputRow secondRegister"
              onFocus={(e) => inputFocus(e)}
              onBlur={(e) => inputOut(e)}
            >
              <span className="inputPlaceholder">Adress*</span>
              <input
                ref={adress}
                type="text"
                className="basicInput basicInput2 basicInput4"
              ></input>
            </div>
          </Fade>
        </div>

        <div className="butonContainer">
          <button className="button button2" onClick={() => signIn()}>
            Sign In
          </button>
        </div>

        <div className="butonContainer">
          <button className="button button2" onClick={() => resetInputs()}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
