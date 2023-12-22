import React from 'react'
import { Typography } from '@mui/material'
import HeroImage from '../images/HeroImage.png'
import './Hero.css'

import { orange } from '@mui/material/colors'
const Hero = () => {
  return (
    <div className='container' id = 'section1'>
    <div className='para'>
    <div className='heading'>
    <Typography className='Typography' variant="h3" color='orange'>Signup for utilizing UHI</Typography>
    </div>
    <div className='paragraph'>
    <Typography>
    India's healthcare system has grappled with numerous challenges, such as the lack of easily accessible medical records, delayed emergency care, and the proliferation of unregistered practitioners. The Ayushman Bharat Digital Mission aims to revolutionize healthcare by introducing the Unified Health Interface (UHi), a comprehensive solution to streamline health records and improve patient outcomes.
    
    </Typography>
    </div>
    
    </div>

    <div className='Image'>
    
    <img src={HeroImage} />
    
    </div>
    </div>
  )
}

export default Hero