import React from "react";
import LoginPage from "../LoginPage/LoginPage.js";

export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleNameChandge(evt) {
    setName(evt.target.value);
  }

  function handleEmailChandge(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChandge(evt) {
    setPassword(evt.target.value);
  }

  return (
    <LoginPage
      formName="register"
      title="Добро пожаловать!"
      buttomClass="register"
      buttomText="Зарегистрироваться"
    >
      <label className="login-page__input">Имя
        <input
          type="text"
          name="name"
          value={name || ''}
          placeholder="Имя"
          className="login-page__field"
          required
          minLength="2"
          maxLength="40"
          onChange={handleNameChandge}
        />
        <span className="login-page__field-error"></span>
      </label>
      <label className="login-page__input">E-mail
        <input
          type="email"
          name="email"
          autoComplete="on"
          value={email || ''}
          placeholder="Email"
          className="login-page__field"
          required
          minLength="2"
          maxLength="40"
          onChange={handleEmailChandge}
        />
        <span className="login-page__field-error"></span>
      </label>
      <label className="login-page__input">Пароль
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          value={password || ''}
          placeholder="Пароль"
          className="login-page__field"
          required
          minLength="2"
          maxLength="200"
          onChange={handlePasswordChandge}
        />
        <span className="login-page__field-error"></span>
      </label>
    </LoginPage>
  );
}
