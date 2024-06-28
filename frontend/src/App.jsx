import { useState } from 'react'
import './App.css'

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Catalog from './components/Catalog/Catalog';
import Search from './components/Search/Search';
import InputForm from './components/InputForm/InputForm';
import Print from './components/Print/Print';


import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  // make path '/' element a conditional render where it's either login or home based on whether or not user has jwt token
  return (
    <>
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
    </>
  );
}

export default App
