import { Component } from "react";
import dynamic from "next/dynamic";

import { RouterContext } from "components/Context/Router";
import { WebPContext } from "components/Context/WebP";
import { DeviceContext } from "components/Context/Device";

import App from "components/App";

import TextAnimation from "components/TextAnimation/TextAnimation";
import Indicator from "components/Indicator/Indicator";

import Link from "components/Utility/Link";

import Arrows from "components/Arrows/Arrows";

import styles from "styles/pages/index";

const Slider = dynamic(import("components/Slider/Slider"), { ssr: false });
const SliderRef = React.forwardRef((props, ref) => (
  <Slider {...props} forwardedRef={ref} />
));

class Home extends Component {
  headline = React.createRef();
  indicator = React.createRef();
  arrows = React.createRef();
  slider = React.createRef();

  allow = true;
  threshold = 50;
  running = false;

  duration = 1;

  touch = {
    prev: null,
    curr: null
  };

  state = {
    current: 0,
    running: false,
    ready: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.loader && this.state.ready)
      this.toggleEventListener("addEventListener");
  }

  componentWillUnmount() {
    this.toggleEventListener("removeEventListener");
  }

  toggleEventListener(type) {
    window[type]("wheel", this.autoScroll);
    window[type]("touchend", this.autoScroll);
    window[type]("keyup", this.autoScroll);
    window[type]("touchstart", this.safePrevTouch);
    window[type]("touchmove", this.preventDefault, {
      passive: false
    });
  }

  setReady = () => {
    this.setState({ ready: true });
  };

  preventDefault(e) {
    e.preventDefault();
  }

  autoScroll = e => {
    const type = e.type;

    switch (type) {
      case "wheel":
        const currY = e.deltaY;

        if (Math.abs(currY) > this.threshold && this.allow) {
          this.allow = false;

          if (currY < 0) this.updateSlider("prev");
          else if (currY > 0) this.updateSlider("next");
        } else {
          this.allow = true;
        }
        break;
      case "touchend":
        this.touch.curr = e.changedTouches[0];

        const xDiff = Math.abs(
          this.touch.curr.clientX - this.touch.prev.clientX
        );
        const yDiff = Math.abs(
          this.touch.curr.clientY - this.touch.prev.clientY
        );

        if (xDiff > this.threshold || yDiff > this.threshold) {
          if (yDiff > xDiff) {
            if (this.touch.curr.clientY > this.touch.prev.clientY)
              this.updateSlider("prev");
            else if (this.touch.curr.clientY < this.touch.prev.clientY)
              this.updateSlider("next");
          }
          if (xDiff > yDiff) {
            if (this.touch.curr.clientX < this.touch.prev.clientX)
              this.updateSlider("next");
            else if (this.touch.curr.clientX > this.touch.prev.clientX)
              this.updateSlider("prev");
          }
        }
        break;
      case "keyup":
        if (e.keyCode === 38 || e.keyCode === 37) this.updateSlider("prev");
        else if (e.keyCode === 40 || e.keyCode === 39 || e.keyCode === 32)
          this.updateSlider("next");
        break;
    }
  };

  safePrevTouch = e => {
    this.touch.prev = e.changedTouches[0];
  };

  updateSlider = (type, diashow = true) => {
    if (!this.state.running) {
      this.setState({ running: true });
      this.slider.current.slide(type);
      this.headline.current.update(type);
      this.indicator.current.update(type);

      if (diashow) this.arrows.current.slide(type);
    }
  };

  updateCurrent = val => {
    this.setState(({ current }) => {
      if (current !== val) {
        return { current: val, running: false };
      }
      return null;
    });
  };

  render() {
    return (
      <App title="Home" header="header_home" className="layout_wrapper">
        <style jsx global>
          {styles}
        </style>
        <div className="layout futura_normal">
          {/* <Cursor /> */}
          <TextAnimation
            ref={this.headline}
            current={this.state.current}
            duration={this.duration}
            nextRoute={this.props.nextRoute}
          />
          <Indicator
            ref={this.indicator}
            current={this.state.current}
            duration={this.duration}
            length={4}
          />
          <div className="home_buttons side">
            {this.state.ready && (
              <Arrows
                ref={this.arrows}
                running={this.state.running}
                updateSlider={this.updateSlider}
                duration={this.duration}
                loader={this.props.loader}
              />
            )}
          </div>
          {/* <Link className="left links" href="">werte</Link> */}
          <a className="left links pointer font_medium">team</a>
          <Link className="right links pointer font_medium" href="kontakt">
            kontakt
          </Link>
        </div>
        <SliderRef
          ref={this.slider}
          current={this.state.current}
          updateCurrent={this.updateCurrent}
          length={4}
          duration={this.duration}
          mime={this.props.mime}
          setReady={this.setReady}
        />
      </App>
    );
  }
}

export default props => (
  <RouterContext.Consumer>
    {nextRoute => (
      <WebPContext.Consumer>
        {mime => (
          <DeviceContext.Consumer>
            {target => <Home {...props} {...nextRoute} {...mime} {...target} />}
          </DeviceContext.Consumer>
        )}
      </WebPContext.Consumer>
    )}
  </RouterContext.Consumer>
);

// componentDidMount() {
//   this.setState({ currentLink: this.headlines[window.APP.nextSection] });

//   window.APP.sectionAmount = Object.keys(images.source).length;
//   window.APP.nextTopic = nextTopic.bind(this, this.headlines, this.colors);

//   // FIX SOME CASES
//   if (window.APP.menu) window.APP.menu = false;

//   // INITIAL
//   this.current.current.innerText = `0${window.APP.nextSection + 1}`;
//   this.amount.current.innerText = `0${window.APP.sectionAmount}`;
// }

// componentDidUpdate(prevProps) {
//   // if (this.props.mime && !this.props.loader) {
//   //   this.autoScroll();
//   //   this.cursorPreperation();
//   // }

//   // UPDATE CURRENT LINK
//   if (
//     prevProps.menu !== this.props.menu ||
//     (prevProps.device !== this.props.device && this.props.mime)
//   ) {
//     this.toggleCursor();
//   }
// }

// componentWillUnmount() {
//   TweenLite.set("*", { clearProps: "cursor" });
//   if (this.props.device === "desktop") {
//     window.removeEventListener("mousedown", this.play);
//     window.removeEventListener("mouseup", this.reverse);
//     window.removeEventListener("contextmenu", this.reverse);
//     window.removeEventListener("mousemove", this.moveCursor);
//   }
// }
