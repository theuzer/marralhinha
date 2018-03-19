import React, { Component } from 'react';
import axios from 'axios';

import AIGame from './components/AIGame';
import SingleGame from './components/SingleGame';
import DuoGame from './components/DuoGame';
import Lobby from './components/Lobby';

import constants from './constants';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      game: null,
    };
  }

  componentWillMount() {
    axios.get(`/api/game/${this.props.match.params.id}/all`)
      .then((response) => {
        console.log(response);
        this.setState({
          game: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let component = null;
    if (this.state.game) {
      if (!this.state.game.isStarted) {
        component = (<Lobby game={this.state.game} />);
      } else {
        switch (this.state.game.type) {
          case constants.gameType.vsAI:
            component = (<AIGame game={this.state.game} />);
            break;
          case constants.gameType.oneVersusOne:
            component = (<SingleGame />);
            break;
          case constants.gameType.twoVersusTwo:
            component = (<DuoGame />);
            break;
          default:
            component = null;
        }
      }
    }

    return (
      <div className="App">
        {component}
      </div>
    );
  }
}

export default Game;
