import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Piece from './Piece';

class Puzzle extends Component {
  state = {
    pieces: [],
    totalWidth: null,
    totalHeight: null,
    isDone: false,
  };

  onImageLoad = ({ target }) => {
    const { totalWidth, totalHeight } = this.state;
    if (totalWidth && totalHeight) return;
    const newTotalWidth = target.width;
    const newTotalHeight = target.height;
    this.setState({ totalWidth: newTotalWidth, totalHeight: newTotalHeight });
    this.shuffle({ totalWidth: newTotalWidth, totalHeight: newTotalHeight });
  }

  shuffle = ({ totalHeight, totalWidth }) => {
    const { image, cols, rows } = this.props;
    const width = totalWidth / cols;
    const height = totalHeight / rows;
    const pieces = [];
    let positions = [];

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        positions.push({ x, y });
      }
    }

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const randomPositionIndex = Math.floor(Math.random() * positions.length);
        const randomPosition = positions[randomPositionIndex];
        positions = [
          ...positions.slice(0, randomPositionIndex),
          ...positions.slice(randomPositionIndex + 1, positions.length),
        ];

        pieces.push({
          key: `${y}${x}`,
          image,
          height,
          width,
          posY: y,
          posX: x,
          imgX: randomPosition.x,
          imgY: randomPosition.y,
          border: 1,
          cols,
          rows,
        });
      }
    }
    this.setState({ pieces });
  }

  handleChange = ({
    fromX, fromY, toX, toY,
  }) => {
    this.setState((prevState) => {
      const { pieces } = prevState;
      const from = pieces.find(piece => piece.imgX === fromX && piece.imgY === fromY);
      const to = pieces.find(piece => piece.imgX === toX && piece.imgY === toY);
      from.imgX = toX;
      from.imgY = toY;
      to.imgX = fromX;
      to.imgY = fromY;
      const isDone = this.isDone(pieces);
      return { pieces, isDone };
    });
  }

  isDone = (pieces) => {
    const total = pieces.length;
    let numberOfCorrect = 0;
    pieces.forEach((piece) => {
      if (piece.posX === piece.imgX && piece.posY === piece.imgY) {
        numberOfCorrect += 1;
      }
    });
    const { onFinished } = this.props;
    const isDone = total === numberOfCorrect;
    if (isDone) onFinished();
    return isDone;
  }

  render() {
    const {
      classes,
      image,
    } = this.props;

    const {
      pieces, totalWidth, totalHeight, isDone,
    } = this.state;

    return (
      <div className={classes.root} style={{ totalHeight, totalWidth }}>
        <img onLoad={this.onImageLoad} style={{ display: isDone ? 'inherit' : 'none' }} src={image} alt="puzzle" />
        {!isDone && (
        <table className={classes.table} cellSpacing={0} cellPadding={0}>
          <tbody>
            {pieces.reduce((prev, current) => {
              if (!prev[current.posY]) prev[current.posY] = [];
              prev[current.posY].push(current);
              return prev;
            }, []).map((row, i) => (
              <tr key={i}>
                {row.map(piece => <td key={piece.key}><Piece {...piece} handleChange={this.handleChange} freeze={isDone} /></td>)}
              </tr>))
          }
          </tbody>
        </table>
        )}
      </div>
    );
  }
}

Puzzle.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  image: PropTypes.string.isRequired,
  cols: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  onFinish: PropTypes.func,
  onSwap: PropTypes.func,
};

Puzzle.defaultProps = {
  onFinish: () => {},
  onSwap: () => {},
};

const styles = () => ({
  root: {
    background: '#000',
    position: 'relative',
  },
  table: {
    borderCollapse: 'collapse',
    marginBottom: 50,
  },
});

export default (withStyles(styles)(Puzzle));
