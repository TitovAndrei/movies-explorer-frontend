import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { EMAIL_REGEXP } from "../../utils/constants.js";

function Profile(props) {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [errorsName, setErrorsName] = useState("");
  const [errorsEmail, setErrorsEmail] = useState("");

  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [isButtonActiv, setIsButtonActiv] = useState(false);

  useEffect(() => {
    setName(props.currentUser.name);
    setEmail(props.currentUser.email);
  }, []);

  useEffect(() => {
    validationInput();
  }, [isValidEmail]);

  useEffect(() => {
    validationInput();
  }, [isValidName]);

  function validationInput() {
    if (isValidName || isValidEmail) {
      setIsButtonActiv(true);
    } else if (!isValidEmail || !isValidName) {
      setIsButtonActiv(false);
    } 
    if (errorsEmail !== "" || errorsName !== "") {
      setIsButtonActiv(false);
    }
  }

  function handleNameChandge(evt) {
    const target = evt.target;
    setName(target.value);
    setErrorsName(target.validationMessage);
    if (target.value === props.currentUser.name) {
      setIsValidName(false);
      setIsButtonActiv(false);
    } else if ((target.value !== props.currentUser.name && !target.validationMessage) ) {
      setIsValidName(true);
      setIsButtonActiv(true);
    }
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
    if (target.value === props.currentUser.email) {
      setIsButtonActiv(false);
      setIsValidEmail(false);
    } else if (target.value !== props.currentUser.email && !target.validationMessage) {
      setIsButtonActiv(true);
      setIsValidEmail(true);
    }
  }

  function handleEditProfile() {
    setIsEditProfile(true);
  }

  function saveProfileSubmit(evt) {
    evt.preventDefault();
    if (email === props.currentUser.email && name !== props.currentUser.name) {
      const requestObject = { name: name };
      props.onEditProfile(requestObject);
    }
    if (email !== props.currentUser.email && name === props.currentUser.name) {
      const requestObject = { email: email };
      props.onEditProfile(requestObject);
    }
    if (email !== props.currentUser.email && name !== props.currentUser.name) {
      const requestObject = { email: email, name: name };
      props.onEditProfile(requestObject);
    }
    setIsEditProfile(false);
  }

  const submitButtonClassName = `profile__submit-button ${
    isButtonActiv ? "" : "profile__submit-button_disabled"
  }`;

  return (
    <section className="profile">
      <p className="profile__title">Привет, {props.currentUser.name}!</p>
      {isEditProfile === false ? (
        <>
          <div className="profile__field">
            <p className="profile__field-meaning">Имя</p>
            <p className="profile__field-meaning">{props.currentUser.name}</p>
          </div>
          <div className="profile__field">
            <p className="profile__field-meaning">E-mail</p>
            <p className="profile__field-meaning">{props.currentUser.email}</p>
          </div>
          <button className="profile__button-edit" onClick={handleEditProfile}>
            Редактировать
          </button>
          <NavLink to="/" className="profile__exit" onClick={props.onExit}>
            Выйти из аккаунта
          </NavLink>
        </>
      ) : (
        <form className="profile__form" onSubmit={saveProfileSubmit}>
          <label className="profile__field">
            <p className="profile__field-meaning">Имя</p>
            <input
              type="text"
              name="name"
              value={name || ""}
              placeholder="Имя"
              className="profile__input profile__field-meaning"
              required
              minLength="2"
              maxLength="40"
              onChange={handleNameChandge}
            />
            <span className="profile__field-error">{errorsName}</span>
          </label>
          <label className="profile__field">
            <p className="profile__field-meaning">E-mail</p>
            <input
              type="email"
              name="email"
              autoComplete="on"
              value={email || ""}
              placeholder="Email"
              className="profile__input profile__field-meaning"
              required
              minLength="2"
              maxLength="40"
              onChange={handleEmailChandge}
            />
            <span className="profile__field-error">{errorsEmail}</span>
          </label>
          <button
            name="profile-submit-button"
            className={submitButtonClassName}
            type="submit"
            aria-label="Кнопка сохранения формы"
            disabled={!isButtonActiv ? true : ""}
          >
            Сохранить
          </button>
        </form>
      )}
    </section>
  );
}

export default Profile;
