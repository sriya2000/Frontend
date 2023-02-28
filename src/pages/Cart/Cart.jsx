import React, { useEffect, useState } from 'react'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import { MDBIcon} from 'mdbreact';
import axios from 'axios'
import { toast } from 'react-toastify'
import './cart.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import closeimg from '../../images/close.png'

function CheckInline({paymentMode,setPaymentMode}) {
  return (
    <Form >
     
        <div  className="mb-3">
          <Form.Check
            inline
            label="COD"
            name="group1"
            type={'radio'}
            id={'cod'}
            onClick={()=>{
              setPaymentMode("cod")
            }}
            checked= {paymentMode=="cod"}
          />
          <Form.Check
            inline
            label="Online"
            name="group1"
            type={'radio'}
            id={'online'}
            onClick={()=>{
              setPaymentMode("online")
            }}
            checked= {paymentMode=="online"}
          />
         
        </div>
      
    </Form>
  );
}



export default function ProductCards() {
  const navigate = useNavigate();
  
  const [cart,setCart]=useState([])
  const [paymentMode,setPaymentMode] = useState('online')
  const [address,setAddress]=useState("")
 
  
  const[totalAmt,setTotalAmt]=useState(0)

  function deleteProduct(product){
    const cart_base_url = `${process.env.REACT_APP_URL_USER}`;
   
    axios.post(`${cart_base_url}/cart/deletebyId/${product.id}`,{},{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }}).then(
      (response)=>{
        getAllProducts();
        
      }).catch((error) => console.log(error));
    
  }
  

  function toPay() {
    let OrderDetails={
      cart:cart,
      paymentMode:paymentMode,
      shippingAddress:address,
      totalAmt:totalAmt
      
    }

    
    localStorage.setItem("orderDetails",JSON.stringify(OrderDetails))
    if(paymentMode=="online"){
      navigate('/payment')
    }
    else{
      navigate('/orders')
    }
    
  }


  const updateQuantity=(item,type)=>{
    console.log(item)
    const quant={
      quantity:item.quantity

    }
    if(type=="plusbtn"){
      if(quant.quantity>0)quant.quantity= quant.quantity+1
    }else{
      if(quant.quantity>1)quant.quantity = quant.quantity-1;
    }
 

    const cart_base_url = `${process.env.REACT_APP_URL_USER}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    };
    axios.post(`${cart_base_url}/cart/update/${item.id}`,quant,{
      headers
    }
  
      ).then(
      (response)=>{
        let newCart= cart

        let arr= newCart.map((product)=>{
        
          if(product.id==item.id){
            product.quantity= quant.quantity
          }
          return product
    
        })
        setCart(getSubTotalAmt(arr));
        setTotalAmt(getTotalAmount(arr));
      }).catch((error) => console.log(error));
    
     
  }
  const getSubTotalAmt= (products)=>{
    const result=products.map((product)=>{
      product.subTotalAmt=product.product_price*product.quantity
      return product

    })
    
    return result

  }
  const getTotalAmount=(products)=>{
    let totalAmt=0;
    products.forEach((product)=>{
      totalAmt= totalAmt+(product.product_price*product.quantity)

    })
    return totalAmt
  }
  
  const getAllProductsInCart=(allProducts)=>{
    console.log(allProducts)
    const cart_base_url = `${process.env.REACT_APP_URL_USER}`;
    axios.get(`${cart_base_url}/cart/user/${localStorage.getItem("userId")}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }}).then(
      (response)=>{
        console.log(response.data);
        let cartProducts=response.data
        let newCartProducts = []
        cartProducts.forEach(product => {
          allProducts.forEach(pro=>{
            if(product.product_id==pro.id){
              newCartProducts.push({...product,name:pro.name})
              
            }

          })

        });
        console.log(newCartProducts)
        toast.success("cart has been loaded",{
          position:'bottom-center'
        })
       
        setCart(getSubTotalAmt(newCartProducts));
        
        setTotalAmt(getTotalAmount(newCartProducts))
      }).catch((error) => console.log(error));
    
    
  }
  const getAllProducts=()=>{
    const base_url=`${process.env.REACT_APP_URL_ADMIN}`;
    //const p= catalogId;
    axios.get(`${base_url}/product/`).then(
        (response)=>{
            
            // setAllProducts(response.data);
            getAllProductsInCart(response.data);
           

        }).catch((error) => console.log(error));
}
  
  useEffect(()=>{
    getAllProducts();

  },[]);


