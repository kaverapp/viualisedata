import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Auth0Provider} from "@auth0/auth0-react";
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Auth0Provider
      domain="dev-4vgt64gsxrlddiun.us.auth0.com"
      clientId='qX4jOPGFI4z1swfjqu1CIkh7VGiFBaiY'
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      >
          
         <App />
      </Auth0Provider> 
   
  </StrictMode>,
)
