import React,{useContext} from 'react'
import {Form,FormGroup,Label,Input,Button,Row,Col,CardHeader} from 'reactstrap'
import { Container } from 'reactstrap'
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CartContext } from '../../App';
import './login.css'

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';



const Login = () => {
  const{getAllProductsInCart}=useContext(CartContext)
  const navigate = useNavigate();
  function toRegister() {
    navigate('/register')
  }
 

  const [user, setUser] = useState({});
  //creating handler function
  const handleForm = (e) => {
    e.preventDefault();
    console.log(user);
    saveLogin(user);
   
  };

  //creating function to post data on server
  const login_base_url = `${process.env.REACT_APP_URL_USER}`;
  const saveLogin = (data) => {
    axios.post(`${login_base_url}/auth/login`, data).then(
      (response) => {
        console.log(response);
        toast.success("Logged in");
        const {accessToken} = response.data;
               localStorage.setItem("token",accessToken)
                var decoded = jwt_decode(accessToken);
        const uid = decoded.sub.split(",")[0];
        localStorage.setItem("userId",uid);
        console.log(uid)
        getAllProductsInCart();
        navigate("/profile",{state:"userLoggedIn"});
       
      }
    ) .catch((error) =>toast.error("Register First"));
  }
  

  return (

  
  <Container>
  <ToastContainer></ToastContainer>
  <MDBContainer fluid className="p-3 my-5 h-custom">
      
      <Form onSubmit={handleForm}>
      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>
        
          <MDBInput 
          wrapperClass='mb-4' 
          label='Email address' id='formControlLg' 
          type='email' 
          required
          size="lg" 
          onChange={(e) => {
                       setUser({ ...user,email: e.target.value});
                       }}
          />
          
          <MDBInput 
          wrapperClass='mb-4' 
          label='Password' 
          id='formControlLg' 
          type='password'
          required 
          size="lg"
          onChange={(e) => {
                         setUser({ ...user,password: e.target.value });
                      }}
          />
           
          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>
          <div className='text-center text-md-start mt-4 pt-2'>
            <Button className="mb-0 px-5" size='lg' type="submit">Login</Button>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to='/register' className="link-danger" >Register</Link></p>
          </div>
        </MDBCol>
      </MDBRow>
      </Form>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>

        <div>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='twitter' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='google' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='linkedin-in' size="md"/>
          </MDBBtn>

        </div>

      </div>

    </MDBContainer>
    </Container>
  )
}

export default Login