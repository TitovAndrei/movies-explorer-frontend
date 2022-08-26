import React, { useState, useEffect } from "react";
import MoviesCard from "../../components/MoviesCard/MoviesCard.js";
import searchIcon from "../../images/icon__COLOR_icon-color.svg";
import useWindowsWidth from "../../hooks/WindowsWidth.js";

function Movies(props) {
  const width = useWindowsWidth();
  const [newMovies, setNewMovies] = useState([]);

  // первоначальная загрузка массива фильмов
  useEffect(() => {
    setNewMovies(props.movies);
    setSearchText(props.seachTextMovies);
    setCheckbox(props.checboxMovies);
    if (props.checboxMovies === true) {
      document.getElementById("checkboxSearch").checked = true;
      setCheckbox(true);
      moviesSearch(props.seachTextMovies, props.checboxMovies);
    } else {
      document.getElementById("checkboxSearch").checked = false;
      setCheckbox(false);
      moviesSearch(props.seachTextMovies, props.checboxMovies);
    }
  }, []);

  const [searchText, setSearchText] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [startPortionMovies, setStartPortionMovies] = useState(0);
  const [newPortionMovies, setNewPortionMovies] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [errorsSearchText, setErrorsSearchText] = React.useState("");

  // изменяем состояние переменных в зависимости от ширины экрана
  useEffect(() => {
    if (width < 768) {
      setStartPortionMovies(1);
      setNewPortionMovies(1);
    } else if (width < 800) {
      setStartPortionMovies(2);
      setNewPortionMovies(2);
    } else {
      setStartPortionMovies(3);
      setNewPortionMovies(3);
    }
  }, [width]);

  // отслеживаем состояние чекбокса
  function checkboxClick() {
    if (checkbox) {
      setCheckbox(false);
    } else {
      setCheckbox(true);
    }
  }

  useEffect(() => {
    const text = searchText ? searchText : props.seachTextMovies;
    moviesSearch(text, checkbox);
  }, [checkbox]);

  // отслеживаем состояние строки поиска
  function handleSearchTextChandge(evt) {
    setSearchText(evt.target.value);
    setErrorsSearchText(evt.target.validationMessage);
  }

  // запускаем поиск фильмов
  function handleMoviesSearch(e) {
    e.preventDefault();
    props.onSearchMovies(searchText, checkbox);
  }

  function moviesSearch(seachText, checbox) {
    props.onSearchMovies(seachText, checbox);
  }

  // перерисовываем фильмы если изменился массив в промисе
  useEffect(() => {
    moviesRender();
  }, [props.movies]);

  // отрисовываем карточки фильмов
  function moviesRender() {
    setNewMovies(props.movies.slice(0, startPortionMovies));
    props.onCloseLoadingMovies();
  }

  //добавляем новую порцию по кнопке еще
  function newPortionMoviesRender() {
    setNewMovies(props.movies.slice(0, startPortionMovies + newPortionMovies));
    setStartPortionMovies(startPortionMovies + newPortionMovies);
  }

  // определяем селектор кнопи
  const showMoreButtonClassName = `show-more ${
    showMore ? "show-more_disabled" : ""
  }`;

  // определяем кончился ли массив с карточками для отключения кнопки еще
  useEffect(() => {
    if (newMovies.length !== props.movies.length) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
    localStorage.setItem("filteredMovies", JSON.stringify(newMovies));
  }, [newMovies]);

  //запрос сохраненных карточек
  function getSavedMovies(movie) {
    const newSavedMovies = props.savedMovies.find(
      (oneSavedMovie) => oneSavedMovie.movieId === movie.id
    );
    if (newSavedMovies !== undefined) {
      return true;
    }
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
              value={searchText || props.seachTextMovies}
              onChange={handleSearchTextChandge}
            />
            <span className="search-form__field-error">
              {props.message || errorsSearchText}
            </span>
          </label>
          <button
            type="submit"
            aria-label="Кнопка запуска фильтрации"
            className="search-form__enter"
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
        {newMovies.map((movie, id) => (
          <MoviesCard
            key={id}
            duration={movie.duration}
            nameRU={movie.nameRU}
            trailerLink={movie.trailerLink}
            movie={movie}
            imageSrc={`https://api.nomoreparties.co${movie.image.url}`}
            buttonDelMovie={false}
            cardButtonArialabel="Кнопка сохранения карточки"
            currentUser={props.currentUser}
            onSavedMovie={props.onSavedMovie}
            onDeleteMovie={props.onDeleteMovie}
            savedStatus={getSavedMovies(movie)}
          />
        ))}
      </div>
      <button
        className={showMoreButtonClassName}
        onClick={newPortionMoviesRender}
      >
        Ещё
      </button>
    </section>
  );
}

export default Movies;
