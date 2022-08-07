import React from 'react';

function Movies() {
  return (
    <section className='moves'>
      <form className='search-form'>
        <input type='text' className='search-form__text'></input>
        <button className='search-form__enter' />
        <div className='search-form__switch'>
          <input type='radio' value='off' checked className='search-form__radio-button' />
          <input type='radio' value='on' className='search-form__radio-button search-form__radio-button_on' />
          <label className='search-form__label'>Короткометражки</label>
        </div>
      </form>
      <div className='movies-card-list'>
        <article className='movies-card'>
          <div className='movies-card__info'>
            <h3 className='movies-card__title'>33 слова о дизайне</h3>
            <p className='movies-card__duration'>1ч 47м</p>
          </div>
          <button
            type='button'
            aria-label='Кнопка сохранеиня фильма'
            className='movies-card__saved'
          />
          <img src='#' alt='' className='movies-card__image' />
        </article>
      </div>
      <div className='show-more'>
        <button>Ещё</button>
      </div>
    </section>
  );
}

export default Movies;
