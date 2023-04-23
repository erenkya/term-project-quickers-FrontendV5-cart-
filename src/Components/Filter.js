import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import "../Dist/Style/Filter.css"
import {
    filterPriceSetter
} from "../Redux/features/cart/cartSlice";
export default function Filter() {
    const ref1 = useRef();
    const ref2 = useRef();
    const dispatch = useDispatch();

    function filterHandler(){
        let newList;
        if(isNaN(ref1.current.value) || isNaN(ref2.current.value)){

        }else{
            if(ref1.current.value == "" && ref2.current.value == ""){
                newList = [0,100000];
            }else{
                newList = [ref1.current.value,ref2.current.value];
                newList.sort();
                ref1.current.value = newList[0];
                ref2.current.value = newList[1];

            }
            dispatch(filterPriceSetter(newList));
    
        }
        
    }
  return (
        <div className='filterContainer'>
            <input className='filterInput' ref={ref1}></input>
            <input className='filterInput' ref={ref2}></input>
            <button className='filterBtn' onClick={()=> filterHandler()}>Filter</button>
        </div>
  )
}
