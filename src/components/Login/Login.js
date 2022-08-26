import React, { useEffect } from "react";
import LoginPage from "../LoginPage/LoginPage.js";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [errorsEmail, setErrorsEmail] = React.useState("");
  const [errorsPassword, setErrorsPassword] = React.useState("");

  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isValidPassword, setIsValidPassword] = React.useState(false);

  const [isButtonActiv, setIsButtonActiv] = React.useState(false);

  useEffect(() => {
    if (isValidEmail && isValidPassword) {
      setIsButtonActiv(true);
    } else {
      setIsButtonActiv(false);
    }
  }, [isValidEmail, isValidPassword]);

  function handleEmailChandge(evt) {
    const target = evt.target;
    setEmail(target.value);
    setErrorsEmail(target.validationMessage);
    if (!target.validationMessage) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }

  function handlePasswordChandge(evt) {
    const target = evt.target;
    setPassword(target.value);
    setErrorsPassword(target.validationMessage);
    if (!target.validationMessage) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAuth(email, password);
  }

  const submitButtonClassName = `login-page__submit-button_auth ${
    isButtonActiv ? "" : "login-page__submit-button_disabled"
  }`;

  return (
    <LoginPage
      formName="authorization"
      title="Рады видеть!"
      buttomClass={submitButtonClassName}
      buttomText="Войти"
      onSubmit={handleSubmit}
      submitButtonСondition={isButtonActiv}
      message={props.message}
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
        <span className="login-page__field-error">{errorsEmail}</span>
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
        <span className="login-page__field-error">{errorsPassword}</span>
      </label>
    </LoginPage>
  );
}

export default Login;
