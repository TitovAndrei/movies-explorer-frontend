import React from "react";
import { NavLink, withRouter } from "react-router-dom";

function HamburgerMenu(props) {
  return (
    <div className={`hamburger-menu ${props.isOpen ? `hamburger-menu_opened` : ""}`}>
      <div className="hamburger-menu__content">
        <button className="hamburger-menu__close" type="button"
          aria-label="Кнопка закрытия формы" onClick={props.onClose}/>
        <div className="hamburger-menu__links">
        <NavLink
            to="/"
            className="hamburger-menu__link"
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="hamburger-menu__link hamburger-menu__link_activ"
          >
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="hamburger-menu__link">
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink
          to="/profile"
          className="hamburger-menu__link hamburger-menu__link_silver"
        >
          Аккаунт
        </NavLink>
      </div>
    </div>
  );
}

export default withRouter(HamburgerMenu);