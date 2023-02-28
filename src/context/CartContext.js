import React, { createContext, useState,useEffect } from 'react';
import axios from 'axios';
export const CartContext = createContext();

export const CartProvider = ({ children,initialCartCount }) => {
  const [cartCount, setCartCount] = useState(0);
  console.log(initialCartCount)
  useEffect(() => {
    // getAllProductsInCart();
    // console.log(value)
    setCartCount(initialCartCount)
  }, [])
  
  const addToCart = (product) => {
    console.log(product)
    let data={

        "product_id":product.id,
        "quantity":1,
        "name":product.name,
  
        "user_id":localStorage.getItem("userId"),
         "product_price":product.price
     }
   const login_base_url = `${process.env.REACT_APP_URL_USER}`;
   axios.post(`${login_base_url}/cart/add`,data,{
     headers: {
       'Authorization': `Bearer ${localStorage.getItem("token")}`
     }}).then(
     (response) => {
       console.log(response);
        getAllProductsInCart()
      
     }).catch((error) => console.log(error));
  };
  const cart_base_url = `${process.env.REACT_APP_URL_USER}`;
  const getAllProductsInCart=()=>{
    // console.log(allProducts)
    axios.get(`${cart_base_url}/cart/user/${localStorage.getItem("userId")}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }}).then(
      (response)=>{
        console.log(response.data);
       
        setCartCount(response.data.length);
      }).catch((error) => console.log(error));
   
  }

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};