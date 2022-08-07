import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage({ formName, title, buttomClass, buttomText, children, onSubmit }) {
  return (
    <div className='login-page'>
      <img src='' className='login-page__logo'/>
      <h2 className='login-page__title'>{title}</h2>
      <form name={formName} className='login-page__form' onSubmit={onSubmit}>
        {children}
        <button name='submit-button'
          className={`login-page__submit-button login-page__submit-button_${buttomClass}`} type='submit'
          aria-label='Кнопка сохранения формы' >{buttomText}</button>
      </form>
      {
        formName === 'register' ?
        <>
        <p className='login-page__text'>Уже зарегистрированы?</p>
        <Link className='login-page__question' to='/sign-in'>Войти</Link>
        </>
        :
        <>
        <p className='login-page__text'>Ещё не зарегистрированы?</p>
        <Link className='login-page__question' to='/sign-up'>Регистрация</Link>
        </>
      }
    </div >
  )
}
