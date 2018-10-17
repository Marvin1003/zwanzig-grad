import { Component } from "react";

import SVG from "components/Circle/Circle";

class Cursor extends Component {
  cursorPreperation = () => {
    if (this.props.device === "desktop") {
      this.cursor = document.getElementsByClassName("cursor_home")[0];
      this.circle = this.cursor.querySelector("circle");

      TweenLite.set("*:not(.pointer)", { cursor: "none" });
      window.addEventListener("mousemove", this.moveCursor);

      const handleComplete = () => {
        if (!this.props.menu && !this.pointer) {
          window.removeEventListener("mouseup", this.reverse);
          this.props.nextRoute(this.state.currentLink);
        } else {
          this.reverse();
        }
      };

      this.tween = TweenLite.fromTo(
        this.circle,
        1.5,
        { alpha: 1 },
        {
          strokeDashoffset: 0,
          ease: Power0.easeNone,
          paused: true,
          onComplete: handleComplete
        }
      );
      window.addEventListener("mousedown", this.play);
      window.addEventListener("mouseup", this.reverse);
      window.addEventListener("contextmenu", this.reverse);
    }
  };

  animateCircle = type => {
    if (this.props.device === "desktop") {
      if (type === "play") this.tween.play();
      else this.tween.reverse();
    }
  };

  toggleCursor = () => {
    if (window.APP.menu || this.props.device === "mobile") {
      try {
        TweenLite.set("*", { clearProps: "cursor" });
        TweenLite.set(this.cursor, { display: "none" });
      } catch (e) {}
      window.removeEventListener("mousemove", this.moveCursor);
    } else {
      try {
        TweenLite.set("*:not(.pointer)", { cursor: "none" });
        TweenLite.set(this.cursor, { display: "initial" });
      } catch (e) {}
      window.addEventListener("mousemove", this.moveCursor);
    }
  };

  moveCursor = e => {
    if (this.cursor) {
      this.pointer = e.target.classList.contains("pointer");
      TweenLite.set(this.cursor, {
        display: "initial",
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50
      });

      this.pointer
        ? TweenLite.set(this.cursor, { visibility: "hidden" })
        : TweenLite.set(this.cursor, { visibility: "visible" });
    }
  };

  render() {
    return (

    )
  }
}