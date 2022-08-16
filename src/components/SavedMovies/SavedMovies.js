import React from 'react';
import MoviesCard from "../../components/MoviesCard/MoviesCard.js";
import { savedMovies } from "../../utils/constants.js";
import searchIcon from "../../images/icon__COLOR_icon-color.svg";

export default function SavedMovies() {
  return (
    <section className="moves">
    <form className="search-form">
      <div className="search-form__input">
        <img
          src={searchIcon}
          alt="Иконка поиска"
          className="search-form__icon"
        />
        <input type="text" className="search-form__text"></input>
        <button className="search-form__enter" />
      </div>
      <div className="search-form__switch">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round" />
        </label>
        <p className="search-form__span">Короткометражки</p>
      </div>
    </form>
    <div className="movies__line" />
    <div className="movies-card-list">
      {savedMovies.map((movie, id) => (
        <MoviesCard
          key={id}
          duration={movie.duration}
          thumbnail={movie.thumbnail}
          nameRU={movie.nameRU}
          card={movie}
          cardButtonClassName='movies-card__delete'
          cardButtonArialabel='Кнопка удаления карточки'
        />
      ))}
    </div>
  </section>
  );
}
