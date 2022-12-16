import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { globalContext } from './context/GlobalState';
import './App.css';
import Goal from './pages/Goal';


function App() {
  let {authData: {token}} = useContext(globalContext);




  return (
      <Router>
        <Routes>
          <Route index element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path='/login' element={token ? <Navigate to="/" /> : <Login />}/> 
          <Route path='/signup' element={token ? <Navigate to="/" /> : <Signup />}/>
          <Route path='/goal/:id' element={<Goal />} /> 
        </Routes>
      </Router>
  );
}

export default App;
