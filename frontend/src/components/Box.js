import React from "react";
import image1 from "../images/hsp-icon1.png";
import { Typography } from "@mui/material";
import "./Box.css";
import uhibenifit1 from '../images/uhi-benifit1.png'
import uhibenifite4 from "../images/uhi-benifite4.png"
import benifit6 from "../images/benifit6.png"
import hspcon3 from "../images/hsp-con3.png"
import hspicon2 from "../images/hsp-icon2.png"
import { orange } from "@mui/material/colors";
const Box = (props) => {
  return (
    <div className="container-box" id = "section4">
           <div className="container-para">
               <Typography color="orange"
               variant="h3">Benefits of UHI</Typography>
            </div>

  

        <div className="container-content">
          <div className="container-content-one">

               <div className="container-content-one-para" >
               <Typography variant="h4"  color = "gray">Benefits for patient</Typography>
               </div>
          
               <div className="benefits-container">
               <img src={uhibenifit1}></img>
               <Typography variant="h6" className="paragraph">Improved access to healthcare</Typography>
               </div>


               <div className="benefits-container">
               <img src={uhibenifite4}></img>
               <Typography variant="h6" className="paragraph">Greater choice of applications</Typography>
               </div>


               <div className="benefits-container">
               <img src={benifit6}></img>
               <Typography variant="h6" className="paragraph">Transparency in pricing</Typography>
               </div>
        </div>
         <div className="container-content-one">

         <div className="container-content-one-para">
               <Typography variant="h4" color = "gray" >Benefits for HSP</Typography>
          </div>
    
               <div className="benefits-container">
               <img src={image1}></img>
               <Typography variant="h6" className="paragraph">Greater discoverability of Consumer</Typography>
               </div>


               <div className="benefits-container">
               <img src={hspicon2}></img>
               <Typography variant="h6" className="paragraph">Ability to decide their service price</Typography>
               </div>


               <div className="benefits-container">
               <img src={hspcon3}></img>
               <Typography variant="h6" className="paragraph">Platform to expand their physical offering</Typography>
               </div>
        </div>

        
      </div>
    </div>
  );
};

export default Box;
