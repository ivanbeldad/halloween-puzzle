import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { DragSource, DropTarget } from 'react-dnd';

const Piece = (props) => {
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
    handleChange,
    connectDragSource,
    connectDropTarget,
    isDragging,
    isOver,
    didDrop,
    draggedItem,
    droppedItem,
    freeze,
  } = props;

  const opacity = isDragging ? 0.5 : 1;
  const hoverOpacity = isOver ? 0.3 : 0;

  const shouldHandleChange = didDrop && isDragging
      && draggedItem.imgX === imgX
      && draggedItem.imgY === imgY
      && (draggedItem.imgX !== droppedItem.imgX || draggedItem.imgY !== droppedItem.imgY);
  if (shouldHandleChange) {
    handleChange({
      fromX: draggedItem.imgX,
      fromY: draggedItem.imgY,
      toX: droppedItem.imgX,
      toY: droppedItem.imgY,
    });
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
          border: freeze ? 0 : `${border}px solid rgba(255,255,255,0.5)`,
          backgroundImage: `url(${image})`,
          height: freeze ? height : height - border * 2,
          width: freeze ? width : width - border * 2,
          backgroundPositionY: height * imgY * -1,
          backgroundPositionX: width * imgX * -1,
          opacity: freeze && 1,
        }}
      >
        <div className={classes.hover} style={{ opacity: hoverOpacity }} />
      </div>
    </div>
  );

  if (freeze) return jsx;

  return connectDragSource(connectDropTarget(jsx));
};

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
  freeze: false,
};

const styles = () => ({
  root: {
    position: 'absolute',
    background: '#fff',
  },
  image: {
    opacity: 0.9,
    '&:hover': {
      opacity: 0.8,
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

const dragSpec = {
  beginDrag: props => props,
};

const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  didDrop: monitor.didDrop(),
  draggedItem: monitor.getItem() || {},
  droppedItem: monitor.getDropResult() || {},
});

const dropSpec = {
  drop: props => props,
  canDrop: (props, monitor) => {
    const item = monitor.getItem();
    return props.posX !== item.posX || props.posY !== item.posY;
  },
};

const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

const StyledPiece = withStyles(styles)(Piece);
const DragStyledPiece = DragSource('piece', dragSpec, dragCollect)(StyledPiece);
const DragAndDropStyledPiece = DropTarget('piece', dropSpec, dropCollect)(DragStyledPiece);

export default DragAndDropStyledPiece;
