import React from 'react';
import { withRouter } from 'react-router-dom';

function Main() {
  return (
    <main className='main'>
      <section className='promo'>
        <div className='promo__rectangle'>
          <h1 className='promo__title'>
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <div className='nav-tab'>
            <a href='#about-project' className='nav-tab__link'>
              О проекте
            </a>
            <a href='#tech' className='nav-tab__link'>
              Технологии
            </a>
            <a href='#about-me' className='nav-tab__link'>
              Студент
            </a>
          </div>
        </div>
      </section>
      <section id='about-project' className='about-project'>
        <h2 className='blocs-title'>О проекте</h2>
        <div className='about-project__description'>
          <div className='about-project__description-stage'>
            <p className='about-project__stage-title'>
              Дипломный проект включал 5 этапов
            </p>
            <p className='about-project__stage-subtitle'>
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className='about-project__description-stage'>
            <p className='about-project__stage-title'>
              На выполнение диплома ушло 5 недель
            </p>
            <p className='about-project__stage-subtitle'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className='about-project__schedule'>
          <p className='about-project__stage'>1 неделя</p>
          <p className='about-project__stage'>4 недели</p>
          <p className='about-project__stage'>Back-end</p>
          <p className='about-project__stage'>Front-end</p>
        </div>
      </section>
      <section id='tech' className='tech'>
        <h2 className='blocs-title'>Технологии</h2>
        <p className='tech__title'>7 технологий</p>
        <p className='tech__subtitle'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className='tech__list'>
          <p className='tech__name'>HTML</p>
          <p className='tech__name'>CSS</p>
          <p className='tech__name'>JS</p>
          <p className='tech__name'>React</p>
          <p className='tech__name'>Git</p>
          <p className='tech__name'>Express.js</p>
          <p className='tech__name'>mongoDB</p>
        </div>
      </section>
      <section id='about-me' className='about-me'>
        <h2 className='blocs-title'>Студент</h2>
        <div className='about-me__questionnaire'>
          <div className='about-me__questionnaire-biography'>
            <p className='about-me__questionnaire-name'>Виталий</p>
            <p className='about-me__questionnaire-about'>
              Фронтенд-разработчик, 30 лет
            </p>
            <p className='about-me__questionnaire-description'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
          </div>
          <div className='about-me__questionnaire-links'>
            <a href='https://vk.com/idtens91' className='about-me__questionnaire-link'>
              vk
            </a>
            <a href='https://github.com/TitovAndrei' className='about-me__questionnaire-link'>
              Github
            </a>
          </div>
          <img
            src=''
            alt='Фото владельца аккаунта'
            className='about-me__avatar'
          />
        </div>
        </section>
        <section className='portfolio'>
        <div className='portfolio__links'>
          <p className='portfolio__subtitle'>Портфолио</p>
          <a href='https://github.com/TitovAndrei/how-to-learn' className='portfolio__link'>
            Статичный сайт
          </a>
          <a href='https://github.com/TitovAndrei/russian-travel' className='portfolio__link portfolio__link_center'>
            Адаптивный сайт
          </a>
          <a href='https://github.com/TitovAndrei/react-mesto-api-full/blob/main/README.md' className='portfolio__link'>
            Одностраничное приложение
          </a>
        </div>
      </section>
    </main>
  );
}

export default withRouter(Main);
