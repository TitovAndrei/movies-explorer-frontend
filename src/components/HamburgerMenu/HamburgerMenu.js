import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

function HamburgerMenu(props) {
  const [isActiveSavedMovies, setIsActiveSavedMovies] = useState(false);
  const [isActiveMovies, setIsActiveMovies] = useState(false);
  const [isActiveHomePage, setIsActiveHomePage] = useState(false);

  function savedMoviesClick() {
    setIsActiveSavedMovies(true);
    setIsActiveMovies(false);
    setIsActiveHomePage(false);
    props.onClose();
  }

  function moviesClick() {
    setIsActiveSavedMovies(false);
    setIsActiveMovies(true);
    setIsActiveHomePage(false);
    props.onClose();
  }

  function homePageClick() {
    setIsActiveSavedMovies(false);
    setIsActiveMovies(false);
    setIsActiveHomePage(true);
    props.onClose();
  }

  function profileClick() {
    setIsActiveSavedMovies(false);
    setIsActiveMovies(false);
    setIsActiveHomePage(false);
    props.onClose();
  }

  return (
    <div
      className={`hamburger-menu ${
        props.isOpen ? `hamburger-menu_opened` : ""
      }`}
    >
      <div className="hamburger-menu__content">
        <button
          className="hamburger-menu__close"
          type="button"
          aria-label="Кнопка закрытия формы"
          onClick={props.onClose}
        />
        <div className="hamburger-menu__links">
          <NavLink
            to="/"
            className={`${
              isActiveHomePage
                ? "hamburger-menu__link hamburger-menu__link_activ"
                : "hamburger-menu__link"
            }`}
            onClick={homePageClick}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className={`${
              isActiveMovies
                ? "hamburger-menu__link hamburger-menu__link_activ"
                : "hamburger-menu__link"
            }`}
            onClick={moviesClick}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={`${
              isActiveSavedMovies
                ? "hamburger-menu__link hamburger-menu__link_activ"
                : "hamburger-menu__link"
            }`}
            onClick={savedMoviesClick}
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink
          to="/profile"
          className="hamburger-menu__link hamburger-menu__link_silver"
          onClick={profileClick}
        >
          Аккаунт
        </NavLink>
      </div>
    </div>
  );
}

export default withRouter(HamburgerMenu);
