import React from 'react';
import LoginPage from '../LoginPage/LoginPage.js';

function Login() {
  return (
    <LoginPage
      formName='authorization'
      title='Вход'
      buttomClass='authorization'
      buttomText='Войти'
    >
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
      </label>
      <label className='login-page__input'>
        <input
          type='password'
          name='password'
          autoComplete='current-password'
          value=''
          placeholder='Пароль'
          className='login-page__field'
          required
          minLength='2'
          maxLength='200'
        />
      </label>
    </LoginPage>
  );
}

export default (Login);