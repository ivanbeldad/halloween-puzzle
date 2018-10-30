import React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Puzzle from './Puzzle/Puzzle';

const App = ({ classes }) => (
  <div className={classes.root}>
    <header className={classes.header}>
      <Typography className={classes.title} variant="display4" color="error">HALLOWEEN</Typography>
    </header>
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

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    margin: theme.spacing.unit * 4,
  },
  title: {
    fontFamily: 'Freckle Face',
  },
  main: {
    display: 'flex',
  },
  puzzleSection: {
  },
});

export default withStyles(styles)(App);
