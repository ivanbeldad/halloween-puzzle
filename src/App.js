import React from 'react';
import { withStyles } from '@material-ui/core';
import Puzzle from './Puzzle/Puzzle';

const App = ({ classes }) => (
  <div className={classes.root}>
    <header className="App-header" />
    <main className={classes.main}>
      <section className={classes.puzzleSection}>
        <Puzzle
          className={classes.puzzle}
          image="https://storage.googleapis.com/rackian-cloud/halloween/hallowed_nights_loading_screen_low.png"
          cols={14}
          rows={8}
        />
      </section>
    </main>
  </div>
);

const styles = () => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  main: {
    display: 'flex',
    flexGrow: 1,
  },
  puzzleSection: {
    margin: 'auto',
  },
});

export default withStyles(styles)(App);
