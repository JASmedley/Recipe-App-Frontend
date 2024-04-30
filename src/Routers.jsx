import React, {useEffect,useState} from 'react'
import { Routes, Route, Navigate} from 'react-router'
import cookie from 'cookie'
import Login from './Components/Login'
import Listings from './Components/Listings'
import Listing from './Components/Listing'
import Register from './Components/Register'

function checkAuth() {
    const cookies = cookie.parse(document.cookie);
    return cookies["loggedIn"] ? true : false;
  }

  const ProtectedRoute = (props) => {
    console.log(props)
    const {component: Component, ...rest} = props;
    
    return (
      checkAuth() === true ? <Component {...rest}/> : <Navigate to="/login"/>
    )
   }
   const Router = ({state,setState}) => {
  const [recipeList,initializeRecipeList] = useState([])
    useEffect(()=> {
        fetch("https://recipe-app-eta-seven.vercel.app/recipes")
        
        .then((response) =>response.json())
    
        .then(data=>{
            console.log(data)
            initializeRecipeList(data)
        })
    },
    []) 
    return (
      <Routes>
        <Route path="/login" element={<Login state={state} setState={setState} />} />
        <Route path="/register" element={<Register state={state} setState={setState}/>}/>
        <Route path="/" element={<Listings recipeList={recipeList}/>} />
        <Route path="/:id" element={<Listing recipeList={recipeList}/>} />
      </Routes>
    );
  };
  

export default Router;