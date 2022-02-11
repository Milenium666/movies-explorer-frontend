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
import ProtectedRoute from '../ProtectedRoute';

import CurrentUserContext from '../../context/CurrentUserContext';

import api from '../../utils/MainApi';
import * as MainApiAuth from '../../utils/MainApiAuth';








function App () {
const [currentUser, setCurrentUser] = React.useState({});
const [loggedIn, setLoggedIn] = React.useState(false);
const [formErrorMessage, setFormErrorMessage] = React.useState('')

const navigate = useNavigate()

React.useEffect(() => {
  getUserInfo()
}, [loggedIn]);



const handleRegister = (data) => {
  console.log(data)
    MainApiAuth.register(data)
      .then(() => {
        console.log(data)
        console.log('Регистрация выполнена')
        handleLogin({ email: data.email,
        password: data.password
        })
      })
      .catch(() => {
        console.log('Ошибка регистрации')
      })
}

const handleLogin = (data) => {
  MainApiAuth.login( data )
    .then( (data) => {
      const { token } = data;
      localStorage.setItem('jwt', token)
      setLoggedIn(true)
      navigate('/movies')
    })
    .catch(() => {
      console.log('Ошибка входа в аккаунт')
    })
}

const onSignOut = () => {
  localStorage.removeItem('jwt');
  setLoggedIn(false);
}

const getUserInfo = () => {
  const token = localStorage.getItem('jwt')

  if (token) {
    MainApiAuth.checkToken(token)
      .then(data => {
        const { email, _id, name } = data
        setCurrentUser({
          email, _id, name
        })
        setLoggedIn(true)
      })
      .catch(err => console.log(err))
  }
}

const resetAllFormMessage = () => {
  setFormErrorMessage('');
};

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <Routes>
        <Route path='/' element={
          <>
            <Header loggedIn={loggedIn}/>
            <Main />
            <Footer />
          </>
        }/>
        <Route path='/movies'  element={
          <ProtectedRoute loggedIn={loggedIn}>
          <>
            <Header type="loggedIn" loggedIn={loggedIn}/>
            <Movies />
            <Footer />
          </>
          </ProtectedRoute>
        }/>
        <Route path='/saved-movies' element={
          <ProtectedRoute loggedIn={loggedIn}>
          <>
            <Header type='loggedIn' loggedIn={loggedIn} />
            <SavedMovies />
            <Footer />

          </>
          </ProtectedRoute>
        }
        />

        <Route path='/profile'  element={
          <ProtectedRoute loggedIn={loggedIn}>
          <>
            <Header loggedIn={loggedIn} />
            <Profile onSignOut={onSignOut} />
          </>
          </ProtectedRoute>

        }/>
        <Route path='/signup'  element={<Register onRegister={handleRegister} resetFormErrorMessage={resetAllFormMessage}/>} />
        <Route path='/signin'  element={<Login onLogin={handleLogin} resetFormErrorMessage={resetAllFormMessage}/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
