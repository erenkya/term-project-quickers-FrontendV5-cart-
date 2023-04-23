import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import "../../Dist/Style/Customer.css"
export default function Home() {
  const navigate = useNavigate();

    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")) ?? {})
    function logout(){
      localStorage.removeItem("user");
      setTimeout(() => {
        navigate('/');
      }, 200);
  }
    return (
   <div>{user.name ?
    <div className='title'> <span className='brand'>{user.name}</span> Welcome To Home Page!! 
    <div>
    <button className='button top2' onClick={() => logout()}>Log out</button>
    </div>
    </div>:
    <div className='title top'>Home Page</div>
  }</div>
  )
}
