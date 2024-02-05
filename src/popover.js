import { h, Component, createRef } from 'preact';
import './popover.css';

class Popover extends Component {
  constructor(props) {
    super(props);
  }

  render({content, placement = 'bottom' }) {
    return (
      <div className="popover-container">
        <div className={`popover-content popover-${placement}`}>
          {content}
        </div>
      </div>
    );
  }
}

export default Popover;
