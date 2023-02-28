import React from 'react'
import Footer from '../../components/Footer/Footer'

import Promotions from '../../components/Promotions'
import Catalog from '../catalog/Catalog'

const Home = () => {
  return (
    <div>
       
        <Promotions/>
        <Catalog />
        <Footer/>
    </div>
  )
}

export default Home