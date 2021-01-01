import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Draggable.module.scss';

/*
Draggable Class
Implemented from: https://stackoverflow.com/a/49348134/10307491

Can be dragged around on the canvas using dragging and dropping
from mouse.
*/
class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relX: 0,
      relY: 0,
      x: props.x, // x-coordinate of the draggable object
      y: props.y, // y-coordinate of the object
      hovering: false, // True if hovering, false otherwise
      grabbing: false, // True if grabbing, false otherwise
      id: props.id, // Unique prop ID
    };

    // Grid that the draggable element snaps to
    this.gridX = props.gridX || 1;
    this.gridY = props.gridY || 1;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
  }

  onStart(e) {
    const ref = ReactDOM.findDOMNode(this.handle);
    const body = document.body;
    const box = ref.getBoundingClientRect();
    this.setState({
      relX: e.pageX - (box.left + body.scrollLeft - body.clientLeft),
      relY: e.pageY - (box.top + body.scrollTop - body.clientTop),
    });
  }

  onMove(e) {
    const canvasArea = document
      .getElementById('certificateArea')
      .getBoundingClientRect();
    const ref = ReactDOM.findDOMNode(this.handle);
    const box = ref.getBoundingClientRect();

    let x = Math.trunc((e.pageX - this.state.relX) / this.gridX) * this.gridX;
    let y = Math.trunc((e.pageY - this.state.relY) / this.gridY) * this.gridY;

    // Restricts dragging if element is going left or right of canvas

    if (x < canvasArea.left - 3.2) {
      x = canvasArea.left - 3.2;
    } else if (x > canvasArea.right - box.width + 3.2) {
      x = canvasArea.right - box.width + 3.2;
    }

    // Restricts dragging if element is going above or below of canvas
    if (y < canvasArea.top - 24.4) {
      y = canvasArea.top - 24.4;
    } else if (y > canvasArea.bottom - box.height + 3.2) {
      y = canvasArea.bottom - box.height + 3.2;
    }

    if (x !== this.state.x || y !== this.state.y) {
      this.setState({
        x,
        y,
      });
      this.props.onMove && this.props.onMove(this.state.x, this.state.y);
    }
  }

  onMouseDown(e) {
    if (this.state.locked === false) {
      if (e.button !== 0) return;
      this.onStart(e);
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
      this.setState({
        grabbing: true,
      });
      e.preventDefault();
    }
  }

  onMouseUp(e) {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.props.onStop && this.props.onStop(this.state.x, this.state.y);
    this.setState({
      grabbing: false,
    });
    e.preventDefault();
  }

  onMouseMove(e) {
    this.onMove(e);
    e.preventDefault();
  }

  onTouchStart(e) {
    this.onStart(e.touches[0]);
    document.addEventListener('touchmove', this.onTouchMove, { passive: false });
    document.addEventListener('touchend', this.onTouchEnd, { passive: false });
    e.preventDefault();
  }

  onTouchMove(e) {
    this.onMove(e.touches[0]);
    e.preventDefault();
  }

  onTouchEnd(e) {
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
    this.props.onStop && this.props.onStop(this.state.x, this.state.y);
    e.preventDefault();
  }

  // Toggles the hovering state
  toggleHover = () => {
    if (this.state.hovering === false) {
      this.setState({
        hovering: true,
      });
    } else {
      this.setState({
        hovering: false,
      });
    }
  };

  render() {
    return (
      <div
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        className={styles.draggableContent}
        style={{
          position: 'absolute',
          left: this.state.x,
          top: this.state.y,
        }}
        ref={(div) => {
          this.handle = div;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Draggable;
