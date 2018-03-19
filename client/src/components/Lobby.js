import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import constants from '../constants';

class Lobby extends Component {
  constructor() {
    super();
    this.state = {
      isPlayerRegistered: false,
      players: [],
    };
  }

  componentWillMount() {
    const game = this.props.game;
    if (game.type === constants.gameType.vsAI && game.players.length === 0) {
      const requestBody = {
        isAi: true,
        name: 'Computer',
        team: 1,
        side: 2,
        gameId: game._id,
      };
      axios.post('/api/player', requestBody)
        .then((response) => {
          const players = this.state.players;
          players.push(response.data);
          this.setState({ players });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  componentDidMount() {
    const game = this.props.game;
    const player = game.players.filter(x => x.cookie === Cookies.get('session'))[0];
    if (player) {
      const players = this.state.players;
      players.push(player);
      this.setState({ players, isPlayerRegistered: true });
    }
  }

  render() {
    const playerList = this.state.players.map((player) => {
      return (
        <li>
          <div>
            <div>Name</div>
            <div>{player.name}</div>
          </div>
        </li>
      );
    });

    const addPlayer = this.state.isPlayerRegistered ? (null) : (<div>a</div>);

    return (
      <div>
        <h1>Lobby</h1>
        <div>
          <ul>
            {playerList}
          </ul>
        </div>
        {addPlayer}
      </div>
    );
  }
}

export default Lobby;
