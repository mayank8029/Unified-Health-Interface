import React from "react";
import Blood from "../images/Blood.png";
import Ambulance from "../images/Ambulance.png"
import Hospital from "../images/Hospital.png";
import Laboratory from "../images/Laboratory.png"
import Medical from "../images/Medical.png";


import "./Services.css";

const Services = () => {
  return (
    <div className="main-container" id = "section3">
        <div className="sub-container">
             <div className="box">
             <img src={Blood}/>
             <p><b>Donate Blood</b></p>
             <p>Find Blood Bank Near YOu</p>
             </div>

             <div className="box">
             <img src={Hospital}/>
             <p><b>Donate Blood</b></p>
             <p>Find Blood Bank Near YOu</p>
             </div>

             <div className="box">
             <img src={Laboratory}/>
             <p><b>Donate Blood</b></p>
             <p>Find Blood Bank Near YOu</p>
             </div>
        </div>



        <div className="sub-container">
        <div className="box">
        <img src={Ambulance}/>
        <p><b>Donate Blood</b></p>
        <p>Find Blood Bank Near YOu</p>
        </div>

        <div className="box">
        <img src={Medical}/>
        <p><b>Donate Blood</b></p>
        <p>Find Blood Bank Near YOu</p>
        </div>

        <div className="box">
        <img src={Blood}/>
        <p><b>Donate Blood</b></p>
        <p>Find Blood Bank Near YOu</p>
        </div>
   </div>

    </div>
    );
};

export default Services;
