import { Component } from "react";

import SVGCircle from "components/Circle/Circle";

export default class Arrows extends Component {
  container = React.createRef();
  next = React.createRef();
  allowHover = true;
  diashowDuration = 15;
  stroke = 301.593;
  speedUp = false;

  state = {
    diashowRunning: true
  };

  static defaultProps = {
    className: ""
  };

  componentDidMount() {
    if (!this.props.loader) this.initiate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loader !== this.props.loader && !this.props.loader)
      this.initiate();
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.next.current.stopDiashow);
  }

  initiate() {
    this.next.current.startDiashow(() => this.props.updateSlider("next"), true);

    // ON MOBILE GO FOR ONCLICK INTERRUPT
    window.addEventListener("mousemove", this.next.current.stopDiashow);
  }
  slide(type) {
    this.next.current.slide(type);
  }

  render() {
    return (
      <div ref={this.container}>
        <SVGCircle
          className="prev svg_hover pointer"
          type="prev"
          running={this.running}
          diashowRunning={this.state.diashowRunning}
          updateSlider={this.props.updateSlider}
          duration={this.props.duration}
          diashow={false}
        />
        <SVGCircle
          ref={this.next}
          className="next svg_hover pointer"
          type="next"
          running={this.running}
          diashowRunning={this.state.diashowRunning}
          updateSlider={this.props.updateSlider}
          duration={this.props.duration}
          diashow={true}
        />
      </div>
    );
  }
}
