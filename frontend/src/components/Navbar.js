import React from 'react'
import "./Navbar.css"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { AppBar , Toolbar , Typography , Link } from '@mui/material';



const Navbar = () => {
  return (
    <AppBar
    position="static"
    color="default"
    elevation={0}
    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
  >
    <Toolbar sx={{ flexWrap: 'wrap' }}>
      <Typography variant="h4" color="Black"
      fontSize="45px" fontWeight="600" noWrap sx={{ flexGrow: 1 }}>
      UHI
      </Typography>
      <nav>
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          Features
        </Link>
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          Enterprise
        </Link>
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          Support
        </Link>
      </nav>
      <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        Login
      </Button>
    </Toolbar>
  </AppBar>
  )
}

export default Navbar