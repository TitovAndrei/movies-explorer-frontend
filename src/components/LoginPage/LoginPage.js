import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function LoginPage({ formName, title, buttomClass, buttomText, children, onSubmit }) {
  function buttonClick() {
    window.location.href = '/movies';
  }

  return (
    <div className='login-page'>
      <img src={logo} alt='Логотип' className='login-page__logo'/>
      <h2 className='login-page__title'>{title}</h2>
      <form name={formName} className='login-page__form' onSubmit={onSubmit}>
        {children}
        <button name='submit-button'
          className={`login-page__submit-button ${buttomClass}`} type='submit'
          aria-label='Кнопка сохранения формы' onClick={buttonClick} onSubmit={onSubmit}>{buttomText}</button>
      </form>
      {
        formName === 'register' ?
        <div className='login-page__basement'>
        <p className='login-page__text'>Уже зарегистрированы?</p>
        <Link className='login-page__question' to='/sign-in'>Войти</Link>
        </div>
        :
        <div className='login-page__basement'>
        <p className='login-page__text'>Ещё не зарегистрированы?</p>
        <Link className='login-page__question' to='/sign-up'>Регистрация</Link>
        </div>
      }
    </div >
  )
}
