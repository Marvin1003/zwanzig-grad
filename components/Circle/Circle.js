import { Component } from "react";

import { Arrow } from "static/svg/svg.js";

import styles from "./CircleStyles";

export default class SVGCircle extends Component {
  container = React.createRef();
  diashowDuration = 15;
  stroke = 301.593;
  running = false;

  static defaultProps = {
    className: ""
  };

  componentDidMount() {
    this.circle = this.container.current.querySelector("circle");
  }

  stopDiashow = () => {
    if (this.props.running || this.running) return false;

    this.tl3 &&
      TweenLite.to(this.tl3, 0.5, {
        progress: 0,
        onComplete: () => {
          this.tl3.kill();
          !this.props.running && this.startDiashow();
        }
      });
  };

  startDiashow(cb) {
    this.tl3 = new TimelineLite({
      onComplete: () => {
        cb && cb();

        TweenLite.to(this.circle, 0.5, {
          alpha: 0,
          ease: Power4.easeOut,
          onComplete: () => this.tl3.restart()
        });
      }
    });

    this.tl3.set(this.circle, { alpha: 1 }).fromTo(
      this.circle,
      this.diashowDuration - 0.5,
      {
        strokeDasharray: this.stroke,
        strokeDashoffset: this.stroke
      },
      { strokeDashoffset: 0, ease: Power0.easeNone, ease: Power0.easeNone }
    );
  }

  clickHandler = () => {
    this.slide(this.props.type, true);
  };

  slide = (type, click) => {
    type = typeof type === "string" ? type : this.props.type;
    const strokeDashoffset = type === "next" ? 0 : this.stroke;

    if (!this.props.running && !this.running) {
      this.running = true;
      click && this.props.updateSlider("next", false);

      this.tl3 && this.tl3.pause();

      const tl = new TimelineLite({
        onComplete: () => {
          this.props.diashow && this.tl3.restart();
          this.running = false;
        }
      });

      tl.set(this.circle, { alpha: 1 })
        .to(this.circle, this.props.duration - 0.5, {
          strokeDashoffset,
          ease: Power4.easeOut
        })
        .to(this.circle, 0.5, {
          alpha: 0,
          ease: Power4.easeOut
        })
        .set(this.circle, {
          strokeDasharray: this.stroke,
          strokeDashoffset: this.stroke
        });
    }
  };

  render() {
    return (
      <div
        ref={this.container}
        className={`svg_container ${this.props.className}`}
        // onMouseEnter={this.hover("play")}
        // onMouseLeave={this.hover("reverse")}
        onClick={this.clickHandler}
      >
        <style jsx global>
          {styles}
        </style>
        <Arrow />
      </div>
    );
  }
}
