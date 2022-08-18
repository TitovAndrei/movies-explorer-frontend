import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';

function NotFoundPages() {
  return (
    <section className='not-found-pages'>
        <p className='not-found-pages__title'>404</p>
        <p className='not-found-pages__subtitle'>Страница не найдена</p>
        <NavLink to='/sign-in' className='not-found-pages__link'>Назад</NavLink>
    </section>
  )
}

export default withRouter(NotFoundPages);