import React from "react";
import Bodyimage1 from "../../images/Image.png";

import { Box, Typography } from "@mui/material";
import "./Body.css";
import Services from "./Services";


const Body = () => {
  return (

    <div className="Body" id ="section2">
    
    <div className="container">
    <div className="Image">
    <img src={Bodyimage1} />
    </div>
    
    <div className="para">
    <div className="heading">
    <Typography className="Typography" variant="h3" color="orange">
            What is UHI
          </Typography>
        </div>
        <div className="paragraph">
        <Typography>
            The Unified Health Interface (UHI) is a network of open protocols
            that enable the interoperability in health services. UHI is one of
            the foundational layers in the Ayushman Bharat Digital Mission
            (ABDM) Stack that focuses on the discoverability and delivery of
            health services. While the current ABDM building blocks enable the
            interoperable exchange of personal health data and provide
            registries for doctors, patients and health facilities, UHI
            leverages these building blocks to provide a seamless end-to-end
            experience for the users. Through UHI enabled applications, patients
            can discover, book, conduct and pay for services offered by a
            variety of participating providers from any application of their
            choice.
            </Typography>
            </div>
            </div>
            </div>


            <div className="services">
            <div className="services-heading">
            <Typography fontSize="4rem" color="orange" >
            UHI services
            </Typography>
            </div>

            <div className="services-boxes">
            <Services/>
            </div>



            </div>



    </div>
  );
};

export default Body;
