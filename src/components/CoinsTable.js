import { Container, createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import axios from 'axios';
import React,{useEffect, useState} from 'react'
import {CoinList} from '../config/api' 
import { CryptoState } from '../CryptoContext'
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles((theme) => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  ul: {
    "& .MuiPaginationItem-root": {
      color: "gold"
    }
  }
}));
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function CoinsTable() {
  const classes=useStyles()

  let history = useNavigate();
  const [coins,setCoins]=useState([]);
  const [loading,setLoading]=useState(false);
  const {currency,symbol}=CryptoState();

  const [search,setSearch]=useState('');

  const [page,setPage]=useState(1);

 

  const fetchCoins=async()=>{
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);
    console.log(data);

    setCoins(data);
    setLoading(false);
  }

  useEffect(()=>{
    fetchCoins();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currency])

  const darkTheme=createTheme({
    palette:{
        primary:{
            main:'#fff',
        },
        type:'dark'
    },
   
  })
  console.log(coins);
  console.log(loading);


  const handleSearch=()=>{
    return coins.filter((coin)=>(
      coin.name.toLowerCase().includes(search) || 
      coin.symbol.toLowerCase().includes(search)
    ))
  }

  return (
    <ThemeProvider theme={darkTheme}>
        <Container styles={{textAlign:"center"}}>
           <Typography
            variant='h4'
           
            style={{fontWeight:"light",
            marginBottom:15,
            marginTop:15,
            fontFamily:'Montserrat',textAlign:'center'}}
           >
              Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField
              sx={{ label: { color: 'white' } ,input: { color: 'white' },border: '1px solid white', borderRadius: 1}}
              style={{marginTop:20,width:"100%",color:'white',marginBottom:20}}
              label="Search For a Crypto Currency.." variant="outlined"
              onChange={(e)=>setSearch(e.target.value)}
            />
            <TableContainer>
            {
                loading?(
                    <LinearProgress style={{background:"gold"}}/>
                ):(
                  <Table>
                    <TableHead style={{backgroundColor:"#EEBC1D"}}>
                        <TableRow>
                            {['Coin','Price','24h Change','Market Cap'].map((head)=>(
                                <TableCell
                                  style={{color:'black',fontWeight:'700',fontFamily:'Montserrat'}}
                                  key={head}
                                  align={head==='Coin'?'':"right"}
                                >
                                  {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                      {handleSearch()
                          .slice((page-1)*10,(page-1)*10+10)
                          .map((row)=>{
                          const profit=row.profit_change_percentage_24h>0

                          return (
                              <TableRow
                                onClick={()=>history(`/coins/${row.id}`)}
                                className={classes.row}
                                key={row.name}
                              >
                                <TableCell component='th'
                                            scope='row'
                                            style={{display:'flex',gap:15}}
                                >
                                <img
                                  src={row?.image}
                                  alt={row.name}
                                  height='50'
                                  style={{marginBottom:10}}
                                />
                                <div
                                  style={{color:'white',display:'flex',flexDirection:'column'}}
                                >
                                  <span
                                    style={{
                                      textTransform:'uppercase',
                                      fontSize:22
                                    }}
                                  >
                                    {row.symbol}
                                  </span>
                                  <span style={{color:'drakgrey'}}>{row.name}</span>
                                </div>
                                </TableCell>
                                 <TableCell align="right" style={{color:'white'}}>
                                  {symbol}{" "}
                                  {numberWithCommas(row.current_price.toFixed(2))}
                                 </TableCell>
                                 <TableCell
                                  align="right"
                                  
                                  style={{
                                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                    fontWeight: 500,
                                  }}
                                >
                                  {profit && "+"}
                                  {row.price_change_percentage_24h.toFixed(2)}%
                                </TableCell>
                                <TableCell align="right"
                                  style={{color:'white'}}
                                >
                                  {symbol}{" "}
                                  {numberWithCommas(
                                    row.market_cap.toString().slice(0, -6)
                                  )}
                                  M
                                </TableCell>
                              </TableRow>
                          );
                      })}
                    </TableBody>
                  </Table>
                )
            } 
            </TableContainer>
            <Pagination
              style={{color:'gold',padding:20,width:'100%',display:'flex',justifyContent:'center'}}
              align='center'
              color='primary'
              count={(handleSearch()?.length/10).toFixed(0)}
              classes={{ ul: classes.ul }}
              onChange={(_,value)=>{
                setPage(value);
                window.scroll(0,450)
              }}
            />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable