import React from "react";
import { NavLink, withRouter, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header(props) {
  const location = useLocation();

  function handleHamburgerMenuChange(evt) {
    props.onHamburgerMenu();
  }

  return (
    <>
      {location.pathname === "/sign-up" ||
      location.pathname === "/sign-in" ||
      location.pathname === "/404" ? (
        <></>
      ) : (
        <header className="header">
          <NavLink to="/" className="header__logo-link">
            <img src={logo} alt="Лого" className="header__logo" />
          </NavLink>
          {location.pathname === "/movies" ||
          location.pathname === "/saved-movies" ||
          location.pathname === "/profile" ? (
            <nav className="navigation">
              {location.pathname === "/saved-movies" ? (
                <div className="navigation__links">
                  <NavLink to="/movies" className="navigation__link">
                    Фильмы
                  </NavLink>
                  <NavLink
                    to="/saved-movies"
                    className="navigation__link navigation__link_bold"
                  >
                    Сохранённые фильмы
                  </NavLink>
                </div>
              ) : (
                <div className="navigation__links">
                  <NavLink
                    to="/movies"
                    className="navigation__link navigation__link_bold"
                  >
                    Фильмы
                  </NavLink>
                  <NavLink to="/saved-movies" className="navigation__link">
                    Сохранённые фильмы
                  </NavLink>
                </div>
              )}
              <NavLink
                to="/profile"
                className="navigation__link navigation__link_silver"
              >
                Аккаунт
              </NavLink>
              <button className="hamburger-menu_button" onClick={handleHamburgerMenuChange}/>
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
