import React from 'react'
import { makeStyles } from '@mui/styles';
import { Container} from '@mui/system';
import { Typography } from '@mui/material';
import Carousel from './Carousel';


const useStyles=makeStyles(()=>({
  banner: {
      backgroundImage: "url(./banner2.jpg)",
  },
  bannerContent:{
    height:'400px',
    display:'flex',
    flexDirection:'column',
    paddingTop:'25',
    justifyContent:'space-around'
  },
  tagline:{
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  }
}))

function Banner() {
  const classes=useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                  variant='h2'
                  style={{fontWeight:"bold",
                  marginBottom:15,
                  fontFamily:'Montserrat'
                }}
                >
                  Crypto Hunter
                </Typography>
                <Typography
                  variant="subtitle2"
                  style={{
                    color: "darkgrey",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat",
                  }}
                >
                  Get all the Info regarding your favorite Crypto Currency
                </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner