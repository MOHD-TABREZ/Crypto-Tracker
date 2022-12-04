import { AppBar,Container, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import React from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';


const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  }
}));


function Header() {
  const classes=useStyles()
  let history = useNavigate();

  const {currency,setCurrency}=CryptoState();

  function handleClick(e) {
    e.preventDefault();

    history('/');
  }


  const darkTheme=createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
          <Container>
              <Toolbar>
                  <Typography variant='h5' onClick={handleClick} className={classes.title}>Crypto Hunter</Typography>
                  <Select 
                     value={currency}
                     onChange={(e)=>setCurrency(e.target.value)}
                    color='primary' variant='outlined' style={{
                      width:100,
                      height:40,
                      marginRight:15,
                      color:'white',
                      borderColor:'white',
                      border:'1px solid white'
                  }}>
                      <MenuItem   value={'USD'}>USD</MenuItem>
                      <MenuItem  value={'INR'}>INR</MenuItem>
                  </Select>
              </Toolbar>
          </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header