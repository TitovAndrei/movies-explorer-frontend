import React, { useEffect } from "react";
import LoginPage from "../LoginPage/LoginPage.js";
import { EMAIL_REGEXP } from "../../utils/constants.js";

export default function Register(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [errorsName, setErrorsName] = React.useState("");
  const [errorsEmail, setErrorsEmail] = React.useState("");
  const [errorsPassword, setErrorsPassword] = React.useState("");

  const [isValidName, setIsValidName] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isValidPassword, setIsValidPassword] = React.useState(false);

  const [isButtonActiv, setIsButtonActiv] = React.useState(false);

  useEffect(() => {
    if (isValidEmail && isValidPassword && isValidName) {
      setIsButtonActiv(true);
    } else {
      setIsButtonActiv(false);
    }
  }, [isValidEmail, isValidPassword, isValidName]);

  function handleNameChandge(evt) {
    const target = evt.target;
    setName(target.value);
    setErrorsName(target.validationMessage);
    if (!target.validationMessage) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  }

  function handleEmailChandge(evt) {
    const target = evt.target;
    setEmail(target.value);
    if (EMAIL_REGEXP.test(target.value)) {
      setErrorsEmail(target.validationMessage);
      if (!target.validationMessage) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
    } else {
      setErrorsEmail("Введен не корректный E-Mail");
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
    props.onReg(name, email, password);
  }

  const submitButtonClassName = `login-page__submit-button_auth ${
    isButtonActiv ? "" : "login-page__submit-button_disabled"
  }`;

  return (
    <LoginPage
      formName="register"
      title="Добро пожаловать!"
      buttomClass={submitButtonClassName}
      buttomText="Зарегистрироваться"
      onSubmit={handleSubmit}
      submitButtonСondition={isButtonActiv}
      message={props.message}
      isButtonActiv={isButtonActiv}
    >
      <label className="login-page__input">
        Имя
        <input
          type="text"
          name="name"
          value={name || ""}
          placeholder="Имя"
          className="login-page__field"
          required
          minLength="2"
          maxLength="40"
          onChange={handleNameChandge}
        />
        <span className="login-page__field-error">{errorsName}</span>
      </label>
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
          autoComplete="new-password"
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
