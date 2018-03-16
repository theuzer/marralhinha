import React, { Component } from 'react';
import axios from 'axios';

class SingleGame extends Component {
  constructor() {
    super();
    this.state = {
      test: 'SingleGame'
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

export default SingleGame;
