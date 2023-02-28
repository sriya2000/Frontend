import React from 'react'
import { useState,useEffect,useContext} from 'react'
import { CartContext } from '../../App'
import axios from 'axios'
import { useParams } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

import './mobile.css'





const Mobile = () => {
  const [cartValue,setCartValue]=useState(0);
  const[products,setProducts]= useState([]);
  const[search,setSearch]=useState('')
  let {id }= useParams();
  const{addToCart}=useContext(CartContext)

 
 
  useEffect(()=>{
      document.title="Products";
      getProductByCatalogId();
      // getAllProductsInCart();
  }, []);
  const getProductByCatalogId=()=> {
    console.log(id);
    const base_url=`${process.env.REACT_APP_URL_ADMIN}`;
    //const p= catalogId;
    axios.get(`${base_url}/product/name/${id}`).then(
        (response)=>{
            console.log(response.data.quantity);
            setProducts(response.data);
           

        }).catch((error) => console.log(error));
}


  return (
    // <div>
    //  <Navbar cartValue={cartValue}/>
    <div>
      <form class="d-flex" className='searchi'>
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=> setSearch(e.target.value)}/> 
      </form> 
    
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-0">
        <MDBCol md="12" xl="10">
          <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
            <MDBCardBody>
            
      {products.length>0 && products.filter((item)=>{

        return search.toLowerCase()==''? item : item.name.toLowerCase().includes(search);
      }
      ).map((product) => (
        <MDBRow>
                <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom hover-overlay"
                  >
                    <MDBCardImage
                     
                      src={product.imageUrl}
                      style={{height:"15rem",marginTop:"3rem"}}
                      fluid
                      className="w-100"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </a>
                  </MDBRipple>
                </MDBCol>
                
                <MDBCol md="6" style={{marginTop:"5rem"}}>
                  <h5>{product.name}</h5>
                  
                  <div className="mt-1 mb-0 text-muted small">
                    <span>{product.description}</span>

                   
                  </div>
                 
                 
                </MDBCol>
                <MDBCol
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                >
                  <div className="d-flex flex-row align-items-center mb-1" style={{marginTop:"5rem"}}>
                    <h4 className="mb-1 me-1">Rs.{product.price}</h4>
                    
                  </div>
                  <h6 className="text-success">Free shipping</h6>
                  <div className="d-flex flex-column mt-4">
                  
                    <Button outline color="primary" size="sm" className="mt-2" onClick={()=>addToCart(product)}>
                      Add to cart
                    </Button>
                  </div>
                </MDBCol>
              </MDBRow>
       
      ))}
      
             
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      
    </MDBContainer>
    <br/>
    </div>
    // </div>
  )
}

export default Mobile