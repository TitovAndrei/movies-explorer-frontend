import React from "react";
import { withRouter } from "react-router-dom";
import userPhoto from "../../images/foto.jpg";

function Main() {
  return (
    <main className="main">
      <section className="promo">
        <div className="promo__rectangle">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <div className="nav-tab">
            <a href="#about-project" className="nav-tab__link">
              О проекте
            </a>
            <a href="#tech" className="nav-tab__link">
              Технологии
            </a>
            <a href="#about-me" className="nav-tab__link">
              Студент
            </a>
          </div>
        </div>
      </section>
      <section id="about-project" className="about-project">
        <h2 className="blocs-title">О проекте</h2>
        <div className="about-project__description">
          <div className="about-project__description-stage">
            <p className="about-project__stage-title">
              Дипломный проект включал 5 этапов
            </p>
            <p className="about-project__stage-subtitle">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные&nbsp;доработки.
            </p>
          </div>
          <div className="about-project__description-stage">
            <p className="about-project__stage-title">
              На выполнение диплома ушло 5 недель
            </p>
            <p className="about-project__stage-subtitle">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно&nbsp;защититься.
            </p>
          </div>
        </div>
        <ul className="about-project__schedule">
          <li className="about-project__stage about-project__stage_green">
            1 неделя
          </li>
          <li className="about-project__stage about-project__stage_gray">
            4 недели
          </li>
          <li className="about-project__stage ">Back-end</li>
          <li className="about-project__stage">Front-end</li>
        </ul>
      </section>
      <section id="tech" className="tech">
        <div className="tech__description">
          <h2 className="blocs-title">Технологии</h2>
          <p className="tech__title">7 технологий</p>
          <p className="tech__subtitle">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <ul className="tech__list">
            <li className="tech__name">HTML</li>
            <li className="tech__name">CSS</li>
            <li className="tech__name">JS</li>
            <li className="tech__name">React</li>
            <li className="tech__name">Git</li>
            <li className="tech__name">Express.js</li>
            <li className="tech__name">mongoDB</li>
          </ul>
        </div>
      </section>
      <section id="about-me" className="about-me">
        <h2 className="blocs-title">Студент</h2>
        <div className="about-me__questionnaire">
          <div className="about-me__questionnaire-biography">
            <p className="about-me__questionnaire-name">Андрей</p>
            <p className="about-me__questionnaire-about">
              Фронтенд-разработчик, 30 лет
            </p>
            <p className="about-me__questionnaire-description">
              Я живу городе герое Тула, закончил факультет психологии СГА ТФ. У
              меня есть жена собака и кошка. Я люблю играть на гитаре, а ещё
              увлекаюсь ездой на велосипеде. Недавно начал кодить. С 2019 года
              работю в компании «КБ АСП». После того, как прошёл курс по
              веб-разработке, заниматюсь фрилансом и получил повышение.
            </p>
            <div className="about-me__questionnaire-links">
              <a
                href="https://vk.com/idtens91"
                className="about-me__questionnaire-link"
                target="_blank"
                rel="noreferrer"
              >
                vk
              </a>
              <a
                href="https://github.com/TitovAndrei"
                className="about-me__questionnaire-link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </div>
          </div>
          <img
            src={userPhoto}
            alt="Фото владельца аккаунта"
            className="about-me__avatar"
          />
        </div>
      </section>
      <section className="portfolio">
        <p className="portfolio__subtitle">Портфолио</p>
        <ul className="portfolio__chapter-list">
          <li className="portfolio__chapter">
            <a
              href="https://github.com/TitovAndrei/how-to-learn"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              Статичный сайт
              <p className="portfolio__arrow">↗</p>
            </a>
          </li>
          <li className="portfolio__chapter">
            <a
              href="https://github.com/TitovAndrei/russian-travel"
              className="portfolio__link portfolio__link_center"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт
              <p className="portfolio__arrow">↗</p>
            </a>
          </li>
          <li className="portfolio__chapter">
            <a
              href="https://github.com/TitovAndrei/react-mesto-api-full/blob/main/README.md"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              Одностраничное приложение
              <p className="portfolio__arrow">↗</p>
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default withRouter(Main);
