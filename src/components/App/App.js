import React, { useState, useEffect } from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js";
import NotFoundPages from "../NotFoundPages/NotFoundPages.js";
import Preloader from "../Preloader/Preloader.js";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useHistory,
  useLocation,
} from "react-router-dom";
import Main from "../Main/Main.js";
import {
  getMe,
  getAuthorization,
  setRegistration,
  setProfileInformation,
  deleteMoves,
  savedMoves,
  getSavedMove,
} from "../../utils/MainApi.js";
import { getMovies } from "../../utils/MoviesApi.js";
import ErrorPopup from "../ErrorPopup/ErrorPopup.js";
import { errorDetection } from "../../utils/constants.js";

function App() {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [newMovies, setNewMovies] = useState([]);
  const [newSavedMovies, setNewSavedMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPreloaderPopupOpen, setIsPreloaderPopupOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const location = useLocation().pathname;
  const [titleSelector, setTitleSelector] = useState("");
  const [seachTextMovies, setSeachTextMovies] = useState("");
  const [checboxMovies, setChecboxMovies] = useState(false);
  const [filterMovies, setFilterMovies] = useState([]);

  // эфекты при загрузке страницы
  useEffect(() => {
    onLogin();
    setMessage("");
    setNewMovies(JSON.parse(localStorage.getItem("filterMovies")) || []);
    const checked = localStorage.getItem("checbox");
    if (checked === "true") {
      setChecboxMovies(true);
    } else {
      setChecboxMovies(false);
    }
    setSeachTextMovies(localStorage.getItem("textSearch"));
    setMovies(JSON.parse(localStorage.getItem("moves")) || []);
    setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")) || []);
  }, []);

  useEffect(() => {
    setMessage("");
    setNewMovies(JSON.parse(localStorage.getItem("filterMovies")) || []);
    const checked = localStorage.getItem("checbox");
    if (checked === "true") {
      setChecboxMovies(true);
    } else {
      setChecboxMovies(false);
    }
    setSeachTextMovies(localStorage.getItem("textSearch"));
    setMovies(JSON.parse(localStorage.getItem("moves")) || []);
    setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")) || []);
    setNewSavedMovies(JSON.parse(localStorage.getItem("savedMovies")) || []);
  }, [location]);

  // попапы открытие
  function handleHamburgerMenuClick() {
    setIsHamburgerMenuOpen(true);
  }

  function handleLoading() {
    setIsPreloaderPopupOpen(true);
  }

  function handleErrorPopupOpen() {
    setIsErrorPopupOpen(true);
  }

  // попапы закрытие
  function closeAllPopups() {
    setIsPreloaderPopupOpen(false);
    setIsHamburgerMenuOpen(false);
    setIsErrorPopupOpen(false);
  }

  // закрытие попапов кнопкой esc и кликом по оверлею
  const isOpen = isErrorPopupOpen || isHamburgerMenuOpen;

  React.useEffect(() => {
    function handlePopupClose(evt) {
      if (
        evt.key === "Escape" ||
        evt.target.classList.contains("hamburger-menu") ||
        evt.target.classList.contains("error-popup")
      ) {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handlePopupClose);
      document.addEventListener("keydown", handlePopupClose);
      return () => {
        document.removeEventListener("mousedown", handlePopupClose);
        document.removeEventListener("keydown", handlePopupClose);
      };
    }
  }, [isOpen]);

  // аутонтификация
  function onLogin() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getMe(jwt)
        .then((res) => {
          getMoviesSave();
          setCurrentUser(res);
          setLoggedIn(true);
          history.push("/movies");
        })
        .catch((err) => {
          history.push("/sign-in");
          console.log(err);
        });
    }
  }

  // выход из прифиля
  function onSignOut(e) {
    e.preventDefault();
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("filterMovies");
    localStorage.removeItem("textSearch");
    localStorage.removeItem("checbox");
    localStorage.removeItem("moves");
    setSeachTextMovies("");
    setChecboxMovies(false);
    setNewMovies([]);
    setMovies([]);
    setNewSavedMovies([]);
    setSavedMovies([]);
    setFilterMovies([]);
    setCurrentUser({});
    setMessage("");
    history.push("/");
  }

  // регистрация
  function handleReg(name, email, password) {
    setMessage("");
    setRegistration(name, email, password)
      .then(() => {
        handleAuth(email, password);
      })
      .catch((err) => {
        closeAllPopups();
        setMessage(err);
        console.log(err);
      });
  }

  //авторизация
  function handleAuth(email, password) {
    setMessage("");
    getAuthorization(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return res.token;
        }
      })
      .then((token) => {
        getMe(token)
          .then((res) => {
            setCurrentUser(res);
            setLoggedIn(true);
          })
          .then(() => {
            localStorage.removeItem("savedMovies");
            localStorage.removeItem("filterMovies");
            localStorage.removeItem("textSearch");
            localStorage.removeItem("checbox");
            localStorage.removeItem("moves");
            setSeachTextMovies("");
            setChecboxMovies(false);
            setNewMovies([]);
            setMovies([]);
            setNewSavedMovies([]);
            setFilterMovies([]);
            onLogin();
            history.push("/movies");
          });
      })
      .catch((err) => {
        setMessage(errorDetection(err));
        setTitleSelector("error-popup__union-title_error");
        handleErrorPopupOpen();
        setMessage(errorDetection(err));
      });
  }

  // редактирование профиля
  function handleEditProfile(requestObject) {
    setProfileInformation(requestObject)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        setMessage("Профиль успешно обновлен!");
        handleErrorPopupOpen();
        setTitleSelector("error-popup__union-title_message");
      })
      .catch((err) => {
        setMessage(errorDetection(err));
        setTitleSelector("error-popup__union-title_error");
        handleErrorPopupOpen();
        console.log(err);
      });
  }

  // поиск по фильмам
  function handleMoviesSearch(searchText, checkbox) {
    setMessage("");
    if (!movies || movies.length === 0) {
      handleLoading();
      getMoviesApi(searchText, checkbox)
    }
    if (movies.length > 0) {
        moviesSearch(searchText, checkbox);
    }
  }

  // запрашиваем фильмы со стороннего API
