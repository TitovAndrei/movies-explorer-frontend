import React from "react";
import { NavLink } from "react-router-dom";

function Profile() {
  const [isEditProfile, setIsEditProfile] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handleNameChandge(evt) {
    setName(evt.target.value);
  }

  function handleEmailChandge(evt) {
    setEmail(evt.target.value);
  }

  function handleEditProfile() {
    setIsEditProfile(true);
  }

  function saveProfile() {
    setIsEditProfile(false);
  }

  return (
    <section className="profile">
      <p className="profile__title">Привет, Андрей!</p>
      {isEditProfile === false ? (
        <>
          <div className="profile__field">
            <p className="profile__field-meaning">Имя</p>
            <p className="profile__field-meaning">Андрей</p>
          </div>
          <div className="profile__field">
            <p className="profile__field-meaning">E-mail</p>
            <p className="profile__field-meaning">pochta@yandex.ru</p>
          </div>
          <button className="profile__button-edit" onClick={handleEditProfile}>
            Редактировать
          </button>
          <NavLink to="/" className="profile__exit">
            Выйти из аккаунта
          </NavLink>
        </>
      ) : (
        <form className="profile__form">
          <label className="profile__field">
          <p className="profile__field-meaning">Имя</p>
            <input
              type="text"
              name="name"
              value={name || "Андрей"}
              placeholder="Имя"
              className="profile__input profile__field-meaning"
              required
              minLength="2"
              maxLength="40"
              onChange={handleNameChandge}
            />
            <span className="profile__field-error"></span>
          </label>
          <label className="profile__field">
          <p className="profile__field-meaning">E-mail</p>
            <input
              type="email"
              name="email"
              autoComplete="on"
              value={email || "pochta@yandex.ru"}
              placeholder="Email"
              className="profile__input profile__field-meaning"
              required
              minLength="2"
              maxLength="40"
              onChange={handleEmailChandge}
            />
            <span className="profile__field-error"></span>
          </label>
          <button
            name="profile-submit-button"
            className="profile__submit-button"
            type="submit"
            aria-label="Кнопка сохранения формы"
            onClick={saveProfile}
          >
            Сохранить
          </button>
        </form>
      )}
    </section>
  );
}

export default Profile;
