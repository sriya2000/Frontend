import React,{useContext} from 'react'
import { CartContext } from '../App'
import './navbar.css'
import {BsFillCartFill} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import {FaHome} from 'react-icons/fa'
import { NavLink,Button } from 'react-bootstrap'
import imga1 from '../images/Savannaa.png'
import { Link } from "react-router-dom";


const Navbar = () => {
  const userId= localStorage.getItem("userId")
  // console.log(userId)
  const{cartCount}=useContext(CartContext)
  // const [showDropdown, setShowDropdown] = useState(false);
  console.log(cartCount)


  return (
    <nav class="navbar navbar-expand-lg navbar-light " >
  <div class="container-fluid">
  
    <Link to="/" className="navbar-brand-1"  ><img src={imga1} style={{width:"12rem"}}/></Link>
  
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" style={{marginLeft:"3rem"}}>
          <Link to="/"><FaHome size={40} style={{color:"black"}} ></FaHome></Link>
        </li>
        
        
            <li >
            {userId ?(
                <Link className='navlink-1' style={{color:'black',marginLeft:"3rem", margin:"5rem"}} onClick={()=> {
                  localStorage.clear()
                   window.location.reload()
                }
                
                }         
                >LogOut</Link>
              ):(
                <div >
                
                <Link to="/login" className='navlink-1' style={{color:'black'}}  >Login </Link>
                <Link to="/register" className='navlink-2' style={{color:'black'}} >Register</Link>
                </div>
              )}
              </li>
          
        <div>
        
        <li class="nav-item-1" style={{marginLeft:"35rem"}}>
        
        <Link to="/cart" className="logoso"  ><BsFillCartFill size={30} style={{color:'black'}} /></Link>
        </li></div>
        <div>
          {
            cartCount
          }
        </div>
        <div>
        <li class="nav-item" style={{marginLeft:"3rem"}}>
        
        <Link to="/profile" className="logos"><CgProfile size={30} style={{color:'black', display:'flex'}}/></Link>
        </li></div>
        
      </ul>
    </div>
  </div>
</nav>
    
  )
}

export default Navbar