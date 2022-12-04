import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CoinPage from './Pages/CoinPage';
import Home from './Pages/Home';
import { makeStyles } from '@mui/styles';


function App() {
  const useStyles = makeStyles({
    App: {
      background: '#14161a',
      color:'white',
      minHeight:'100vh'
    },
  });

  const classes=useStyles()


  return (
    <BrowserRouter>
      <div className={classes.App}>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/coins/:id' element={<CoinPage/>}></Route>
          </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
