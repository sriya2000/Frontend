import React,{createContext} from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home' 
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Mobile from './pages/Search/Mobile'
import Cart from './pages/Cart/Cart'
import Profile from './pages/Profile/Profile'
import Footer from './components/Footer/Footer'
import Payment from './components/Payment/Payment'
import OrderDetails from './pages/OrderDetails'
// import { CartProvider } from './context/CartContext'
export const CartContext = createContext();




const App = () => {
 
  const [cartCount, setCartCount] = useState(0);
  const[user,setUser]=useState("");

  useEffect(() => {
    getAllProductsInCart(); 
  }, [])
 

  const addToCart = (product) => {
    console.log(product)
    let data={

        "product_id":product.id,
        "quantity":1,
        "name":product.name,
  
        "uid":localStorage.getItem("userId"),
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
    <BrowserRouter>
    {/* <CartProvider initialCartCount={initialCartCount}> */}
    <CartContext.Provider value={{ cartCount, addToCart, getAllProductsInCart }}>
    <Navbar/>
    <Routes>
    <Route  index  element={<Home />}/>
    <Route path="products/:id" element={<Mobile/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="register" element={<Register/>}/>
    <Route path="cart" element={<Cart/>}/>
    <Route path="profile" element={<Profile/>}/>
    <Route path="footer" element={<Footer/>}/>
    <Route path="payment" element={<Payment/>}/>
    <Route path="orders" element={<OrderDetails/>}/>
    
     </Routes>
     </CartContext.Provider>
     {/* </CartProvider> */}
    </BrowserRouter>
    
  )
}

export default App