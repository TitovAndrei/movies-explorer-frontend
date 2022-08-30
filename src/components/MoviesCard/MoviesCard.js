import React, { useEffect } from "react";

export default function MoviesCard(props) {
  const [movieSaved, setMovieSaved] = React.useState(false);

  // определяю иконку лайка и удаления карточки
  useEffect(() => {
    cardLikeButtonClassName();
  }, [movieSaved]);

  function cardLikeButtonClassName() {
    if (props.savedStatus) {
      return "movies-card__saved movies-card__saved_actived";
    }
    if (props.buttonDelMovie) {
      return "movies-card__delete";
    }
    if (movieSaved) {
      return "movies-card__saved movies-card__saved_actived";
    } else {
      return "movies-card__saved";
    }
  }

  function handleMovieSaved() {
      if (movieSaved) {
        setMovieSaved(false);
        props.onDeleteMovie(props.movie);
      }
      if (props.buttonDelMovie) {
        props.onDeleteMovie(props.movie._id);
      }
      if (!movieSaved && !props.buttonDelMovie) {
        setMovieSaved(true);
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

  // редирект на трейлер по клику на изображение
  function watchTrailer() {
    window.open(props.trailerLink);
  }

  // отрbсовка времени фильма
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
        <button
          type="button"
          aria-label={props.cardButtonArialabel}
          className={cardLikeButtonClassName()}
          onClick={handleMovieSaved}
        />
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
