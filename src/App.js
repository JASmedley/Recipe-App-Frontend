import React, { useEffect, useState}from 'react';
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './Routers'
import Navigation from './Components/Navigation'



function App() {
  const [state, setState] = useState({
    username: "",
    password: "",
    loggedIn: false
  });

  return (
      <BrowserRouter>
      <Navigation state={state} setState={setState}/>
        <Router state={state} setState={setState} />
      </BrowserRouter>
  );
}

export default App;
