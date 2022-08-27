import React from 'react';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';


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
import Preloader from '../Preloader/Preloader';

import transformMovies from '../../utils/transformMovies';
import useWindowSize from '../../hooks/useWindowSize';








function App () {
const [currentUser, setCurrentUser] = React.useState({});
const [loggedIn, setLoggedIn] = React.useState(false);
const [cards, setCards] = React.useState([]);
const [savedCards, setSavedCards] = React.useState([]);
const [token, setToken] = React.useState(null);
const [isInfoTooltip, setIsInfoTooltip] = React.useState({
  isOpen: false,
  successful: true,
  text: ''
});
const [isLoader, setLoader] = React.useState(false)


//заходит в функции по поиску и удалению из избраного;Заходит в компоненты movies и saved-movies
const [filter, setFilter] = React.useState();
// const [searchTag, setSearchTag] = React.useState('');

const [formErrorMessage, setFormErrorMessage] = React.useState('');
const [profileIsBeingEdited, setProfileIsBeingEdited] = React.useState(false);


const navigate = useNavigate();
const location = useLocation();


const width = useWindowSize();



const handleUpdateDataUser = ({name, email}) => {
  MainApi.setUserInfo({name, email})
    .then(() => {
        setCurrentUser({
          name, email
        });
        setIsInfoTooltip({
          isOpen: true,
          successful: true,
          text: 'Ваши данные обновлены!',
        });
    })
    .catch((err) => {
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: err,
      })
    })

}
const closeInfoTooltip = () => {
  setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
}

// const handleClosePopup = () => {
//   setOpenPopup(false);
// }


const resetAllFormMessage = () => {
  setFormErrorMessage('');
};
const handleEditProfile = () => {
  setProfileIsBeingEdited(true);
}

const handleRegister = (data) => {

    MainApi.register(data)
      .then(() => {
        setIsInfoTooltip({
          isOpen: true,
          successful: true,
          text: 'Регистрация выполнена',
        });
        handleLogin({ email: data.email,
        password: data.password
        })
      })
      .catch(() => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: 'Ошибка регистрации',
        })
      })
}

const handleLogin = (data) => {
  MainApi.login( data )
    .then( (data) => {
      const { token } = data;
      localStorage.setItem('jwt', token)
      setLoggedIn(true)
      
      handleTokenCheck('/movies')
      MainApi.getUserInfo()
        .then((data) => {
          setCurrentUser(data)
        })

    })
    .catch(() => {
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: 'Ошибка входа в аккаунт',
      })
    })
}


const handleTokenCheck = (path) => {
  const jwt = localStorage.getItem('jwt')
  if(jwt) {
    MainApi.checkToken(jwt)

      .then((res) => {
        if(res) {
          const { email }  = res.email;
          setLoggedIn(true);
          setToken(jwt);
          navigate(path);
        }
      })
      .catch((err) => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      })
  }
};



const handleSaveMovie = (movie) => {
      MainApi.addSavedMovies(movie)
        .then((movie) => {
          console.log(movie)
          setSavedCards([movie.movie, ...savedCards])
        })
        .catch(err => {
          setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })})
}



const handleDeleteMovie = (movie) => {
        const savedMovie = savedCards.find(
          (item) => item.movieId === movie.id || item.movieId === movie.movieId
        )
        MainApi.deleteSavedMovies(savedMovie._id)
          .then(() => {
            const newSavedMoviesList = savedCards.filter((updateMovie) => {
              if (movie.id === updateMovie.movieId || movie.movieId === updateMovie.movieId) {
                return false;
              } else {
                return true;
              }
            })
            setSavedCards(newSavedMoviesList)
          })
          .catch((err) => {
            setIsInfoTooltip({
              isOpen: true,
              successful: false,
              text: err,
            })
          })
}

React.useEffect(() => {
  handleTokenCheck(location.pathname);
}, []);


React.useEffect(() => {
  if(token) {
    MainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        setToken(token);
      })
      //пока что выводим ошибки в консоль потом планируется выводить через попап
      .catch((err) => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      })
  }
}, [token]);



