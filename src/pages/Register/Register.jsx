import React from 'react'
import {Card,CardHeader,Button,Col, Row,Form,CardBody,FormGroup,Container,Label,Input} from 'reactstrap'

import { useState } from 'react'
import axios from 'axios'
import{ toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    
  }
  from 'mdb-react-ui-kit';


const Register = () => {
    const [user,setUser]= useState({});
    const handleForm=(e)=>   {
        console.log(user);
        saveLogin(user)
        e.preventDefault();
    }
    const patient_base_url =`${process.env.REACT_APP_URL_USER}`;
    const saveLogin=(data)=> {
        axios.post(`${patient_base_url}/auth/signin/user`,data).then(
            (response)=>{
                console.log(response);
               toast.success("Registered");
            },
            (error)=>{
                console.log(error);
                toast.error("Not Registered")
            } 
        )
    }
return (
<div>
    
    <ToastContainer></ToastContainer>
<Container>

  <MDBContainer fluid>

<MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
  <MDBCardBody>
  <Form  onSubmit={handleForm}>
    <MDBRow>
      <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

        <MDBInput 
        wrapperClass='mb-4' 
        label='First Name' 
        size='lg' 
        id='form1' 
        type='text' 
        onChange={(e)=>{
                        setUser({...user,firstName:e.target.value})
                    }}    
        />
        <MDBInput 
        wrapperClass='mb-4' 
        label='Last Name' 
        size='lg' 
        id='form1' 
        type='text' 
        onChange={(e)=>{
                        setUser({...user,lastName:e.target.value})
                    }}    
        />

        <MDBInput 
        wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email'
        onChange={(e)=>{
                        setUser({...user,email:e.target.value})
                    }
                }
        />

        <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'
              onChange={(e)=>{
                        setUser({...user,password:e.target.value})
                    }
                }
        />
        <MDBInput wrapperClass='mb-4' label='Phone Number' size='lg' id='form3' type='text'
              onChange={(e)=>{
                        setUser({...user,phoneNumber:e.target.value})
                    }
                }
        />
         <MDBInput wrapperClass='mb-4' label='Address' size='lg' id='form3' type='text'
              onChange={(e)=>{
                        setUser({...user,address:e.target.value})
                    }
                }
        />

        {/* <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form5' type='password'/> */}

        <Button className='mb-4' size='lg'>Register</Button>

      </MDBCol>

      <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
      </MDBCol>

    </MDBRow>
    </Form>
  </MDBCardBody>
</MDBCard>

</MDBContainer>
</Container>
</div>
)
}

export default Register