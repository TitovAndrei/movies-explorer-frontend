import React, { useState } from "react";
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

import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Main from "../Main/Main.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPreloaderPopupOpen, setIsPreloaderPopupOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  function handleHamburgerMenuClick() {
    setIsHamburgerMenuOpen(true);
  }

  function handleLoadingMoviesClick() {
    setIsPreloaderPopupOpen(true);
  }

  function closeAllPopups() {
    setIsPreloaderPopupOpen(false);
    setIsHamburgerMenuOpen(false);
  }

  const isOpen = isPreloaderPopupOpen || isHamburgerMenuOpen;

  React.useEffect(() => {
    function handlePopupClose(evt) {
      if (evt.key === "Escape" || evt.target.classList.contains("preloader")) {
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="body">
          <Header onHamburgerMenu={handleHamburgerMenuClick} />
          <Switch>
            <ProtectedRoute
              exact
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
              onLoadingMovies={handleLoadingMoviesClick}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={Movies}
            />
            <ProtectedRoute
              exact
              path="/profile"
              loggedIn={loggedIn}
              component={Movies}
            />
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login />
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
        <Preloader isOpen={isPreloaderPopupOpen} />
        <HamburgerMenu isOpen={isHamburgerMenuOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
