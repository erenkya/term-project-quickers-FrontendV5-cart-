import React, { useRef, useState } from "react";
import Fade from "react-reveal/Fade";
import {toast } from "react-toastify";
import Swal from "sweetalert2";
import Pikaday from "pikaday";
import {useNavigate} from 'react-router-dom';

export default function CustomerRegister() {
  const navigate = useNavigate();

  const name = useRef();
  const surname = useRef();
  const username = useRef();
  const password = useRef();
  const repassword = useRef();
  const mail = useRef();
  const remail = useRef();
  const birth = useRef();
  const crediCard = useRef();
  const adress = useRef();
  const [isActive, setIsActive] = useState(false);
  function inputFocus(e) {
    e.target.previousSibling.style.zIndex = "3";

    console.log(document.activeElement);
    if (
      e.target.previousSibling.innerHTML === "Birth date (dd/mm/yy)" &&
      !isActive
    ) {
      let datepicker;

      Swal.fire({
        title: "Please enter birth date",
        input: "text",
        inputValue: new Date().toISOString(),
        stopKeydownPropagation: false,
        preConfirm: () => {
          if (
            datepicker.getDate() > new Date(new Date().setHours(0, 0, 0, 0))
          ) {
            Swal.showValidationMessage(`The birth date can't be in the future`);
          }
          return datepicker.getDate();
        },
        didOpen: () => {
          datepicker = new Pikaday({
            field: Swal.getInput(),
            yearRange: [1968, 2023],
          });
          setTimeout(() => datepicker.show(), 400); // show calendar after showing animation
        },
        didClose: () => {
          datepicker.destroy();
        },
      }).then((result) => {
        e.target.value = `${result.value.toString().slice(0, 15)}`;
      });
      setIsActive(true);
    } else {
      setTimeout(() => {
        e.target.previousSibling.style.marginTop = "-12px";
        e.target.previousSibling.style.color = "black";
        e.target.previousSibling.style.fontSize = "1.05rem";
        setIsActive(false);
      }, 100);
    }
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
      name.current.value &&
      surname.current.value &&
      username.current.value &&
      password.current.value &&
      repassword.current.value &&
      mail.current.value &&
      birth.current.value
    ) {
      if (password.current.value === repassword.current.value) {
          if(checkMail(mail.current.value)){
            showAlert(1,`Succesfully registered ! ${name.current.value}`)
            setTimeout(()=>{
              navigate('/customer-login');

            },2000)
             const user = {
               name:name.current.value,
               surname:surname.current.value,
               username:username.current.value,
               email:mail.current.value,
               password:password.current.value,
               repassword:repassword.current.value,
               birth:birth.current.value,
               crediCard:crediCard.current.value,
               adress:adress.current.value};
               setLocal(user)
               
          }else{
            showAlert(2,`This mail is already used ! ${name.current.value}`)

          }
        
      } else {
        showAlert(3,`Check your password ! ${name.current.value}`)
      }
    } else {
      showAlert(3,`Fill the blanks ! ${name.current.value}`)
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
        name.current.value = "";
        surname.current.value = "";
        username.current.value = "";
        password.current.value = "";
        repassword.current.value = "";
        mail.current.value = "";
        birth.current.value = "";
        crediCard.current.value = "";
        adress.current.value = "";
        resetLabels();
      } else if (result.isDenied) {
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

  function setLocal(user){
    let userList = []
    if(localStorage.getItem("userList")){
        userList = JSON.parse(localStorage.getItem("userList"));
        userList.push(user);

        
    }else{
      userList.push(user);
    }
    localStorage.setItem("userList",JSON.stringify(userList))

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
    <div className="container container2">
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
              <span className="inputPlaceholder">Name</span>
              <input ref={name} className="basicInput basicInput3"></input>
              <span className="inputPlaceholder spanLeft">Surname</span>
              <input
                ref={surname}
                className="basicInput basicInput3 basicLeft"
              ></input>
            </div>
            <div
              className="inputRow secondRegister"
              onFocus={(e) => inputFocus(e)}
              onBlur={(e) => inputOut(e)}
            >
              <span className="inputPlaceholder">Username</span>
              <input ref={username} className="basicInput basicInput2"></input>
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
              <span className="inputPlaceholder">Birth date (dd/mm/yy)</span>

              <input
                ref={birth}
                type="text"
                className="basicInput basicInput2"
              ></input>
            </div>

            <div
              className="inputRow secondRegister"
              onFocus={(e) => inputFocus(e)}
              onBlur={(e) => inputOut(e)}
            >
              <span className="inputPlaceholder">Credit Card No *</span>
              <input
                ref={crediCard}
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
