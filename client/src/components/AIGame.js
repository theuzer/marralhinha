import React, { Component } from 'react';
import axios from 'axios';

class AIGame extends Component {
  constructor() {
    super();
    this.state = {
      test: 'AIGame'
    };
  }

  componentWillMount() {
    const game = this.props.game;
    if (game.players.length === 0) {
      const requestBody = {
        isAi: true,
        name: 'Computer',
        team: 1,
        side: 2,
        gameId: game._id,
      };
      axios.post('/api/player', requestBody);
    }
  }

  render() {
    return (
      <div>
        {this.state.test}
        <input value={this.state.name} />
      </div>
    );
  }
}

export default AIGame;
