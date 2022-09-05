const apiUrl = "https://api.titov.nomoredomains.xyz";
const MovieApiUrl = "https://api.nomoreparties.co";
const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

function errorDetection(err) {
  if (err === 400 || err === 401) {
    return `Ошибка ${err}. Не верно заполнено одно из полей.`;
  } else if (err === 403 || err === 404) {
    return `Ошибка ${err}. Переданны некорректные данные.`;
  } else if (err === 404) {
    return `Ошибка ${err}. Отсутствует связь с сервером, повторите попытку позже.`;
  } else if (err === 409) {
    return `Ошибка ${err}. Пользователь с этим Email уже зарегистрирован, введите другой Email.`;
  } else if (err === 429) {
    return `Ошибка ${err}. Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.`;
  } else if (err === 500) {
    return `Ошибка ${err}. На сервере произошла ошибка.`;
  } else {
    return `Ошибка ${err}. Непредвиденная ошибка.`;
  }
}

export {
  apiUrl,
  errorDetection,
  MovieApiUrl,
  EMAIL_REGEXP,
};
