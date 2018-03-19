import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import constants from './constants';
import utils from './utils/index';

class Home extends Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentWillMount() {
    if (!Cookies.get('session')) {
      Cookies.set('session', utils.guid());
    } else {
      console.log(Cookies.get('session'));
    }
  }

  handleOnClick(e, gameType) {
    console.log(e, gameType);
    const requestBody = { type: gameType };
    axios.post('api/game', requestBody)
      .then((response) => {
        const gameId = response.data._id;
        // document.execCommand('copy', false, window.location.href);
        this.props.history.push(`/${gameId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Marralhinha</h1>
        <div>
          <div>
            <button onClick={e => this.handleOnClick(e, constants.gameType.vsAI)}>vs AI</button>
          </div>
          <div>
            <button onClick={e => this.handleOnClick(e, constants.gameType.oneVersusOne)}>1 v 1</button>
          </div>
          <div>
            <button onClick={e => this.handleOnClick(e, constants.gameType.twoVersusTwo)}>2 v 2</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
