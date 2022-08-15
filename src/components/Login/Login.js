import React from "react";
import LoginPage from "../LoginPage/LoginPage.js";
import { Redirect } from "react-router-dom";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");

  function handleEmailChandge(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChandge(evt) {
    setpassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    window.location.href = '/movies';
  }

  return (
    <LoginPage
      formName="authorization"
      title="Рады видеть!"
      buttomClass="login-page__submit-button_auth"
      buttomText="Войти"
      onSubmit={handleSubmit}
    >
      <label className="login-page__input">
        E-mail
        <input
          type="email"
          name="email"
          autoComplete="on"
          value={email || ""}
          placeholder="Email"
          className="login-page__field"
          required
          minLength="2"
          maxLength="40"
          onChange={handleEmailChandge}
        />
      </label>
      <label className="login-page__input">
        Пароль
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password || ""}
          placeholder="Пароль"
          className="login-page__field"
          required
          minLength="2"
          maxLength="200"
          onChange={handlePasswordChandge}
        />
      </label>
    </LoginPage>
  );
}

export default Login;
