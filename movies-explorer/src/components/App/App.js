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
import ProtectedRoute from '../ProtectedRoute';




function App () {
const [currentUser, setCurrentUser] = React.useState({});
const [loggedIn, setLoggedIn] = React.useState(false);

const navigate = useNavigate()

React.useEffect(() => {
  getUserInfo()
}, [loggedIn]);



const handleRegister = ({name, email, password}) => {
    MainApiAuth.register({name, email, password})
      .then(() => {
        console.log('Регистрация выполнена')
        handleLogin({ email, password })
      })
      .catch(() => {
        console.log('Ошибка регистрации')
      })
}

const handleLogin = ({ email, password }) => {
  MainApiAuth.login({ email, password })
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
        console.log(data)
        const { email, _id, name } = data
        console.log(email, _id)
        setCurrentUser({
          email, _id, name
        })
        setLoggedIn(true)
      })
      .catch(err => console.log(err))
  }
}

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
            <Profile onSignOut={onSignOut}/>
          </>
          </ProtectedRoute>

        }/>
        <Route path='/signup'  element={<Register onRegister={handleRegister}/>} />
        <Route path='/signin'  element={<Login onLogin={handleLogin}/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
