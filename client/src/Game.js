import React, { Component } from 'react';
import axios from 'axios';

import AIGame from './components/AIGame';
import SingleGame from './components/SingleGame';
import DuoGame from './components/DuoGame';

import constants from './constants';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      type: null,
    };
  }

  componentWillMount() {
    axios.get(`/api/game/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          type: response.data.type,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let gameType = null;
    switch (this.state.type) {
      case constants.gameType.vsAI:
        gameType = (<AIGame />);
        break;
      case constants.gameType.oneVersusOne:
        gameType = (<SingleGame />);
        break;
      case constants.gameType.twoVersusTwo:
        gameType = (<DuoGame />);
        break;
      default:
        gameType = null;
    }

    return (
      <div className="App">
        {gameType}
      </div>
    );
  }
}

export default Game;
