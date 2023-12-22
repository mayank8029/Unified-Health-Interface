import React from 'react'
import image from  '../images/image1.webp'
import './HomePage.css'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Body from '../components/Body'
import Box from '../components/Box'

const HomePage = () => {
  return (
    <div>
    <Navbar/>
    <Hero/>
    <Body/>
    <br/>
    <Box/>
    </div>
  )
}

export default HomePage

