import React from 'react';
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
      <Main />
      <Movies />
      <SavedMovies />
      <Register />
      <Login />
      <Profile />
      <Footer />
    </div>
  );
}

export default App;
