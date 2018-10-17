import { Component } from "react";

import nextIndex from "helper/nextIndex";

export default class Indicator extends Component {
  current = React.createRef();
  amount = React.createRef();

  state = {
    current: 1
  };

  update(type) {
    const next = nextIndex(type, this.props.current, this.props.length) + 1;

    this.setState(({ current }) => {
      if (current !== next) return { current: next };
      return null;
    });
  }

  render() {
    return (
      <div className="current_section side">
        <span ref={this.current} className="sec_current">
          0{this.state.current}
        </span>
        /
        <span ref={this.amount} className="sec_amount">
          0{this.props.length}
        </span>
      </div>
    );
  }
}
