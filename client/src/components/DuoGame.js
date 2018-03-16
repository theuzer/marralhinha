import React, { Component } from 'react';
import axios from 'axios';

class DuoGame extends Component {
  constructor() {
    super();
    this.state = {
      test: 'DuoGame'
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

export default DuoGame;
