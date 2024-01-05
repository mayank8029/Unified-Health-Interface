
import React from "react";
import HomePage from "./Pages/HomePage/HomePage.js";
import { Route , Routes } from "react-router-dom";
import SignUp from "./Pages/SignInUpPage/SignUp.js";
import Login from './Pages/SignInUpPage/Login.js'
function App() {
  return (
    <div className="App">
    <Routes>
   <Route path="/" element= {<HomePage/>}></Route>
   <Route path="signin" element ={<Login/>}></Route>
   <Route path = "/signup" element = {<SignUp/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
