import React, { Component } from 'react';
import { withStyles, Typography, Button } from '@material-ui/core';
import Puzzle from './Puzzle/Puzzle';
import puzzleService from './puzzleService';

class App extends Component {
  state = {
    currentPuzzle: puzzleService.shift(),
    puzzles: puzzleService,
    finished: false,
  }

  handleFinish = () => {
    this.setState({ finished: true });
  }

  nextPuzzle = () => {
    this.setState((prevState) => {
      const { puzzles } = prevState;
      return {
        currentPuzzle: puzzles.shift(),
        puzzles,
        finished: false,
      };
    });
  }

  render() {
    const { classes } = this.props;
    const { currentPuzzle, finished, puzzles } = this.state;
    const everythingHasFinished = puzzles.length === 0;

    return (
      <div className={classes.root}>
        <header className={classes.header}>
          <Typography className={classes.title} variant="h1" color="error">HALLOWEEN</Typography>
        </header>
        <main className={classes.main}>
          <section className={classes.puzzleSection}>
            <Puzzle
              key={currentPuzzle.id}
              className={classes.puzzle}
              image={currentPuzzle.image}
              cols={currentPuzzle.cols}
              rows={currentPuzzle.rows}
              onFinished={this.handleFinish}
            />
          </section>
          <section className={classes.buttonSection}>
            {(finished && !everythingHasFinished) && (
              <Button
                className={classes.next}
                size="large"
                variant="contained"
                color="primary"
                onClick={this.nextPuzzle}
              >
                NEXT
              </Button>
            )}
            {everythingHasFinished && (
              <div>
                <Typography variant="body1" style={{ marginBottom: 8 }}>Congratulations!</Typography>
                <Typography variant="body1" style={{ marginBottom: 16 }}>
                  If you don't know yet what's all this about, you can get more info here (as regard for your effort)
                </Typography>
                <Button
                  color="secondary"
                  onClick={() => window.location.href = 'http://dontstarve.wikia.com/wiki/Hallowed_Nights'}
                >
                  MORE INFO
                </Button>
              </div>
            )}
          </section>
        </main>
      </div>
    );
  }
}

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
    flexDirection: 'column',
  },
  buttonSection: {
    marginTop: 40,
    textAlign: 'center',
  },
  next: {
    fontFamily: 'Freckle Face',
    fontSize: '2rem',
    padding: '10px 30px',
  },
  puzzleSection: {
  },
});

export default withStyles(styles)(App);
