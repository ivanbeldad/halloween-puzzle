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
      posX,
      posY,
      imgX,
      imgY,
    } = this.props;
    return (
      <div
        className={classes.root}
        style={{
          top: height * posY,
          left: width * posX,
        }}
      >
        <div
          className={classes.image}
          style={{
            border: `${border}px solid rgba(255,255,255,0.5)`,
            backgroundImage: `url(${image})`,
            height: height - border * 2,
            width: width - border * 2,
            backgroundPositionY: height * imgY * -1,
            backgroundPositionX: width * imgX * -1,
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
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
  imgX: PropTypes.number.isRequired,
  imgY: PropTypes.number.isRequired,
  border: PropTypes.number,
};

Piece.defaultProps = {
  height: null,
  width: null,
  border: 1,
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
