import { MovieApiUrl } from "./constants.js";

// фильмы со стороннего сервиса
// получаю все фильмы
async function getMovies() {
  const res = await fetch(`${MovieApiUrl}/beatfilm-movies`, {
    headers: {
      "Content-Type": "application/json",
    },
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

export { getMovies };
