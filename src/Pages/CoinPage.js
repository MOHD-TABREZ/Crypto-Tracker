import React,{useEffect, useState} from 'react'
import {  useParams } from "react-router-dom";
import { CryptoState } from '../CryptoContext'
import {SingleCoin} from '../config/api'
import axios from 'axios';
import CoinInfo from '../components/CoinInfo';
import { makeStyles } from '@mui/styles';
import { LinearProgress, Typography } from '@mui/material';
import { numberWithCommas } from '../components/CoinsTable';
import ReactHtmlParser from "react-html-parser";





function CoinPage() {
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
    },
    sidebar:{
        width:'30%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        marginTop:25,
        lineHeight:'10vh',
        borderRight:"2px solid grey",
    },
    heading:{
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData:{
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",

    },
    "@media (max-width: 900px)": {
      container:{
        display:'flex',
        flexDirection: "column",
        alignItems: "center",
      },
      sidebar:{
        width:"100%",
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        marginTop:25,
        alignItems:'center'
      },
      marketData:{
        display: "flex",
        flexDirection:'column',
        alignItems:'center',
        justifyContent: "space-around",
      }

  }
    
  }));



  const classes=useStyles()

  let {id}=useParams();
  const [coin,setCoin]=useState();
  const {currency,symbol}=CryptoState();

  const fetchCoin=async()=>{
    const {data}=await axios.get(SingleCoin(id))
    setCoin(data);
  }

  useEffect(()=>{
    fetchCoin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  console.log(coin)

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;


  return (
        <div  className={classes.container}>
          <div className={classes.sidebar}>
              <img
                src={coin?.image.large}
                alt={coin?.name}
                height="200"
                style={{marginBottom:20}}
              />
              <Typography variant="h3" className={classes.heading}>
                {coin?.name}
              </Typography>
              <Typography variant="subtitle1" className={classes.description}>
                {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
              </Typography>
              <div className={classes.marketData}>
                <span style={{display:'flex'}}>
                    <Typography variant="h5" style={{fontFamily:'Montserrat'}} className={classes.heading}>
                      Rank:
                    </Typography>
                    &nbsp;&nbsp;
                    <Typography variant='h5' style={{fontFamily:'Montserrat'}}>
                      {coin?.market_cap_rank}
                    </Typography>
                </span>
                <span style={{display:'flex'}}>
                    <Typography variant="h5" style={{fontFamily:'Montserrat'}} className={classes.heading}>
                      Current Price:
                    </Typography>
                    &nbsp;&nbsp;
                    <Typography variant='h5' style={{fontFamily:'Montserrat'}}>
                      {symbol}{" "}
                      {numberWithCommas(
                        coin?.market_data.current_price[currency.toLowerCase()]
                      )}
                    </Typography>
                </span>
                <span style={{ display: "flex" }}>
                  <Typography variant="h5" className={classes.heading}>
                    Market Cap:
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography
                      variant="h5"
                      style={{
                        fontFamily: "Montserrat",
                      }}
                  >
                      {symbol}{" "}
                      {numberWithCommas(
                        coin?.market_data.market_cap[currency.toLowerCase()]
                          .toString()
                          .slice(0, -6)
                      )}
                      M
                  </Typography>
                </span>
              </div>
          </div>
          <div>
            {/* chart */}
            <CoinInfo coin={coin}/>
          </div>
        </div>
    
  )
}

export default CoinPage