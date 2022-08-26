import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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
    if (isValidEmail && isValidName) {
      setIsButtonActiv(true);
    } else {
      setIsButtonActiv(false);
    }
  }, [isValidEmail, isValidName]);

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
    setErrorsEmail(target.validationMessage);
    if (!target.validationMessage) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }

  function handleEditProfile() {
    setIsEditProfile(true);
  }

  function saveProfileSubmit(evt) {
    evt.preventDefault();
    props.onEditProfile(email, name);
    setIsEditProfile(false);
  }

  const submitButtonClassName = `profile__submit-button ${
    isButtonActiv ? "" : "profile__submit-button_disabled"
  }`;

  return (
    <section className="profile">
      <p className="profile__title">Привет, Андрей!</p>
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
              value={name || props.currentUser.name}
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
              value={email || props.currentUser.email}
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
          >
            Сохранить
          </button>
        </form>
      )}
    </section>
  );
}

export default Profile;
