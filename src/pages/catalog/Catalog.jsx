import React from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './catalog.css'
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react'
import axios from 'axios'
import { ListGroup } from 'react-bootstrap';
import { Container } from 'reactstrap';


const Catalog = () => {
    const[data,setData] = useState("");
    const [imgFile, setImgFile] = useState('');
    useEffect(()=>{
        document.title="Plans";
        getAllPlans();
    }, []);
    const getAllPlans=()=> {
        const base_url=`${process.env.REACT_APP_URL_ADMIN}`;
        axios.get(`${base_url}/category/list`).then(
            (response)=>{
                console.log(response.data);
                
                setData(response.data);
            },
            (error)=>{
                console.log(error);
                // toast.error("No Appointments Available")
            } 
        )
    }
  return (
    
    <div >
      {/* <h1 className="style1">Explore Now.....</h1> */}
      <Container>
      <div className='cd'>
      {data.length > 0 &&
            data.map((item) => {
             
              return (
                 <div >

    <Card className='cd2 text-center'
    style={{
       width: '15rem' ,
       display: 'flex'}}>
    <Link to={`/products/${item.id}`}>
      <Card.Img className = "pos" variant="top" src={item.imageUrl} />
      </Link>
      <Card.Body>
        <Card.Title>{item.categoryName}</Card.Title>
        <Card.Text>
         {item.description}
        </Card.Text>
      </Card.Body>
      
    </Card>
    </div>
              );
            })}
    </div>
    </Container>
    </div>
  );
}
  

export default Catalog