React.useEffect(() => {
  MainApi.getMovies()
    .then(({movie}) => {
      setSavedCards(movie.filter((data) => {
        return data;
      }))
    })
    .catch(err => {
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: err,
      })
    })
}, [token]);

// загрузка фильмов со строннего API
// React.useEffect(() => {
//   MovieApi.getMoviesFromSecondApi()
//     .then((data) => {
//       transformMovies(data, savedCards)
//       setCards(data.filter((data) => (data)))
//     })
    
//     .catch(err => {
//       setIsInfoTooltip({
//       isOpen: true,
//       successful: false,
//       text: err,
//     })})
// }, [token, savedCards]);


function handleSearchSubmit (inpulValue) {
  if (inpulValue === '') {
    setCards([])
  } else {
    MovieApi
    .getMoviesFromSecondApi()
    .then((data) => {
      transformMovies(data, savedCards)
      console.log(savedCards)
        const searchResult = data.filter((data) => {
          localStorage.setItem("searchTag", inpulValue);
          return data.nameRU.toLowerCase().includes(inpulValue.toLowerCase());

        });
        return searchResult;
      })
  
    .then((searchResult => {
      // setIsLoading(true)
      setCards([])
      setTimeout(() => {
        if (searchResult.length < 1 ) {
          // setInfo('Ничего не найдено')
          setCards(searchResult);
          localStorage.setItem("searchResult", JSON.stringify(searchResult))
          // setIsLoading(false)
        } 
        else {
          setCards(searchResult);
          //    console.log(searchResult);
            localStorage.setItem("searchResult", JSON.stringify(searchResult));
          //   // console.log(localStorage);
          // setIsLoading(false)
        }
      }, 2000)
    }))
    .catch(err => {
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
      })
    })
  }
  
}



const onSignOut = () => {
  setCurrentUser({})
  setLoggedIn(false);
  localStorage.clear()
  navigate('/');
}

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <Routes>
        {/* Main*/}
        <Route path='/' element={
          <>
            <Header loggedIn={loggedIn}/>
            <Main />
            <Footer />
          </>
        }/>

        {/* Movies */}
        <Route path='/movies'  element={
          <ProtectedRoute loggedIn={loggedIn}>
          <>
            <Header type="loggedIn" loggedIn={loggedIn}/>
            <Movies
              cards={cards}
              filter={filter}
              setFilter={setFilter}
              onLikeClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
              setLoader={setLoader}
              handleSearchSubmit={handleSearchSubmit}
              // searchTag={searchTag}
              width={width}

              />
            <Footer />
          </>
          </ProtectedRoute>}/>

        {/* Saved-Movies */}
        <Route path='/saved-movies' element={
          <ProtectedRoute loggedIn={loggedIn}>
          <>
            <Header type='loggedIn' loggedIn={loggedIn} />
            <SavedMovies 
              filter={filter}
              savedCards={savedCards}
              setFilter={setFilter}
              onDeleteClick={handleDeleteMovie}
              width={width}
            />
            <Footer />
          </>
          </ProtectedRoute>}/>

          {/* Profile */}
        <Route path='/profile'  element={
          <ProtectedRoute loggedIn={loggedIn}>
            <>
              <Header loggedIn={loggedIn} />
              <Profile
                onSignOut={onSignOut}
                onUpdateProfile={handleUpdateDataUser}
                onEditProfile={handleEditProfile}
                onBeingEdited={profileIsBeingEdited}
              />
            </>
          </ProtectedRoute>}/>
        {loggedIn ?  <Route path='*' element={<NotFound />} /> : <Route path='/signup'  element={<Register onRegister={handleRegister} resetFormErrorMessage={resetAllFormMessage}/>} />}
        {loggedIn ? <Route path='*' element={<NotFound />} /> : <Route path='/signin'  element={<Login onLogin={handleLogin} resetFormErrorMessage={resetAllFormMessage}/>} />}
        
        
      </Routes>
        <InfoTooltip
          status={isInfoTooltip}
          onClose={closeInfoTooltip}
        />
        <Preloader isOpen={isLoader}/>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
