import React from 'react';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Movies from '../Movies/Movies.js';

import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';

import { Route, Switch, withRouter } from 'react-router-dom';
import Main from '../Main/Main.js';

function App() {
  return (
    <div className='App'>
      <div className='body'>
        <div className='page'>
          <Header />
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route path='/movies'>
              <Movies />
            </Route>
            <Route path='/saved-movies'>
              <SavedMovies />
            </Route>
            <Route path='/sign-up'>
              <Register />
            </Route>
            <Route path='/sign-in'>
              <Login />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default withRouter(App);
