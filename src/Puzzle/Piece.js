import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  DragSource,
  DropTarget,
  DragSourceSpec,
  DragSourceMonitor,
  DropTargetSpec,
  DropTargetMonitor,
} from 'react-dnd';

class Piece extends Component {
  state = {
    droppable: true,
  };

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
      connectDragSource,
      connectDropTarget,
      isDragging,
      isOver,
      didDrop,
      draggedItem,
      droppedItem,
    } = this.props;

    const isNotTheSame = draggedItem.posX !== droppedItem.posX || draggedItem.posY !== droppedItem.posY;
    const opacity = isDragging ? 0.5 : 1;
    const hoverOpacity = isOver && isNotTheSame ? 0.3 : 0;

    const shouldHandleChange = didDrop
      && draggedItem.posX === posX
      && draggedItem.posY === posY
      && (draggedItem.posX !== droppedItem.posX || draggedItem.posY !== droppedItem.posY);
    if (shouldHandleChange) {
      console.log(`From ${draggedItem.posX} ${draggedItem.posY} - To ${droppedItem.posX} ${droppedItem.posY}`);
    }

    const jsx = (
      <div
        className={classes.root}
        style={{
          top: height * posY,
          left: width * posX,
          opacity,
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
        >
          <div className={classes.hover} style={{ opacity: hoverOpacity }} />
        </div>
      </div>
    );

    return connectDragSource(connectDropTarget(jsx));
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
  draggedItem: {},
  droppedItem: {},
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
  hover: {
    width: '100%',
    height: '100%',
    background: '#ffff6b',
  },
});

/**
 * @type {DragSourceSpec}
 */
const dragSpec = {
  beginDrag: props => props,
};

/**
 *
 * @param {*} connect
 * @param {DragSourceMonitor} monitor
 */
const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  didDrop: monitor.didDrop(),
  draggedItem: monitor.getItem() || {},
  droppedItem: monitor.getDropResult() || {},
});

/**
 * @type {DropTargetSpec}
 */
const dropSpec = {
  drop: props => props,
};

/**
 *
 * @param {*} connect
 * @param {DropTargetMonitor} monitor
 */
const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

const StyledPiece = withStyles(styles)(Piece);
const DragStyledPiece = DragSource('piece', dragSpec, dragCollect)(StyledPiece);
const DragAndDropStyledPiece = DropTarget('piece', dropSpec, dropCollect)(DragStyledPiece);

export default DragAndDropStyledPiece;
