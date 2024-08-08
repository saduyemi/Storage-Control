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
import { useAuth } from './Hooks/useAuth';


import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { LoadingCircle } from './components/LoadingCircle/LoadingCircle';

export const LoginContext = createContext(null);

function App() {
  const [items, setItems] = useState(null);
  const [loaded, setLoaded] = useState(false);
  
  const isAuthorized = useAuth();
  const user = useProfile();

  let navbar; // Navbar will show depending on whether user is logged in
  
  useEffect(() => {
    if (user) {
      console.log("Fetching Data......");

      const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      };

    fetch("http://localhost:3000/items", options)
      .then((result) => {
        result.json()
          .then(data => {
            console.log(`Fetched Data`, data);
            setItems(data.result);
            setLoaded(true);
          })
      })
      .catch((err) => {
        console.log(err);
      })

    }
    else {
      console.log("User Is Not Authenticated Not Fetching Data");
    }
  }, [user]); // Fetch data here, so whenever program starts it has data to be used //TODO

  async function refreshItems() {
    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    };

    try { 
      const result = await fetch("http://localhost:3000/items", options);
      const data = await result.json();
      setItems(data.result);
    }
    catch (err) {
      console.log(err);
      setItems(null);
    }
  }

  // make path '/' element a conditional render where it's either login or home based on whether or not user has jwt token
  let defaultPath = <></>;

  if (isAuthorized.completed || user) {
    if (isAuthorized.checked || user) {
      defaultPath = <Home/>;
      navbar = <Navbar/>;
    }
    else {
      defaultPath = <Login/>;
      navbar = <></>;
    }
  }
  else {
    defaultPath = <LoadingCircle/>;
    navbar = <></>;
  } 

  return (
    <>
      <LoginContext.Provider value={{user, items, loaded, refreshItems}}>
        <Router>
          {/*isAuthorized.completed && isAuthorized.checked &&*/ user && <Navbar/> }
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />

            <Route path='/' element={defaultPath} />
            <Route path='/home' element={<Home/>} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/search' element={<Search/>} />
            <Route path='/input' element={<InputForm/>} />
            <Route path='/print' element={<Print/>} />

          </Routes>
        </Router>
      </LoginContext.Provider>  
    </>
  );
}

export default App
