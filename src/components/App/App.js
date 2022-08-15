import React from "react";
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

import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Main from "../Main/Main.js";

function App() {
  const [isPreloaderPopupOpen, setIsPreloaderPopupOpen] = React.useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = React.useState(false);

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
    <div className="App">
      <div className="body">
        <Header onHamburgerMenu={handleHamburgerMenuClick}/>
        <Switch>
          <Route path="/movies">
            <Movies onLoadingMovies={handleLoadingMoviesClick} />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
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
      <HamburgerMenu 
      isOpen={isHamburgerMenuOpen}
      onClose={closeAllPopups}/>
    </div>
  );
}

export default withRouter(App);
