import React from "react";
import { withRouter, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/sign-up" ||
      location.pathname === "/sign-in" ||
      location.pathname === "/profile" ||
      location.pathname === "/404" ? (
        <></>
      ) : (
        <footer className="footer">
          <p className="footer__subtitle">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
          <div className="footer__info">
            <p className="footer__copyright">
              &copy; {new Date().getFullYear()}
            </p>
            <nav className="footer__links">
              <a href="https://practicum.yandex.ru/" className="footer__link">
                Яндекс.Практикум
              </a>
              <a href="https://github.com/" className="footer__link">
                Github
              </a>
              <a href="https://vk.com/" className="footer__link">
                VK
              </a>
            </nav>
          </div>
        </footer>
      )}
    </>
  );
}

export default withRouter(Footer);
