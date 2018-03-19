import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import Home from './Home';
import Game from './Game';

import utils from './utils/index';

class App extends Component {
  componentWillMount() {
    if (!Cookies.get('session')) {
      Cookies.set('session', utils.guid());
    } else {
      console.log(Cookies.get('session'));
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:id" component={Game} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
