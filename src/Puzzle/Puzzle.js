import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Piece from './Piece';

class Puzzle extends Component {
  state = {
    pieces: [],
    totalWidth: null,
    totalHeight: null,
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
    // original
    const pieces = [];
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        console.log(totalWidth);
        console.log(width * x);
        pieces.push({
          key: `${y}${x}`,
          image,
          height,
          width,
          positionVerticalOffset: height * y,
          positionHorizontalOffset: width * x,
          imageVerticalOffset: height * y,
          imageHorizontalOffset: width * x,
        });
      }
    }
    console.log(pieces);
    this.setState({ pieces });
  }

  render() {
    const {
      classes,
      image,
      cols,
      rows,
      onFinish,
      onSwap,
    } = this.props;
    const { pieces, totalWidth, totalHeight } = this.state;
    return (
      <div className={classes.root} style={{ totalHeight, totalWidth }}>
        <img onLoad={this.onImageLoad} style={{ display: 'none' }} src={image} alt="puzzle" />
        {pieces.map(piece => (
          <Piece
            key={piece.key}
            image={image}
            height={piece.height}
            width={piece.width}
            positionVerticalOffset={piece.positionVerticalOffset}
            positionHorizontalOffset={piece.positionHorizontalOffset}
            imageVerticalOffset={piece.imageVerticalOffset}
            imageHorizontalOffset={piece.imageHorizontalOffset}
            border={1}
          />
        ))}
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

const styles = theme => ({
  root: {
    background: '#023',
    position: 'relative',
  },
});

export default withStyles(styles)(Puzzle);
