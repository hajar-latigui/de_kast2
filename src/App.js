import { useState } from 'react'
import AddUser from './Components/AddUser';
import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
