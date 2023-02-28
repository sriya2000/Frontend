import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBProgress,
    MDBProgressBar,
    MDBRow,
    MDBTypography,
  } from "mdb-react-ui-kit";
 


function OrderDetails() {
    const[orderDetails,setOrderDetails]=useState({})
    const [userDetails,setUserDetails]=useState({})
    useEffect(() => {
    const userId=localStorage.getItem("userId")  
    console.log(userId)
      fetchUserDetails(userId)
      
    }, [])

    const fetchUserDetails=(userId)=>{
               
    axios.get(`${process.env.REACT_APP_URL_USER}/users/${userId}`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
})
                .then(res=>{
                    console.log(res);
                    setUserDetails(res.data)
                })
                .catch(err=>console.log(err))
            }
    

    useEffect(()=>{
        
        if(localStorage.getItem("orderDetails")){
            setOrderDetails(JSON.parse(localStorage.getItem("orderDetails")))
        }
    
      },[]);
  return (
    <div>
        <>
      <section
        className="h-100 gradient-custom"
        style={{ backgroundColor: "#eee" }}
      >
        <MDBContainer className="py-5 h-100">
        {
            Object.keys(orderDetails).length ? (
                
                <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="10" xl="8">
              <MDBCard style={{ borderRadius: "10px" }}>
                <MDBCardHeader className="px-4 py-5">
                  <MDBTypography tag="h5" className="text-muted mb-0">
                    Thanks for your Order,{" "}
                    <span style={{ color: "#a8729a" }}>{userDetails.firstName}</span>!
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p
                      className="lead fw-normal mb-0"
                      style={{ color: "#a8729a" }}
                    >
                      Receipt
                    </p>
                    <p className="small text-muted mb-0">
                      Order Id : 1KAU9-84UIL
                    </p>
                  </div>

                  <MDBCard className="shadow-0 border mb-4">
                    <MDBCardBody>
                      {
                        orderDetails.cart.map((items)=>(
                            <div>
                            <MDBRow>
                        
                        <MDBCol
                          md="8"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0">{items.name}</p>
                        </MDBCol>
                        
                        
                        <MDBCol
                          md="2"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">{items.quantity}</p>
                        </MDBCol>
                        <MDBCol
                          md="2"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">{items.subTotalAmt}</p>
                        </MDBCol>
                      </MDBRow>
                      <hr
                        className="mb-4"
                        style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                      />
                      </div>

                        ))
                      }
                      
                     
                    </MDBCardBody>
                  </MDBCard>
                  <div className="d-flex flex-column pt-2">
                    <p className="fw-bold mb-0">Shipping</p>
                    
                    <p className="text-muted mb-0">
                      
                      <span className="fw-bold me-4">{orderDetails.shippingAddress}</span>
                    </p>
                  </div>

                  

                  <div className="d-flex justify-content-between pt-2">
                    <p className="fw-bold mb-0">Order Details</p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Total</span> {orderDetails.totalAmt}
                    </p>
                  </div>

                  
                  <div className="d-flex justify-content-between">
                    <p className="text-muted mb-0">
                      Invoice Date : 22 Dec,2019
                    </p>
                   
                  </div>

                  <div className="d-flex justify-content-between mb-5">
                    <p className="text-muted mb-0">
                     
                    </p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Delivery Charges</span>{" "}
                      Free
                    </p>
                  </div>
                </MDBCardBody>
                <MDBCardFooter
                  className="border-0 px-4 py-5"
                  style={{
                    backgroundColor: "#a8729a",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <MDBTypography
                    tag="h5"
                    className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
                  >
                    Total paid: <span className="h2 mb-0 ms-2">{orderDetails.totalAmt}</span>
                  </MDBTypography>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>

            ):(
                <div>
                    No Products Avaliable
                </div>
            )
        }
          
        </MDBContainer>
      </section>
    </>

    </div>
  )
}

export default OrderDetails