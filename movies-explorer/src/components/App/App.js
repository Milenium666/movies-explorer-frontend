import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';




function App () {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <>
            <Header />
            <Main />
            <Footer />
          </>
        }/>
        <Route path='/movies'  element={
          <>
            <Header type="loggedIn"/>
            <Movies />
            <Footer />
          </>
        }/>

        <Route pash='/saved-movies'  element={
          <>
            <Header type="loggedIn"/>
            <SavedMovies />
            <Footer />
          </>
        }/>

        <Route path='/profile'  element={
          <>
            <Header type="loggedIn"/>
            <Profile />
          </>
        }/>
        <Route path='/signup'  element={<Register />}/>
        <Route path='/signin'  element={<Login />}/>
        {/* компонент для несуществующего роута */}
      </Routes>
      
    </div>
  );
}

export default App;
