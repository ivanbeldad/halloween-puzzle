import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

class Piece extends Component {
  state = {};

  render() {
    const {
      classes,
      image,
      height,
      width,
      positionVerticalOffset,
      positionHorizontalOffset,
      imageVerticalOffset,
      imageHorizontalOffset,
    } = this.props;
    return (
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${image})`,
          height,
          width,
          top: positionVerticalOffset,
          left: positionHorizontalOffset,
          backgroundPositionY: imageVerticalOffset,
          backgroundPositionX: imageHorizontalOffset,
        }}
      />
    );
  }
}

Piece.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

Piece.defaultProps = {
  height: null,
  width: null,
};

const styles = () => ({
  image: {
    position: 'absolute',
  },
});

export default withStyles(styles)(Piece);
