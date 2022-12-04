import React,{useEffect, useState} from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { CircularProgress } from '@mui/material';
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import {chartDays} from '../config/data'
import SelectButton from "./SelectButton";

const useStyles = makeStyles((theme) => ({
    container: {
      // width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      width:'100%'
    },
    chart:{
      width:'60vw'
    },
    "@media (max-width: 900px)": {
      container:{
        width:"100%",
        marginTop:0,
        padding:20,
        paddingTop:0,
      },
      chart:{
        width:'90vw'
      }
    },
    "@media (max-width: 600px)": {
      container:{
        width:"100%",
        marginTop:0,
        padding:20,
        paddingTop:0,
      },
      chart:{
        width:'90vw'
      }
    }
}));

function CoinInfo({coin}) {
    const [historicalData,setHistoricalData]=useState();
    const [days,setDays]=useState(1)
    const {currency}=CryptoState();
    const [flag,setflag] = useState(false);
    const fetchHistoricalData=async()=>{
        const {data}=await axios.get(HistoricalChart(coin.id,days,currency))
        console.log(data);
        setHistoricalData(data.prices);
        setflag(true);
    }


    useEffect(()=>{
        fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[days,currency])

    const darkTheme=createTheme({
      palette: {
          primary: {
          main: "#fff",
          },
          type: "dark",
      },
    })
    const classes=useStyles()

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          !historicalData | flag===false?(
              <CircularProgress
              style={{display:'flex',color:'gold',justifyContent:'center',alignItems:'center'}}
              size={200}
              thickness={1}
              
            >
            </CircularProgress>
          ):(
            <div className={classes.chart}>
              <Line
                options={{ maintainAspectRatio: false }}
                 data={{
                  labels: historicalData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),
  
                  datasets: [
                    {
                      data: historicalData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
              <div
                style={{
                  display: "flex",
                  marginTop: 20,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
               {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
              </div>
            </div>
          )
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo