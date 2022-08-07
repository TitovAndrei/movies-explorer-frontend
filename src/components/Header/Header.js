import React from "react";
import { NavLink, withRouter, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/sign-up" || location.pathname === "/sign-in" ? (
        <></>
      ) : (
        <header className="header">
          <img src="" alt="Лого" className="header__logo" />
          {location.pathname === "/movies" ||
          location.pathname === "/saved-movies" ? (
            <div className="navigation">
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
              <NavLink to="/profile" className="navigation__link">
                Аккаунт
              </NavLink>
            </div>
          ) : (
            <div className="navigation">
              <NavLink to="/sign-up" className="navigation__link">
                Регистрация
              </NavLink>
              <NavLink
                to="/sign-in"
                className="navigation__link navigation__link_aktiv"
              >
                Войти
              </NavLink>
            </div>
          )}
        </header>
      )}
    </>
  );
}

export default withRouter(Header);
