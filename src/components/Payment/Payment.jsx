import React from 'react'
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
  } from "mdb-react-ui-kit";
  import { useState } from 'react';

import './payment.css'  
import { Button } from 'react-bootstrap';

const Payment = () => {

  const [paymentDetailsFilled, setPaymentDetailsFilled] = useState(false);

  const navigate = useNavigate();

  const handlePayment = () => {
    if (paymentDetailsFilled) {
      navigate("/orders")
    } else {
      alert("Please fill in all the payment details.");
    }
  };


  return (
    <div>
      <MDBContainer fluid className="py-5 gradient-custom">
      <MDBRow className="d-flex justify-content-center py-5">
        <MDBCol md="7" lg="5" xl="4">
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBCardBody className="p-4">
              <MDBRow className="d-flex align-items-center">
                <MDBCol size="9">
                <MDBInput type="text" onChange={(e) => setPaymentDetailsFilled(e.target.value !== "")}
                    label="Card Number"
                    id="form1"
                    placeholder="1234 5678 9012 3457"
                  />
                </MDBCol>
                <MDBCol size="3">
                  <img
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    alt="visa"
                    width="64px"
                  />
                </MDBCol>

                <MDBCol size="9">
                  <MDBInput
                   onChange={(e) => setPaymentDetailsFilled(e.target.value !== "")}
                    label="Cardholder's Name"
                    id="form2"
                    type="text"
                    placeholder="Cardholder's Name"
                  />
                </MDBCol>

                <MDBCol size="6">
                  <MDBInput
                    onChange={(e) => setPaymentDetailsFilled(e.target.value !== "")}
                    label="Expiration"
                    id="form2"
                    type="text"
                    placeholder="MM/YYYY"
                  />
                </MDBCol>
                <MDBCol size="3">
                  <MDBInput
                    onChange={(e) => setPaymentDetailsFilled(e.target.value !== "")}
                    label="CVV"
                    id="form2"
                    type="password"
                    placeholder="&#9679;&#9679;&#9679;"
                  />
                </MDBCol>
                <MDBCol size="3">
                
                  <Button color="info" rounded size="lg" onClick={handlePayment} >
                    <MDBIcon fas icon="arrow-right" />
                  </Button>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
         </MDBContainer>
       
   
    
    </div>
  )
}

export default Payment