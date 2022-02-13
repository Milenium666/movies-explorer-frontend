import React, { useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';


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

import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';








function App () {
const [currentUser, setCurrentUser] = React.useState({});
const [loggedIn, setLoggedIn] = React.useState(false); 
const [formErrorMessage, setFormErrorMessage] = React.useState('');
const [isLoading, setIsLoading] = React.useState(true);
const [profileIsBeingEdited, setProfileIsBeingEdited] = React.useState(false);

const navigate = useNavigate()




React.useEffect(() => {
  handleTokenCheck();
}, [loggedIn])

// React.useEffect(() => {
//   if(loggedIn){
//     const localUserData = localStorage.getItem('currentUser');
//   }
//   if(!localUserData) {
//     const token = localStorage.getItem('jwt')
//     mainApi.checkToken(token)
//       .then((res) => {
//         localStorage.setItem('currentUser', JSON.stringify(res.data));
//         setCurrentUser(res.data);
//       })
//       .catch((err) => {
//         console.log('Не удалось получить информацию о пользователе с сервера', err);
//       })
//   } else {
//     setCurrentUser(JSON.parse(localUserData));
//   }
// })


const handleTokenCheck = () => {
  const token = localStorage.getItem('jwt')

  if (token) {
    mainApi.checkToken(token)
      .then(data => {
        setLoggedIn(true)
        const { email, _id, name } = data
        
        setCurrentUser({
          email, _id, name
        })
        
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })

  }
}



const handleRegister = (data) => {
  console.log(data)
    mainApi.register(data)
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
  mainApi.login( data )
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
  setLoggedIn(false);
  localStorage.clear();
  navigate('/');

}

const handleUpdateDataUser = ({name, email}) => {
  const token = localStorage.getItem('jwt')

  mainApi.setUserInfo({name, email}, token)
    .then(() => {
      // localStorage.setItem('currentUser', JSON.stringify(res.data));
      // console.log(setCurrentUser)
        setCurrentUser({
          name, email
        });
    })
    // .then(() => {
    //   setProfileIsBeingEdited(false);
    //   //!!popap
    // })
    .catch((err) => {
      console.log(err)
    })

}



const resetAllFormMessage = () => {
  setFormErrorMessage('');
};
const handleEditProfile = () => {
  setProfileIsBeingEdited(true);
}

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      {isLoading ? <Preloader /> :
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
      }
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
