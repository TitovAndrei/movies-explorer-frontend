import { apiUrl } from "./constants.js";

// регистрация
async function setRegistration(name, email, password) {
  const res = await fetch(`${apiUrl}/signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
  return checkResponse(res);
}

// авторизация
async function getAuthorization(email, password) {
  const res = await fetch(`${apiUrl}/signin`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return checkResponse(res);
}

// Параметры запроса для проверки валидности токена и получения email для вставки в шапку сайта
async function getMe(token) {
  const res = await fetch(`${apiUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return checkResponse(res);
}

// фильмы
// получаю все сохраненные фильмы
async function getSavedMove() {
  const res = await fetch(`${apiUrl}/movies`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  });
  return checkResponse(res);
}

// сохранение фильиа
async function savedMoves(
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movieId,
  nameRU,
  nameEN
) {
  const res = await fetch(`${apiUrl}/movies`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    }),
  });
  return checkResponse(res);
}

// удаление фильма
async function deleteMoves(_id) {
  const res = await fetch(`${apiUrl}/movies/${_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    method: "DELETE",
  });
  return checkResponse(res);
}

// редакритование профиля
// отправка информации на сервер
async function setProfileInformation(requestObject) {
  const res = await fetch(`${apiUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(requestObject),
  });
  return checkResponse(res);
}

//общий метод результата
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export {
  getMe,
  getAuthorization,
  setRegistration,
  setProfileInformation,
  deleteMoves,
  savedMoves,
  getSavedMove,
};
