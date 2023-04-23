import React, {useState } from 'react'
import "../../Dist/Style/Customer.css"
import {useNavigate} from 'react-router-dom';

export default function Panel() {
    const navigate = useNavigate();

    const [seller,setSeller] = useState(JSON.parse(localStorage.getItem("seller")) ?? {})


    function logout(){
        localStorage.removeItem("seller");
        setTimeout(() => {
            navigate('/');
        }, 200);
    }
    return (
  <div>
    {seller.username ? 
      <div className='title top'> <span className='brand'>{seller.username}</span> Welcome To Panel Page!! 
      <div>
      <button className='button top2' onClick={()=> logout()}>Log out</button>
      </div>
      </div>:
      <div className='title top'>Panel Page</div>    
}
  </div>
  )
}
