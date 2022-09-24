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







function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [token, setToken] = React.useState(null);
  const [searchResult, setSearchResult] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [searchTag, setSearchTag] = React.useState('');
  const [allMovies, setAllMovies] = React.useState([]);

  const [isInfoTooltip, setIsInfoTooltip] = React.useState({
    isOpen: false,
    successful: true,
    text: ''
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAppReady, setIsAppReady] = React.useState(false);
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
    const searchResultLS = localStorage.getItem('searchResult');
    const savedMoviesLS = localStorage.getItem('savedMovies');
    const allMoviesLS = localStorage.getItem('searchMovies');
    const searchTagSL = localStorage.getItem('searchTag');
    
    if (jwt) {
      setToken(jwt);
      if (searchResultLS) {
        setSearchResult(JSON.parse(searchResultLS))
      }
      if (savedMoviesLS) {
        setSavedMovies(JSON.parse(savedMoviesLS));
      }
      if (allMoviesLS) {
        setAllMovies(JSON.parse(allMoviesLS))
      }
      if (searchTagSL) {
        setSearchTag(searchTagSL)
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
    else {
      localStorage.removeItem('savedMovies');
      localStorage.removeItem('searchTag');
      localStorage.removeItem('searchResult');
      localStorage.removeItem('allMovies');
    }
  }


  React.useEffect(() => {
    tokenCheck();
    setIsAppReady(true)
  }, []);

  React.useEffect(() => {
    if (token) localStorage.setItem('jwt', token);
  }, [token]);

  React.useEffect(() => {
    if (isAppReady) localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies]);

  React.useEffect(() => {
    if (isAppReady) localStorage.setItem('searchTag', searchTag);

  }, [searchTag]);

  React.useEffect(() => {
    if (isAppReady) localStorage.setItem('searchResult', JSON.stringify(searchResult));
  }, [searchResult]);

  React.useEffect(() => {
    if (isAppReady) localStorage.setItem('allMovies', JSON.stringify(allMovies));
  }, [allMovies]);




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
    MainApi.login(data)
      .then((data) => {
        setToken(data.token);
        setLoggedIn(true);
        navigate('/movies')
        MainApi.getMovies(token)
          .then((data) => {
            setSavedMovies(data);
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

  React.useEffect(() => {
    if (isAppReady && token && allMovies.length > 0) {
      const allMoviesFiltered = allMovies.filter((data) => {

        return data.nameRU.toLowerCase().includes(searchTag.toLowerCase());
      });
      setSearchResult(allMoviesFiltered);
      if (allMoviesFiltered.length < 1) {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: 'Ничего не найдено',
        })
      }
      setIsLoading(false)
    }
  }, [allMovies, searchTag]);

  function handleSearchSubmit(searchTagValue) {
   
    setSearchTag(searchTagValue);
    if (allMovies.length === 0) {
      setIsLoading(true)
      MovieApi.getMoviesFromSecondApi()
        .then((data) => {
          data = transformMovies(data)
          setAllMovies(data);
        })
        .catch((e) => {
          setIsLoading(false)
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
        setSavedMovies([movie, ...savedMovies])
      })
      .catch(err => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      })
  }

  const handleDeleteMovie = (movie) => {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    )
    MainApi.deleteSavedMovies(savedMovie._id)
      .then(() => {
        const newSavedMoviesList = savedMovies.filter((updateMovie) => {
          if (movie.id === updateMovie.movieId || movie.movieId === updateMovie.movieId) {
            return false;
          } else {
            return true;
          }
        })
        setSavedMovies(newSavedMoviesList)
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
    setOnSearch(!onSearch)
    setIsLoading(true)
    setTimeout(() => {
      const filterSavedMovies = savedMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(inpulValue.toLowerCase());
      });
      if (filterSavedMovies.length < 1) {
        setIsLoading(false)
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: 'Ничего не найдено',
        })
        setSearchSaveResult(savedMovies);
      } else {
        setIsLoading(false)
        return setSearchSaveResult(filterSavedMovies)
      }
    }, 2000)

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
    setLoggedIn(false);
    localStorage.clear()
    setSearchTag('');
    setAllMovies([]);
    setSearchResult([]);
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
                  cards={searchResult}
                  savedCards={savedMovies}
                  filter={filter}
                  setFilter={setFilter}
                  onLikeClick={handleSaveMovie}
                  onDeleteClick={handleDeleteMovie}
                  handleSearchSubmit={handleSearchSubmit}
                  width={width}
                  isLoading={isLoading}
                  searchTag={searchTag}

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
                  savedMovies={savedMovies}
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
          <Route path='*' element={<NotFound />} />

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
