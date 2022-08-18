import React from "react";
import MoviesCard from "../../components/MoviesCard/MoviesCard.js";
import { movies } from "../../utils/constants.js";
import searchIcon from "../../images/icon__COLOR_icon-color.svg";

function Movies(props) {
  const [newMovies, setNewMovies] = React.useState(
    window.screen.width <= 800 ? movies.slice(0, 8) : movies.slice(0, 12)
  );

  function handleMoviesChandge(evt) {
    const newMovies = movies.slice(0, 15);
    setNewMovies(newMovies);
    props.onLoadingMovies();
  }

  return (
    <section className="moves">
      <form className="search-form">
        <div className="search-form__input">
          <img
            src={searchIcon}
            alt="Иконка поиска"
            className="search-form__icon"
          />
          <input
            type="text"
            className="search-form__text"
            placeholder="Фильм"
            required
            minLength="2"
            maxLength="40"
          ></input>
          <button
            type="submit"
            aria-label="Кнопка запуска фильтрации"
            className="search-form__enter"
          />
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
        {newMovies.map((movie, id) => (
          <MoviesCard
            key={id}
            duration={movie.duration}
            thumbnail={movie.thumbnail}
            nameRU={movie.nameRU}
            card={movie}
            cardButtonClassName="movies-card__saved"
            cardButtonArialabel="Кнопка сохранения карточки"
          />
        ))}
      </div>
      <button className="show-more" onClick={handleMoviesChandge}>
        Ещё
      </button>
    </section>
  );
}

export default Movies;