function getMoviesApi(searchText, checkbox) {
    getMovies()
      .then((res) => {
        setMovies(res);
        localStorage.setItem("moves", JSON.stringify(res));
        moviesSearch(searchText, checkbox);
        return;
      })
      .catch(() => {
        setMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        setTitleSelector("error-popup__union-title_error");
        handleErrorPopupOpen();
      });
    return;
  }

  function moviesSearch(searchText, checkbox) {
    localStorage.removeItem("filterMovies");
    setFilterMovies([]);
    let searchMovies = [];

    if (location === "/movies") {
      if(movies.length === 0) {
        searchMovies = JSON.parse(localStorage.getItem("moves"));
      } 
      if(movies.length > 0) {
        searchMovies = movies;
      }
    } else if (location === "/saved-movies") {
      searchMovies = savedMovies;
    }
    if (searchText) {
      const moviesPortion = searchMovies.filter((movie) =>
        JSON.stringify(movie.nameRU)
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
      if (moviesPortion.length === 0) {
        handleErrorPopupOpen();
        setTitleSelector("error-popup__union-title_message");
        return setMessage("Ничего не найдено");
      }
      if (checkbox) {
        if (location === "/movies") {
          const moviesPortionCheckbox = moviesPortion.filter(
            (movie) => movie.duration <= 40
          );
          setNewMovies(moviesPortionCheckbox);
          localStorage.setItem(
            "filterMovies",
            JSON.stringify(moviesPortionCheckbox)
          );
        } else if (location === "/saved-movies") {
          setNewSavedMovies(
            moviesPortion.filter((movie) => movie.duration <= 40)
          );
        }
      } else {
        if (location === "/movies") {
          setNewMovies(moviesPortion);
          localStorage.setItem("filterMovies", JSON.stringify(moviesPortion));
        } else if (location === "/saved-movies") {
          setNewSavedMovies(moviesPortion);
        }
      }
      setFilterMovies(moviesPortion);
      closeAllPopups();
    } else {
      setNewMovies([]);
      setNewSavedMovies([]);
    }
  }

  //запрос сохраненных карточек
  function getMoviesSave() {
    getSavedMove()
      .then((moviesSaved) => {
        setNewSavedMovies(moviesSaved);
        localStorage.setItem("savedMovies", JSON.stringify(moviesSaved));
      })
      .catch(() => {
        setNewSavedMovies([]);
      });
  }
  // сохранение фильма
  function onChangeSavedMovies(movie) {
    const savMovie = savedMovies.find(
      (movies) => movies.movieId === movie.movieId
    );
    const savNewMovie = newSavedMovies.find(
      (movies) => movies.movieId === movie.movieId
    );
    if (savMovie === undefined || savNewMovie === undefined) {
      savedMoves(
        movie.country,
        movie.director,
        movie.duration,
        movie.year,
        movie.description,
        movie.image,
        movie.trailerLink,
        movie.thumbnail,
        movie.movieId,
        movie.nameRU,
        movie.nameEN
      )
        .then((res) => {
          const moviesSaveted = newSavedMovies;
          moviesSaveted.push(res);
          setNewSavedMovies(moviesSaveted);
          setSavedMovies(moviesSaveted);
          localStorage.setItem("savedMovies", JSON.stringify(moviesSaveted));
        })
        .catch((err) => {
          setMessage(errorDetection(err));
          setTitleSelector("error-popup__union-title_error");
          handleErrorPopupOpen();
          console.log(err);
        });
    } else {
      setMessage(
        errorDetection("Данный фильм уже сохранен текущим пользователем")
      );
      setTitleSelector("error-popup__union-title_error");
      handleErrorPopupOpen();
    }
  }

  // удаление фильма
  function onChangeDeleteMovies(movie) {
    const deleteMovie = newSavedMovies.find(
      (movies) => movies.movieId === movie.id
    );
    deleteMoves(deleteMovie._id)
      .then(() => {
        const newMovies = newSavedMovies.filter(
          (movie) => movie._id !== deleteMovie._id
        );
        setNewSavedMovies(newMovies);
        localStorage.setItem("savedMovies", JSON.stringify(newMovies));
      })
      .catch((err) => {
        setMessage(errorDetection(err));
        setTitleSelector("error-popup__union-title_error");
        handleErrorPopupOpen();
        console.log(err);
      });
  }

  // удаление фильма из сохраненных
  function onChangeDeleteSavedMovies(_id) {
    deleteMoves(_id)
      .then(() => {
        const newMovies = newSavedMovies.filter((movie) => movie._id !== _id);
        setNewSavedMovies(newMovies);
        setSavedMovies(newMovies);
        localStorage.setItem("savedMovies", JSON.stringify(newMovies));
      })
      .catch((err) => {
        setMessage(errorDetection(err));
        setTitleSelector("error-popup__union-title_error");
        handleErrorPopupOpen();
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="body">
          <Header
            loggedIn={loggedIn}
            onHamburgerMenu={handleHamburgerMenuClick}
          />
          <Switch>
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
              onLoadingMovies={handleLoading}
              onCloseLoadingMovies={closeAllPopups}
              onLogin={onLogin}
              currentUser={currentUser}
              onLoading={handleLoading}
              onPopupClose={closeAllPopups}
              movies={newMovies}
              savedMovies={newSavedMovies}
              onSearchMovies={handleMoviesSearch}
              onSavedMovie={onChangeSavedMovies}
              onDeleteMovie={onChangeDeleteMovies}
              message={message}
              seachTextMovies={seachTextMovies}
              checboxMovies={checboxMovies}
              filterMovies={filterMovies}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              currentUser={currentUser}
              onLoading={handleLoading}
              onPopupClose={closeAllPopups}
              movies={newSavedMovies}
              onDeleteMovie={onChangeDeleteSavedMovies}
              onSavedMovie={onChangeSavedMovies}
              onSearchMovies={handleMoviesSearch}
              message={message}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onExit={onSignOut}
              currentUser={currentUser}
              onEditProfile={handleEditProfile}
              onLoading={handleLoading}
              onPopupClose={closeAllPopups}
            />
            <Route path="/sign-up">
              <Register onReg={handleReg} message={message} />
            </Route>
            <Route path="/sign-in">
              <Login onAuth={handleAuth} message={message} />
            </Route>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="*">
              <Redirect to="/404" />
              <NotFoundPages />
            </Route>
          </Switch>
          <Footer />
        </div>
        <Preloader isOpen={isPreloaderPopupOpen} nClose={closeAllPopups} />
        <HamburgerMenu isOpen={isHamburgerMenuOpen} onClose={closeAllPopups} />
        <ErrorPopup
          titleSelector={titleSelector}
          isOpen={isErrorPopupOpen}
          onClose={closeAllPopups}
          title={message}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
