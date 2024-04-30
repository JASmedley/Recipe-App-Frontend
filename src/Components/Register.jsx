import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import cookie from "cookie";
import Box from '@mui/material/Box';



const Register = ({setState,state}) => {
  const navigate = useNavigate();

  const [error,setError] = useState('')

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const register = (e) => {
    console.log("Register button clicked");
    e.preventDefault();
    fetch('https://recipe-app-eta-seven.vercel.app/register',{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: state.username,
        password: state.password,
        name: state.name
      })
    })
      .then((response) =>{ 
        console.log(response,'this is the response')
        // if (!response.ok) {
        //    throw new Error('Username or Password not found.')
        // }
        return response.json()
      })

      .then(data=>{
          console.log(data)
          document.cookie = cookie.serialize("token", data, { maxAge: 1000 * 60 });
          setState((prevState) => ({
            ...prevState,
            loggedIn: true,
          }));
          navigate('/')
      })
      .catch((error)=> {
        console.log(error)
        setError(error.message)
      })
    
  };

  

  return (
      <Box
        component="form" onSubmit={register}
        sx={{
          '& > :not(style)': { 
            m: "0 auto", 
            marginTop: 4,
            width: '25ch', 
            display: "flex", 
            justifyContent: "center" }    
        }}
        noValidate
        autoComplete="off"
      >
        <TextField required name="username" label="Email" type="text" variant="standard" onChange={handleTextChange} value={state.username} />
        <TextField required name="password" label="Password" type="password" variant="standard" onChange={handleTextChange} value={state.password} />
        <TextField required name="name" label="First Name" type="text" variant="standard" onChange={handleTextChange} value={state.name} />
        <Button type="submit" variant="contained" color="primary">Register Now</Button>
        <div className="errorMessage">{error}</div>

      </Box>
  );
};

export default Register;
