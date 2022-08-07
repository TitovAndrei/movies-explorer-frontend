import React from 'react';
import { NavLink } from 'react-router-dom';

function Profile() {
  return (
    <>
      <section className='profile'>
        <p className='profile__title'>Привет, Андрей!</p>
        <div className='profile__name'>
          <p className='profile__field-name'>Имя</p>
          <p className='profile__meaning'>Андрей</p>
        </div>
        <div className='profile__mail'>
          <p className='profile__field-name'>E-mail</p>
          <p className='profile__meaning'>pochta@yandex.ru</p>
        </div>
        <button className='profile__button-edit'>Редактировать</button>
        <NavLink to='/' className='profile__exit'>Выйти из аккаунта</NavLink>
      </section>
      <div className='profile__edit'>
        <p className='profile__form-title'>Введите Имя и Email</p>
        <form className='profile__form'>
          <label className='profile__input'>
            <input 
              type='text'
              name='name'
              value=''
              placeholder='Имя'
              className='profile__field'
              required
              minLength='2'
              maxLength='40'
            />
            <span className='profile__field-error'></span>
          </label>
          <label className='profile__input'>
            <input
              type='email'
              name='email'
              autoComplete='on'
              value=''
              placeholder='Email'
              className='profile__field'
              required
              minLength='2'
              maxLength='40'
            />
            <span className='profile__field-error'></span>
          </label>
          <button name='profile-submit-button'
          className='profile__submit-button' type='submit'
          aria-label='Кнопка сохранения формы' >Сохранить</button>
        </form>
      </div>
    </>
  );
}

export default (Profile);