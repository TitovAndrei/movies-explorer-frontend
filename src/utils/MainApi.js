import { apiUrl } from "./constants";

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
    credentials: "include",
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
  owner,
  movieId,
  nameRU,
  nameEN
) {
  const res = await fetch(`${apiUrl}/movies`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
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
      owner,
      movieId,
      nameRU,
      nameEN,
    }),
  });
  return checkResponse(res);
}

// удаление фильма
async function deleteMoves(movieId) {
  const res = await fetch(`${apiUrl}/movies/${movieId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    credentials: "include",
    method: "DELETE",
  });
  return checkResponse(res);
}

// редакритование профиля
// отправка информации на сервер
async function setProfileInformation(email, name) {
  const res = await fetch(`${apiUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      name,
    }),
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
