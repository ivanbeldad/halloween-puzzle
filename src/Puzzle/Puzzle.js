import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Piece from './Piece';

class Puzzle extends Component {
  state = {
    pieces: [],
    width: null,
    height: null,
  };

  onImageLoad = ({ target }) => {
    const { width, height } = this.state;
    if (width && height) return;
    this.setState({ width: target.width, height: target.height });
    this.shuffle();
  }

  shuffle = () => {
    this.setState({
      pieces: [
        {
          key: 1,
          image: this.props.image,
          height: 100,
          width: 100,
          positionVerticalOffset: 0,
          positionHorizontalOffset: 0,
          imageVerticalOffset: 0,
          imageHorizontalOffset: 0,
        }, {
          key: 2,
          image: this.props.image,
          height: 100,
          width: 100,
          positionVerticalOffset: 10,
          positionHorizontalOffset: 110,
          imageVerticalOffset: 110,
          imageHorizontalOffset: 1110,
        },
      ],
    });
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
    const { pieces, width, height } = this.state;
    return (
      <div className={classes.root} style={{ height, width }}>
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
            border={2}
          />
        ))}
      </div>
    );
  }
}

Puzzle.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string).isRequired,
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
