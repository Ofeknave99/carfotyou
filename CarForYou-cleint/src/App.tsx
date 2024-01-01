import React, { FunctionComponent, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Home from './components/Home';
import AddCar from './components/AddCar';
import Fav from './components/Fav';
import MyCar from './components/MyCar';
import { addCar } from './services/CarService';
import UpdateCar from './components/UpdateCar';
import SenBox from './components/SenBox';
import ShowCar from './components/Showcar';
import Showcar from './components/Showcar';
import Chat from './components/Chat';

interface UserInfo {
  email: string | false;
  role: string | false;
}

const App: FunctionComponent = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(
    JSON.parse(sessionStorage.getItem("userInfo") as string) || { email: false, role: false }
  );

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <ToastContainer />
      <Router>
        <NavBar
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <Routes>
          <Route path="/Login" element={<Login setUserInfo={setUserInfo} />} />
          <Route path="/About" element={<About />} />
          <Route path="/MyCar" element={<MyCar userInfo={userInfo} cars={[]} />} />
          <Route path="/Home" element={<Home userInfo={userInfo} cars={[]} />} />
          <Route path="/Register" element={<Register setUserInfo={setUserInfo} />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/SenBox" element={<SenBox />} />
          <Route path="/Showcar/:id" element={<Showcar />} />
          <Route path="/AddCar" element={<AddCar userInfo={userInfo} />} />
          <Route path="/update/Car/:id" element={<UpdateCar />} />
          <Route path="/Fav" element={<Fav userInfo={userInfo} />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
        <Footer userInfo={userInfo} />
      </Router>
    </div>
  );
};

export default App;
