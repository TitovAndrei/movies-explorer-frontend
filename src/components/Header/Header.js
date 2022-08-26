import React, { useState } from "react";
import { NavLink, withRouter, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header(props) {
  const location = useLocation();
  const [isActiveSavedMovies, setIsActiveSavedMovies] = useState(false);
  const [isActiveMovies, setIsActiveMovies] = useState(false);

  function savedMoviesClick() {
    setIsActiveSavedMovies(true);
    setIsActiveMovies(false);
  }

  function moviesClick() {
    setIsActiveSavedMovies(false);
    setIsActiveMovies(true);
  }

  function profileClick() {
    setIsActiveSavedMovies(false);
    setIsActiveMovies(false);
  }

  function handleHamburgerMenuChange(evt) {
    props.onHamburgerMenu();
  }

  return (
    <>
      {location.pathname === "/404" ? (
        <></>
      ) : (
        <header className="header">
          <NavLink to="/" className="header__logo-link">
            <img src={logo} alt="Лого" className="header__logo" />
          </NavLink>
          {props.loggedIn ? (
            <nav className="navigation">
              <div className="navigation__links">
                <NavLink
                  to="/movies"
                  className={`${
                    isActiveMovies
                      ? "navigation__link navigation__link_bold"
                      : "navigation__link"
                  }`}
                  onClick={moviesClick}
                >
                  Фильмы
                </NavLink>
                <NavLink
                  to="/saved-movies"
                  className={`${
                    isActiveSavedMovies
                      ? "navigation__link navigation__link_bold"
                      : "navigation__link"
                  }`}
                  onClick={savedMoviesClick}
                >
                  Сохранённые фильмы
                </NavLink>
              </div>
              <NavLink
                to="/profile"
                className="navigation__link navigation__link_silver"
                onClick={profileClick}
              >
                Аккаунт
              </NavLink>
              <button
                className="hamburger-menu_button"
                onClick={handleHamburgerMenuChange}
              />
            </nav>
          ) : (
            <div className="navigation navigation_default">
              <nav className="navigation__links">
                <NavLink
                  to="/sign-up"
                  className="navigation__link navigation__link_visible navigation__link_bold"
                >
                  Регистрация
                </NavLink>
                <NavLink
                  to="/sign-in"
                  className="navigation__link navigation__link_visible navigation__link_aktiv"
                >
                  Войти
                </NavLink>
              </nav>
            </div>
          )}
        </header>
      )}
    </>
  );
}

export default withRouter(Header);
