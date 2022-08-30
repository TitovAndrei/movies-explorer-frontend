import React, { useState, useEffect } from "react";
import MoviesCard from "../../components/MoviesCard/MoviesCard.js";
import searchIcon from "../../images/icon__COLOR_icon-color.svg";

export default function SavedMovies(props) {
  
  const [searchText, setSearchText] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [errorsSearchText, setErrorsSearchText] = React.useState("");
  const [isValidText, setIsValidText] = useState(false);
  const [isButtonActiv, setIsButtonActiv] = useState(false);

  useEffect(() => {
    if (isValidText) {
      setIsButtonActiv(true);
    } else {
      setIsButtonActiv(false);
    }
  }, [isValidText]);

  // отслеживаем состояние чекбокса
  function checkboxClick() {
    if (checkbox) {
      setCheckbox(false);
    } else {
      setCheckbox(true);
    }
  }

  // отслеживаем состояние строки поиска
  function handleSearchTextChandge(evt) {
    const target = evt.target;
    setSearchText(target.value);
    if(target.value === ""){
      setErrorsSearchText("Нужно ввести ключевое слово");
      setIsValidText(false);
    } else if (target.value !== "") {
      setErrorsSearchText(target.validationMessage);
      if (!target.validationMessage) {
        setIsValidText(true);
      } else {
        setIsValidText(false);
      }
    }
  }

  // запускаем поиск фильмов
  function handleMoviesSearch(e) {
    e.preventDefault();
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
              required
              minLength="2"
              maxLength="40"
              value={searchText || ""}
              onChange={handleSearchTextChandge}
            />
            <span className="search-form__field-error">
            { errorsSearchText }
            </span>
          </label>
          <button
            className="search-form__enter"
            type="submit"
            aria-label="Кнопка запуска фильтрации"
            disabled={!isButtonActiv ? true : ""}
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
