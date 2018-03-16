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

  }

  render() {
    return (
      <div>
        {this.state.test}
      </div>
    );
  }
}

export default AIGame;
