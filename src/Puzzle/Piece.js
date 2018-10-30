import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

class Piece extends Component {
  state = {};

  render() {
    const {
      classes,
      image,
      border,
      height,
      width,
      positionVerticalOffset,
      positionHorizontalOffset,
      imageVerticalOffset,
      imageHorizontalOffset,
    } = this.props;
    return (
      <div
        className={classes.root}
        style={{
          top: positionVerticalOffset,
          left: positionHorizontalOffset,
        }}
      >
        <div
          className={classes.image}
          style={{
            border: `${border}px solid rgba(255,255,255,0.5)`,
            backgroundImage: `url(${image})`,
            height: height - border * 2,
            width: width - border * 2,
            backgroundPositionY: imageVerticalOffset * -1,
            backgroundPositionX: imageHorizontalOffset * -1,
          }}
        />
      </div>
    );
  }
}

Piece.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  image: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

Piece.defaultProps = {
  height: null,
  width: null,
};

const styles = () => ({
  root: {
    position: 'absolute',
    background: '#fff',
  },
  image: {
    '&:hover': {
      opacity: 0.9,
    },
    '&::before': {
      content: '""',
    },
  },
});

export default withStyles(styles)(Piece);