return (
    
    <section className="h-100 gradient-custom">
  <MDBContainer className="py-5 h-100">
    <MDBRow className="justify-content-center my-4">
      <MDBCol md="8">
        <MDBCard className="mb-4">
          <MDBCardHeader className="py-3">
            <MDBTypography tag="h5" className="mb-0">
              Cart 
            </MDBTypography>
          </MDBCardHeader>
          
          {
            cart.length>0 && cart.map((item)=>(
              <div >
              <div className='d-flex justify-content-end' onClick={()=>{
                deleteProduct(item)
              }}>
                <img src={closeimg}/>

          </div>
              <MDBCardBody>
            <MDBRow>
              <MDBCol lg="7" md="7" className=" mb-4 mb-lg-0">
                <p>
                  <strong>{item.name}</strong>
                </p>
                
                <p>
                  <strong>Product Price:    </strong>
                  <strong>{item.product_price}</strong>
                </p>

                <p>
                  <strong>Subtotal:    </strong>
                  <strong>{item.subTotalAmt}</strong>
                </p>
                
                



              </MDBCol>
              <MDBCol lg="4" md="4" className="mb-4 mb-lg-0">
                <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                  {/* <MDBBtn className="px-3 me-2">
                    <MDBIcon fas icon="minus" />
                  </MDBBtn> */}
                  <Button style= {{fontSize:"24px", padding:"1px 19px"}} onClick={()=>updateQuantity(item,"minbtn")} >
                    -
                  </Button>

                  <MDBInput value={item.quantity} min={0} type="number" disabled  />
                  
                  <Button onClick={()=>updateQuantity(item,"plusbtn")} style= {{fontSize:"24px;", padding:"1px 19px"}}>
                    +
                  </Button>
                </div>
                

               
              </MDBCol>
              <MDBCol lg="1" md="1" className="mb-4 mb-lg-0">
                
              </MDBCol>
            </MDBRow>

            <hr className="my-4" />
          </MDBCardBody>
          </div>

            ))
          }
         
        </MDBCard>
        <MDBCard className="mb-4">
          <MDBCardBody>
            <label>
            <p>
              <strong>Add Shipping Address</strong>
            </p>
                <textarea name="postContent" rows={2} cols={70} onChange={(e)=>setAddress(e.target.value)} />
    </label>
           
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mb-4 mb-lg-0">
          <MDBCardBody>
            <p>
              <strong>We accept</strong>
            </p>
            <MDBCardImage className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
              alt="Visa" />
            <MDBCardImage className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
              alt="American Express" />
            <MDBCardImage className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
              alt="Mastercard" />
            <MDBCardImage className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
              alt="PayPal acceptance mark" />
              <br/>
              <p> <strong>Select payment mode</strong></p>
              <CheckInline setPaymentMode={setPaymentMode} paymentMode={paymentMode} />
              
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md="4">
        <MDBCard className="mb-4">
          <MDBCardHeader>
            <MDBTypography tag="h5" className="mb-0">
              Summary
            </MDBTypography>
          </MDBCardHeader>
          <MDBCardBody>
            <MDBListGroup flush>
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Products
                <span>{totalAmt}</span>
              </MDBListGroupItem>
              <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                Shipping
                <span>Free</span>
              </MDBListGroupItem>
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                  <strong>
                    <p className="mb-0">(including VAT)</p>
                  </strong>
                </div>
                <span>
                  <strong>{totalAmt}</strong>
                </span>
              </MDBListGroupItem>
            </MDBListGroup>

            <Button block size="lg" onClick={toPay}>
              Go to checkout
            </Button>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</section>
    
)}
