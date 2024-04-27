import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import cookie from "cookie";
import Box from '@mui/material/Box';



const Login = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const login = (e) => {
    console.log("Login button clicked");
    e.preventDefault();
    props.login(state.username)
    document.cookie = cookie.serialize("loggedIn", "true", { maxAge: 1000 * 60 });
    navigate('/');

  };

  return (
      <Box
        component="form" onSubmit={login}
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
        <TextField required name="username" label="Username" type="text" variant="standard" onChange={handleTextChange} value={state.username} />
        <TextField required name="password" label="Password" type="password" variant="standard" onChange={handleTextChange} value={state.password} />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </Box>
  );
};

export default Login;
