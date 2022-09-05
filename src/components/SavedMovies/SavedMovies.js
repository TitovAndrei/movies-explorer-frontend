import React, { useState } from "react";
import MoviesCard from "../../components/MoviesCard/MoviesCard.js";
import searchIcon from "../../images/icon__COLOR_icon-color.svg";

export default function SavedMovies(props) {
  const [searchText, setSearchText] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [errorsSearchText, setErrorsSearchText] = React.useState("");

  // отслеживаем состояние чекбокса
  function checkboxClick() {
    if (checkbox) {
      setCheckbox(false);
    } else {
      setCheckbox(true);
    }
    moviesSearch(searchText, !checkbox);
  }

  // отслеживаем состояние строки поиска
  function handleSearchTextChandge(evt) {
    setSearchText(evt.target.value);
  }

  // запускаем поиск фильмов
  function handleMoviesSearch(e) {
    e.preventDefault();
    if (searchText === "") {
      setErrorsSearchText("Нужно ввести ключевое слово");
    } else {
      setErrorsSearchText("");
      props.onSearchMovies(searchText, checkbox);
    }
  }

  function moviesSearch(searchText, checkbox) {
    setErrorsSearchText("");
    props.onSearchMovies(searchText, checkbox);
}

  return (
    <section className="moves">
      <form className="search-form" onSubmit={handleMoviesSearch}>
        <div className="search-form__input">
          <img
            src={searchIcon}
            alt="Иконка поиска"
            className="search-form__icon"
          />
          <label className="search-form__input-box">
            <input
              type="text"
              className="search-form__text"
              placeholder="Фильм"
              maxLength="40"
              value={searchText || ""}
              onChange={handleSearchTextChandge}
            />
            <span className="search-form__field-error">{errorsSearchText}</span>
          </label>
          <button
            className="search-form__enter"
            type="submit"
            aria-label="Кнопка запуска фильтрации"
          />
        </div>
        <div className="search-form__switch">
          <label className="switch">
            <input
              type="checkbox"
              id="checkboxSearch"
              onChange={checkboxClick}
            />
            <span className="slider round" />
          </label>
          <p className="search-form__span">Короткометражки</p>
        </div>
      </form>
      <div className="movies__line" />
      <div className="movies-card-list">
        {props.movies.map((movie, id) => (
          <MoviesCard
            key={movie.movieId}
            duration={movie.duration}
            thumbnail={movie.thumbnail}
            nameRU={movie.nameRU}
            movie={movie}
            imageSrc={movie.image}
            onDeleteMovie={props.onDeleteMovie}
            currentUser={props.currentUser}
            buttonDelMovie={true}
            onSavedMovie={props.onSavedMovie}
            cardButtonArialabel="Кнопка удаления карточки"
          />
        ))}
      </div>
    </section>
  );
}
