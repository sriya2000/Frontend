import React from 'react'
import { Carousel } from 'react-bootstrap'
import image1 from '../images/p11.png'
import image2 from '../images/p12.png'
import image3 from '../images/p13.png'
import './promotion.css'

const Promotions = () => {
  return (
    <div className='sl1'>
      <div className='slider'>
    <Carousel fade={true} pause={false}>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100 img"
        src={image1}
        alt="First slide"
        height="350"
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src={image2}
        alt="Third slide"
        height="350"
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src={image3}
        alt="Third slide"
        height="350"
      />
    </Carousel.Item>
    </Carousel>
    </div>
    </div>
  )
}

export default Promotions