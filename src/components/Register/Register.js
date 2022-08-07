import React from 'react';
import LoginPage from '../LoginPage/LoginPage.js';

export default function Register() {
  return (
    <LoginPage
      formName='register'
      title='Регистрация'
      buttomClass='register'
      buttomText='Зарегистрироваться'
    >
      <label className='login-page__input'>
        <input
          type='text'
          name='name'
          value=''
          placeholder='Имя'
          className='login-page__field'
          required
          minLength='2'
          maxLength='40'
        />
        <span className='login-page__field-error'></span>
      </label>
      <label className='login-page__input'>
        <input
          type='email'
          name='email'
          autoComplete='on'
          value=''
          placeholder='Email'
          className='login-page__field'
          required
          minLength='2'
          maxLength='40'
        />
        <span className='login-page__field-error'></span>
      </label>
      <label className='login-page__input'>
        <input
          type='password'
          name='password'
          autoComplete='new-password'
          value=''
          placeholder='Пароль'
          className='login-page__field'
          required
          minLength='2'
          maxLength='200'
        />
        <span className='login-page__field-error'></span>
      </label>
    </LoginPage>
  );
}
