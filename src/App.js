import React, { Component } from 'react';
import Puzzle from './Puzzle/Puzzle';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <main>
          <section>
            <Puzzle
              image="https://storage.googleapis.com/rackian-cloud/halloween/hallowed_nights_loading_screen.png"
              cols={5}
              rows={5}
            />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
