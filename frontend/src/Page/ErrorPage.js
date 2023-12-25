import { useRouteError } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={        { 
    height:"100vh"
}}>
<Navbar/>
    <div id="error-page" style={
        
        {display:"flex" , flexDirection:"column",
        justifyContent:"center",
        alignItems:"center", 
        height:"70vh"   
    }
    } >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
      <i>{error.statusText || error.message}</i>
      </p>
      </div>
      </div>
  );
}