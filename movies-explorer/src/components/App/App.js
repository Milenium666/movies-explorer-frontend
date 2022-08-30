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
import transformMovies from '../../utils/transformMovies';
import useWindowSize from '../../hooks/useWindowSize';
import checkSavedMovies from '../../utils/checkSavedMovies'







function App() {
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [filter, setFilter] = React.useState();
  const [formErrorMessage, setFormErrorMessage] = React.useState('');
  const [profileIsBeingEdited, setProfileIsBeingEdited] = React.useState(false);
  const [searchSaveResult, setSearchSaveResult] = React.useState([])
  const [onSearch, setOnSearch] = React.useState();

  const navigate = useNavigate();
  const location = useLocation();
  const width = useWindowSize();


  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    const searchResult = localStorage.getItem('searchResult');
    const savedMovies = localStorage.getItem('savedMovies');
    if (jwt) {
      setToken(jwt);
      if (searchResult) {
        setCards(JSON.parse(searchResult))

      }
      if (savedMovies) {
        setSavedCards(JSON.parse(savedMovies));
      }
      MainApi.checkToken(jwt)
        .then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
          navigate(location.pathname);
        })
        .catch((err) => {
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          })
        })

    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);




  const handleRegister = (data) => {
    MainApi.register(data)
      .then(() => {
        setIsInfoTooltip({
          isOpen: true,
          successful: true,
          text: 'Регистрация выполнена',
        });
        handleLogin(data)
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
    console.log(data)
    MainApi.login(data)
      .then((data) => {
        setToken(data.token);
        localStorage.setItem('jwt', data.token)
        console.log(localStorage)
        setLoggedIn(true);
        navigate('/movies')
        MainApi.getMovies(token)
          .then((data) => {
            console.log(data)
            setSavedCards(data);
            localStorage.setItem('savedMovies', JSON.stringify(data))
          })
          .catch(() => {
            setIsInfoTooltip({
              isOpen: true,
              successful: false,
              text: 'Ошибка при загрузке сохранненых фильмов',
            })
          })
        MainApi.checkToken(data.token)
          .then((data) => {
            setCurrentUser(data);
          })
          .catch(() => {
            setIsInfoTooltip({
              isOpen: true,
              successful: false,
              text: 'Ошибка в проверке токена',
            })
          })

      })
      .catch(() => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: 'Ошибка входа в аккаунт',
        })
      })
    if (loggedIn) {
      MainApi.checkToken(loggedIn)
        .then((user) => {
          setCurrentUser(user);
        })
        .catch(() => {
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: 'Не удалось загрузить данные',
          })
        })
    }
  }


  const handleUpdateDataUser = ({ name, email }) => {
    MainApi.setUserInfo({ name, email })
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







  function handleSearchSubmit(inpulValue) {
    if (inpulValue === '') {
      setCards([])
    } else {
      MovieApi
        .getMoviesFromSecondApi()
        .then((data) => {
          transformMovies(data)
          checkSavedMovies(data, savedCards)
          console.log(data)
          const searchResult = data.filter((data) => {
            localStorage.setItem("searchTag", inpulValue);
            return data.nameRU.toLowerCase().includes(inpulValue.toLowerCase());

          });
          return searchResult;
        })

        .then((searchResult => {
          setIsLoading(true)
          setCards([])
          setTimeout(() => {
            if (searchResult.length < 1) {
              setCards(searchResult);
              console.log(searchResult)
              localStorage.setItem("searchResult", JSON.stringify(searchResult))
              setIsLoading(false)
              setIsInfoTooltip({
                isOpen: true,
                successful: false,
                text: 'Ничего не найдено',
              })
            }
            else {
              setCards(searchResult);
              console.log(searchResult);
              localStorage.setItem("searchResult", JSON.stringify(searchResult));
              //   // console.log(localStorage);
              setIsLoading(false)
            }
          }, 2000)
        }))
        .catch(() => {
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
          })
        })
    }

  }

  const handleSaveMovie = (movie) => {
    MainApi.addSavedMovies(movie)
      .then((movie) => {
        console.log(movie)
        setSavedCards([movie, ...savedCards])
        console.log(movie)
        localStorage.setItem('savedMovies', JSON.stringify(savedCards))
      })
      .catch(err => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      })
  }
  function isExist(name) {
    return !!localStorage[name];
  }


  React.useEffect(() => {
    if (isExist("searchResult") && token) {
      const a = localStorage.getItem("searchResult");
      const actualMovies = JSON.parse(a);
      checkSavedMovies(actualMovies, savedCards)
      setCards(actualMovies);
    }
  }, [token, savedCards]);



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
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMoviesList));
      })
      .catch((err) => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      })
  }

  function searchSavedMovies(inpulValue) {
    if (inpulValue === '') {
      setSavedCards([]);
    } else {
      setOnSearch(!onSearch)
      setIsLoading(true)
      setSavedCards([])
      setTimeout(() => {
        const filterSavedMovies = savedCards.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(inpulValue.toLowerCase());
        });
        if (filterSavedMovies.length < 1) {
          setIsLoading(false)
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: 'Ничего не найдено',
          })
          setSearchSaveResult(savedCards);
        } else {
          setIsLoading(false)
          return setSearchSaveResult(filterSavedMovies)
        }
      }, 2000)
    }
  }


  const closeInfoTooltip = () => {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  }

  const resetAllFormMessage = () => {
    setFormErrorMessage('');
  };
  const handleEditProfile = () => {
    setProfileIsBeingEdited(true);
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
              <Header loggedIn={loggedIn} />
              <Main />
              <Footer />
            </>
          } />

          {/* Movies */}
          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Header type="loggedIn" loggedIn={loggedIn} />
                <Movies
                  cards={cards}
                  filter={filter}
                  setFilter={setFilter}
                  onLikeClick={handleSaveMovie}
                  onDeleteClick={handleDeleteMovie}
                  handleSearchSubmit={handleSearchSubmit}
                  width={width}
                  isLoading={isLoading}

                />
                <Footer />
              </>
            </ProtectedRoute>} />

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
                  isLoading={isLoading}
                  searchSavedMovies={searchSavedMovies}

                  searchSaveResult={searchSaveResult}
                  onSearch={onSearch}
                />
                <Footer />
              </>
            </ProtectedRoute>} />

          {/* Profile */}
          <Route path='/profile' element={
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
            </ProtectedRoute>} />
          {loggedIn ? <Route path='*' element={<NotFound />} /> : <Route path='/signup' element={<Register onRegister={handleRegister} resetFormErrorMessage={resetAllFormMessage} />} />}
          {loggedIn ? <Route path='*' element={<NotFound />} /> : <Route path='/signin' element={<Login onLogin={handleLogin} resetFormErrorMessage={resetAllFormMessage} />} />}


        </Routes>
        <InfoTooltip
          status={isInfoTooltip}
          onClose={closeInfoTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
