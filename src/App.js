import React, { Component } from 'react';
import Snake from './Snake'
import { database } from './firebaseConfig'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Snake
          firebaseDatabase={database}
        />
      </div>
    );
  }
}

export default App;
