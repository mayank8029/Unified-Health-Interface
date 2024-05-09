import React from 'react'
import './HomePage.css'
import Navbar from '../../components/HomePage/Navbar'
import Hero from '../../components/HomePage/Hero'
import Body from '../../components/HomePage/Body'
import Box from '../../components/HomePage/Box'

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

