import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) ?? [],
  searchValue:"",
  filterPrices:[0,100000]
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
     addProduct: (state, action) => {

      let isIn = false;
      if (state.cart.length == 0) {
        state.cart.push(action.payload);
      } else {
        for (let a = 0; a < state.cart.length; a++) {
          if (state.cart[a].productName == action.payload.productName) {
            isIn = true;
            state.cart[a].count += 1;
            break;
          }
        }
        if(!isIn){
            state.cart.push(action.payload);

        }
      }
      localStorage.setItem("cart",JSON.stringify(state.cart))
      toast.success(`${action.payload.productName} Added to cart`, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    removeProduct: (state, action) =>{

      for(let a = 0; a<state.cart.length; a++){
        if(state.cart[a].productName == action.payload.productName){
          if(state.cart[a].count > 1){
            state.cart[a].count-=1;
          }else{
            state.cart.splice(a,1);
          }
        }
      }
      localStorage.setItem("cart",JSON.stringify(state.cart))

      toast.error(`${action.payload.productName} Removed from cart`, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    deleteProduct: (state, action) =>{
     
      for(let a = 0; a<state.cart.length; a++){
        if(state.cart[a].productName == action.payload.productName){
          state.cart.splice(a,1);
        }
      }
      
      localStorage.setItem("cart",JSON.stringify(state.cart))
      toast.warning(`${action.payload.productName} Deleted from cart`, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    editSearchValue: (state, action) =>{
        state.searchValue=action.payload;
    },
    filterPriceSetter: (state, action) =>{
     state.filterPrices = [];
     state.filterPrices.push(action.payload[0])
     state.filterPrices.push(action.payload[1])

  }
   
  },
});

export const { addProduct,removeProduct,deleteProduct,editSearchValue,filterPriceSetter } = cartSlice.actions;
export default cartSlice.reducer;

   