
import React from "react";
import Navbar from "./components/HomePage/Navbar.js"
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import HomePage from "./Page/HomePage.js";
import Login from "./Page/Login.js";
function App() {
  return (
    <div className="App">
   <HomePage/>
    </div>
  );
}

export default App;
