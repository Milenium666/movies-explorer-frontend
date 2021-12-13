import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';




function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/movies'  element={<Movies />}/>
        <Route pash='/saved-movies'  element={<SavedMovies />}/>
        <Route path='/signup'  element={<Register />}/>
        <Route path='/signin'  element={<Login />}/>
        <Route path='/profile'  element={<Profile />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
