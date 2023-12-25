import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import ErrorPage from './Page/ErrorPage';
import Login from './Page/Login';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/Login",
    element:<Login/>,
    errorElement:<ErrorPage/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>
);


