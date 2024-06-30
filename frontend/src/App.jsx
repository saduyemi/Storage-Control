import { useState, useEffect, createContext, useContext } from 'react'
import './App.css'


import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Catalog from './components/Catalog/Catalog';
import Search from './components/Search/Search';
import InputForm from './components/InputForm/InputForm';
import Print from './components/Print/Print';

import { useProfile } from './Hooks/useProfile';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

export const LoginContext = createContext(null);

function App() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const user = useProfile(); // with this hook, user will be updated based on it's prescence in localStorage

  useEffect(() => {
    if (user) {
      //console.log("Fetching Data......");

    }

  }, []); // Fetch data here, so whenever program starts it has data to be used //TODO

  // make path '/' element a conditional render where it's either login or home based on whether or not user has jwt token
  return (
    <>
      <LoginContext.Provider value={{user, items, loaded}}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />

            <Route path='/' element={<Home/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/catalog' element={<Catalog/>} />
            <Route path='/search' element={<Search/>} />
            <Route path='/insert' element={<InputForm/>} />
            <Route path='/print' element={<Print/>} />

          </Routes>
        </Router>
      </LoginContext.Provider>  
    </>
  );
}

export default App
