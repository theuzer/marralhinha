import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from './Home';
import Game from './Game';

import './App.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/:id" component={Game} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
