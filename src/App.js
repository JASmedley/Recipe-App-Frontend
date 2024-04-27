import React from 'react';
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './Routers'
import Navigation from './Components/Navigation'



function App() {
  return (
      <BrowserRouter>
      <Navigation/>
        <Router />
      </BrowserRouter>
  );
}

export default App;
