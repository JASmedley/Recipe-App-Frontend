import React , {useEffect} from 'react'
import { AppBar, Toolbar, IconButton, 
  Typography
} from '@mui/material'
import { Link } from 'react-router-dom'
import { createTheme, ThemeProvider, styled, alpha } from '@mui/material/styles';
import AddListing from '../Components/AddListing';
import cookie from "cookie";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Login from './Login'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



const checkAuth = () => {
  const cookies = cookie.parse(document.cookie)
  return cookies["token"] ? true : false
}

const handleClearCookiesClick = () => {
  document.cookie.split(";").forEach((cookie) => {
    const [name] = cookie.trim().split("=")
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  })
  window.location.reload(false)
}

const theme = createTheme({
    palette: {
      green: {
        main: '#3BB371',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      },
    },
  });

const Navigation = ({setState,state}) => {
  useEffect(()=> {

    console.log('nav component render', state.loggedIn)

  }, [state.loggedIn])
    return (
        <ThemeProvider theme={theme}>

        <AppBar color="green" position="relative"  > 
            <Toolbar disableGutters>
                <IconButton color="inherit">
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: "1" }} color="white" className="header">
                   Recipes for Me
                </Typography>
        
             <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
                <ul className="nav-list">
                    <li className="nav-list-item">
                     <Typography color="white">   <Link  to="/">
                      Listings 
                      </Link>
                      </Typography>
                    </li>
                    <li className="nav-list-item">
                     <Typography color="white">    {checkAuth() ? (<AddListing/>): <></>} </Typography>
                    </li>
                    <li className="nav-list-item">
                        <Typography color="white"> {checkAuth() ? (
            <Link onClick={handleClearCookiesClick} color="inherit" to="/">
              Logout
            </Link>
          ) : (
            <Link color="inherit" to="/login">
              Login
            </Link>
          )}
          </Typography>
                    </li>
                  
        
                </ul>
            </Toolbar>
        </AppBar>
        </ThemeProvider>

    )
}

export default Navigation
