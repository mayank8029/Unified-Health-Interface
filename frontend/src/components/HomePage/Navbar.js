import React from 'react'
import "./Navbar.css"
import Button from '@mui/material/Button';
import { AppBar , Toolbar , Typography , Link } from '@mui/material';
import { Link as routerLink } from 'react-router-dom';


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
          href="#section2"
          sx={{ my: 1, mx: 1.5 }}
        >
          About
        </Link>
        <Link
          variant="button"
          color="text.primary"
          href="#section3"
          sx={{ my: 1, mx: 1.5 }}
        >
          Services
        </Link>
        <Link
        variant="button"
        color="text.primary"
        href="#section4"
        sx={{ my: 1, mx: 1.5 }}
      >
        Benefits
      </Link>
      </nav>
      <Button component={routerLink} to="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        Login
      </Button>
    </Toolbar>
  </AppBar>
  )
}

export default Navbar