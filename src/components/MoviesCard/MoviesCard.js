import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard(props) {
  const location = useLocation().pathname;

  // определяю иконку лайка или удаления карточки
  function cardLikeButtonClassName() {
    if (props.savedStatus) {
      return "movies-card__saved movies-card__saved_actived";
    } else {
      return "movies-card__saved";
    }
  }

  function handleMovieSaved() {
    if (props.savedStatus) {
      props.onDeleteMovie(props.movie);
    }
    if (!props.savedStatus) {
      const savedMovies = {
        country: props.movie.country,
        director: props.movie.director,
        duration: props.duration,
        year: props.movie.year,
        description: props.movie.description,
        image: `https://api.nomoreparties.co${props.movie.image.url}`,
        trailerLink: props.trailerLink,
        thumbnail: `https://api.nomoreparties.co${props.movie.image.url}`,
        movieId: props.movie.id,
        nameRU: props.nameRU,
        nameEN: props.movie.nameEN,
      };
      props.onSavedMovie(savedMovies);
    }
  }

  function handleMovieDelete() {
    props.onDeleteMovie(props.movie._id);
  }

  // редирект на трейлер по клику на изображение
  function watchTrailer() {
    window.open(props.trailerLink);
  }

  // отрисовка времени фильма
  function movieDuration() {
    const minutes = props.duration % 60;
    const hours = Math.floor(props.duration / 60);
    const transformationMinutes = (i) => {
      return i.toString().padStart(2, "0");
    };
    const transformationTime = (i) => {
      return i.toString().padStart(1, "0");
    };
    return `${transformationTime(hours)}ч ${transformationMinutes(minutes)}м`;
  }

  return (
    <article className="movies-card">
      <div className="movies-card__info">
        <div className="movies-card__content">
          <h3 className="movies-card__title">{props.nameRU}</h3>
          <p className="movies-card__duration">{movieDuration()}</p>
        </div>
        {location === "/movies" ? (
          <button
            type="button"
            aria-label={props.cardButtonArialabel}
            className={cardLikeButtonClassName()}
            onClick={handleMovieSaved}
          />
        ) : (
          <button
            type="button"
            aria-label={props.cardButtonArialabel}
            className="movies-card__delete"
            onClick={handleMovieDelete}
          />
        )}
      </div>
      <img
        src={props.imageSrc}
        alt={props.nameRU}
        className="movies-card__image"
        onClick={watchTrailer}
      />
    </article>
  );
}
