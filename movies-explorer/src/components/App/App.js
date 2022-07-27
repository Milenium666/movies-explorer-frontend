import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';


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
import InfoTooltip from '../InfoTooltip/InfoTooltip';

import CurrentUserContext from '../../context/CurrentUserContext';

import MainApi from '../../utils/MainApi';
import * as MovieApi from '../../utils/MovieApi';
// import Preloader from '../Preloader/Preloader';








function App () {
const [currentUser, setCurrentUser] = React.useState({});
const [loggedIn, setLoggedIn] = React.useState(false);
const [formErrorMessage, setFormErrorMessage] = React.useState('');
// const [isLoading, setIsLoading] = React.useState(true);
const [profileIsBeingEdited, setProfileIsBeingEdited] = React.useState(false);
const [openPopup, setOpenPopup] = React.useState(false);
const [cards, setCards] = React.useState([]);
const [token, setToken] = React.useState(null);



const navigate = useNavigate();
const location = useLocation();


// !!!проверки токена уже зарегистрированых пользаветелей

















const handleUpdateDataUser = ({name, email}) => {
  const token = localStorage.getItem('jwt')

  MainApi.setUserInfo({name, email}, token)
    .then(() => {
      handleUpdateDataProfile()
        setCurrentUser({
          name, email
        });
    })
    .catch((err) => {
      console.log(err)
    })

}
const handleUpdateDataProfile = () => {
  setOpenPopup(true);
}

const handleClosePopup = () => {
  setOpenPopup(false);
}


const resetAllFormMessage = () => {
  setFormErrorMessage('');
};
const handleEditProfile = () => {
  setProfileIsBeingEdited(true);
}

const handleRegister = (data) => {
  console.log(data)
    MainApi.register(data)
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
  MainApi.login( data )
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


const handleTokenCheck = (path) => {
  const jwt = localStorage.getItem('jwt')
  if(jwt) {
    MainApi.checkToken(jwt)
      .then((data) => {
        const { name, email, _id } = data;
        // console.log(data)
        setCurrentUser({
          name, email, _id
        })
        setLoggedIn(true);
        setToken(jwt);
        navigate(path);
      })
      .catch((err) => console.log(err))
  }
};


React.useEffect(() => {
  handleTokenCheck(location.pathname);
}, []);


//загрузка фильмов со строннего API
React.useEffect(() => {
  MovieApi.getMoviesFromSecondApi()
    .then((data) => {
      setCards(
        data.map((item) => ({
          id: item.id,
          nameRU: item.nameRU,
          duration: item.duration,
          trailerLink: item.trailerLink,
          image: item.image,
        }))
        
      )
    })
    .catch(err => console.log(err))
}, []);


const onSignOut = () => {
  setLoggedIn(false);
  localStorage.removeItem('jwt');
    navigate('/');
}

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      {/* {isLoading ? <Preloader /> : */}
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
            <Movies cards={cards}/>
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
            <Profile
            onSignOut={onSignOut}
            // onEditProfile={handleEditProfile}
            onUpdateProfile={handleUpdateDataUser}
            // onBeingEdited={profileIsBeingEdited}
            />
          </>
          </ProtectedRoute>

        }/>
        <Route path='/signup'  element={<Register onRegister={handleRegister} resetFormErrorMessage={resetAllFormMessage}/>} />
        <Route path='/signin'  element={<Login onLogin={handleLogin} resetFormErrorMessage={resetAllFormMessage}/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
       {/* } */}
        <InfoTooltip
        isOpen={openPopup}
        onClose={handleClosePopup}
        />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
