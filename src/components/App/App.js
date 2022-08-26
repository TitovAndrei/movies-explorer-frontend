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
import { movies, savedMovies } from "../../utils/constants.js";

function App() {
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
  const [seachTextMovies, setSeachTextMovies] = useState("");
  const [checboxMovies, setChecboxMovies] = useState(false);
  const [seachTextMoviesSaved, setSeachTextMoviesSaved] = useState("");
  const [checboxMoviesSaved, setChecboxMoviesSaved] = useState(false);
  const [titleSelector, setTitleSelector] = useState("");

  // эфекты при загрузке страницы
  useEffect(() => {
    getMovies()
      .then((res) => {
        if (res) {
          localStorage.setItem("moves", JSON.stringify(res));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getMoviesSave();
    onLogin();
  }, []);

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
  const isOpen = isPreloaderPopupOpen || isHamburgerMenuOpen;

  React.useEffect(() => {
    function handlePopupClose(evt) {
      if (
        evt.key === "Escape" ||
        evt.target.classList.contains("preloader") ||
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
          setCurrentUser(res);
          setLoggedIn(true);
          history.push("/movies");
        })
        .catch((err) => console.log(err));
    }
  }

  // выход из прифиля
  function onSignOut(e) {
    e.preventDefault();
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  }

  // регистрация
  function handleReg(name, email, password) {
    setMessage("");
    handleLoading();
    setRegistration(name, email, password)
      .then((newUserInfo) => {
        console.log(newUserInfo);
        handleAuth(email, password);
        closeAllPopups();
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
    handleLoading();
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
            onLogin();
            history.push("/movies");
            closeAllPopups();
          });
      })
      .catch((err) => {
        closeAllPopups();
        setMessage(err);
        console.log(err);
      });
  }

  // редактирование профиля
  function handleEditProfile(email, name) {
    handleLoading();
    setProfileInformation(email, name)
      .then((newUserInfo) => {
        closeAllPopups();
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
  function handleMoviesSearch(textSearch, checbox) {
    setMessage("");

    let moviesPortion;
    let searchMovies;

    if (textSearch === "  ") {
      handleErrorPopupOpen();
      setTitleSelector("error-popup__union-title_error");
      return setMessage("Нужно ввести ключевое слово");
    }

    if (location === "/movies") {
      searchMovies = movies;
      setSeachTextMovies(textSearch);
      setChecboxMovies(checbox);
    } else if (location === "/saved-movies") {
      searchMovies = savedMovies;
      setSeachTextMoviesSaved(textSearch);
      setChecboxMoviesSaved(checbox);
    }
    if (textSearch.length > 0) {
      moviesPortion = searchMovies.filter((movie) =>
        JSON.stringify(movie.nameRU)
          .toLowerCase()
          .includes(textSearch.toLowerCase())
      );
      if (moviesPortion.length === 0) {
        handleErrorPopupOpen();
        setTitleSelector("error-popup__union-title_message");
        return setMessage("Ничего не найдено");
      }
      if (checbox) {
        if (location === "/movies") {
          setNewMovies(moviesPortion.filter((movie) => movie.duration <= 40));
        } else if (location === "/saved-movies") {
          setNewSavedMovies(
            moviesPortion.filter((movie) => movie.duration <= 40)
          );
        }
      } else {
        if (location === "/movies") {
          setNewMovies(moviesPortion);
        } else if (location === "/saved-movies") {
          setNewSavedMovies(moviesPortion);
        }
      }
    } else {
      setNewMovies([]);
      getMoviesSave();
    }
  }

  //запрос сохраненных карточек
  function getMoviesSave() {
    getSavedMove()
      .then((movies) => {
        localStorage.setItem("savedMovies", JSON.stringify(movies));
        setNewSavedMovies(movies);
        movies.forEach((movie) => {
          const newMovie = movies.find((i) => i.id === movie.movieId);
          if (newMovie !== undefined) {
            newMovie.saved = true;
            setNewMovies(
              movies.map((i) => (i.id === movie.movieId ? newMovie : i))
            );
          }
        });
      })
      .catch((err) => {
        setNewSavedMovies([]);
        console.log(err);
      });
  }

  // сохранение фильма
  function onChangeSavedMovies(movie) {
    savedMoves(
      movie.country,
      movie.director,
      movie.duration,
      movie.year,
      movie.description,
      movie.image,
      movie.trailerLink,
      movie.thumbnail,
      movie.owner,
      movie.movieId,
      movie.nameRU,
      movie.nameEN
    )
      .then(() => {
        getMoviesSave();
      })
      .catch((err) => {
        setMessage(errorDetection(err));
        setTitleSelector("error-popup__union-title_error");
        handleErrorPopupOpen();
        console.log(err);
      });
  }

  // удаление фильма
  function onChangeDeleteMovies(movieId) {
    console.log(movieId);
    deleteMoves(movieId)
      .then(() => {
        getMoviesSave();
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
              seachTextMovies={seachTextMovies}
              checboxMovies={checboxMovies}
              message={message}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              currentUser={currentUser}
              onLoading={handleLoading}
              onPopupClose={closeAllPopups}
              movies={newSavedMovies}
              onDeleteMovie={onChangeDeleteMovies}
              onSavedMovie={onChangeSavedMovies}
              onSearchMovies={handleMoviesSearch}
              seachTextMoviesSaved={seachTextMoviesSaved}
              checboxMoviesSaved={checboxMoviesSaved}
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
        {/* Тестово прелоудер пока закрываю клавишей esc */}
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
