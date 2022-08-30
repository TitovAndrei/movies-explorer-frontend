import React, { useState, useEffect } from "react";
import MoviesCard from "../../components/MoviesCard/MoviesCard.js";
import searchIcon from "../../images/icon__COLOR_icon-color.svg";
import useWindowsWidth from "../../hooks/WindowsWidth.js";
import { useLocation } from "react-router-dom";

function Movies(props) {
  const width = useWindowsWidth();
  const [newMovies, setNewMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [startPortionMovies, setStartPortionMovies] = useState(0);
  const [newPortionMovies, setNewPortionMovies] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [errorsSearchText, setErrorsSearchText] = React.useState("");
  const [isValidText, setIsValidText] = useState(false);
  const [isButtonActiv, setIsButtonActiv] = useState(false);
  const location = useLocation().pathname;

  // первоначальная загрузка массива фильмов
  useEffect(() => {
    setNewMovies(props.filterMovies);
    rendererMovieArr();
  }, []);

  useEffect(() => {
    setNewMovies(props.filterMovies);
    rendererMovieArr();
  }, [location]);

  const rendererMovieArr = () => {
    
    setSearchText(props.seachTextMovies);
    if (props.checboxMovies) {
      document.getElementById("checkboxSearch").checked = true;
      setCheckbox(true);
      moviesSearch(props.seachTextMovies, props.checboxMovies);
    } else if (!props.checboxMovies) {
      document.getElementById("checkboxSearch").checked = false;
      setCheckbox(false);
      moviesSearch(props.seachTextMovies, props.checboxMovies);
    }

    if (width <= 767) {
      setStartPortionMovies(1);
    } else if (width <= 1160) {
      setStartPortionMovies(2);
    } else {
      setStartPortionMovies(3);
    }
  };

  // изменяем состояние переменных в зависимости от ширины экрана
  useEffect(() => {
    if (width <= 767) {
      setNewPortionMovies(1);
    } else if (width <= 1160) {
      if (newMovies.length % 2 === 0) {
        setNewPortionMovies(2);
      } else {
        setNewPortionMovies(1);
      }
    } else {
      if (newMovies.length % 3 === 0) {
        setNewPortionMovies(3);
      } else if (newMovies.length % 3 === 1) {
        setNewPortionMovies(2);
      } else {
        setNewPortionMovies(1);
      }
    }
  }, [width, newMovies]);

  // отслеживаю состояние кнопки
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
    moviesSearch(searchText, !checkbox);
    localStorage.setItem("checbox", !checkbox);
  }

  // отслеживаем состояние строки поиска
  function handleSearchTextChandge(evt) {
    const target = evt.target;
    setSearchText(target.value);
    localStorage.setItem("textSearch", target.value);
    if (target.value === "") {
      setErrorsSearchText("Нужно ввести ключевое слово");
      setIsValidText(false);
    } else if (target.value !== "" || searchText) {
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
    localStorage.removeItem("filterMovies");
    props.onSearchMovies(searchText, checkbox);
  }

  function moviesSearch(searchText, checkbox) {
    localStorage.removeItem("filterMovies");
    props.onSearchMovies(searchText, checkbox);
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
    setNewMovies(props.movies.slice(0, newMovies.length + newPortionMovies));
  }

  // определяем селектор кнопи
  const showMoreButtonClassName = `show-more ${
    showMore ? "show-more_disabled" : ""
  }`;

  // определяем кончился ли массив с карточками для отключения кнопки еще
  useEffect(() => {
    if (width <= 767) {
      setStartPortionMovies(1);
    } else if (width <= 1160) {
      setStartPortionMovies(2);
    } else {
      setStartPortionMovies(3);
    }

    if (newMovies.length !== props.movies.length) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
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
              maxLength="40"
              value={searchText || ""}
              onChange={handleSearchTextChandge}
            />
            <span className="search-form__field-error">{errorsSearchText}</span>
          </label>
          <button
            type="submit"
            aria-label="Кнопка запуска фильтрации"
            className="search-form__enter"
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
        {newMovies.map((movie, id) => (
          <MoviesCard
            key={movie.id}
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
