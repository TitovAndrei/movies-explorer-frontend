import React from "react";

export default function MoviesCard(props) {
  const [cardLike, setCardLike] = React.useState('');
  
  function handleSaveClick() {
      setCardLike('movies-card__saved_actived');
  }

  return (
    <article className="movies-card">
      <div className="movies-card__info">
        <div className="movies-card__content">
          <h3 className="movies-card__title">{props.nameRU}</h3>
          <p className="movies-card__duration">{props.duration}</p>
        </div>
        <button
          type="button"
          aria-label={props.cardButtonArialabel}
          className={`${props.cardButtonClassName} ${cardLike}`}
          onClick={handleSaveClick}
        />
      </div>
      <img src={props.thumbnail} alt="" className="movies-card__image" />
    </article>
  );
}
