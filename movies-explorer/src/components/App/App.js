import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import CurrentUserContext from '../../context/CurrentUserContext';
import api from '../../utils/MainApi';
import * as MainApiAuth from '../../utils/MainApiAuth';




function App () {
const [currentUser, setCurrentUser] = React.useState({});

const navigate = useNavigate()


const handleRegister = ({name, email, password}) => {
    MainApiAuth.register({name, email, password})
      .then(() => {
        console.log('Регистрация выполнена')
        //setLoggedIn(true)
        navigate('/movies')
      })
      .catch(() => {
        console.log('Ошибка регистрации')
      })
}
  return (
  <CurrentUserContext.Provider value={currentUser}>
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
            <Header type="loggedIn" />
            <Movies />
            <Footer />
          </>
        }/>
        <Route path='/saved-movies' element={
          <>
            <Header type='loggedIn' />
            <SavedMovies />
            <Footer />

          </>
        }
        />

        <Route path='/profile'  element={
          <>
            <Header type="loggedIn"/>
            <Profile />
          </>
        }/>
        <Route path='/signup'  element={<Register onRegister={handleRegister}/>} />
        <Route path='/signin'  element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
