import { Component } from "react";

import nextIndex from "helper/nextIndex";

import imageData from "static/json/homeImages.json";

export default class TextAnimation extends Component {
  headline = React.createRef();
  headlines = [];
  next = 0;

  constructor(props) {
    super(props);
    for (const key in imageData.source) {
      this.headlines.push(key);
    }
  }

  routeHandler = () => {
    if (window.innerWidth <= 1024) {
      this.props.nextRoute(this.headlines[this.next]);
    }
  };

  update = type => {
    const yPercent = type === "next" ? -100 : 100;

    const headlineTL = new TimelineLite();

    this.next = nextIndex(type, this.props.current, this.headlines.length);

    const handleComplete = () => {
      const headlineTL2 = new TimelineLite();

      headlineTL2.fromTo(
        this.headline.current,
        this.props.duration / 2,
        { yPercent: -yPercent },
        { yPercent: 0, ease: "zwanzig-grad" }
      );
    };

    headlineTL
      .fromTo(
        this.headline.current,
        this.props.duration / 2,
        { yPercent: 0 },
        { yPercent, ease: "zwanzig-grad" }
      )
      .set(this.headline.current, {
        text: this.headlines[this.next],
        onComplete: handleComplete
      });
  };

  render() {
    return (
      <div className="topic_container" onClick={this.routeHandler}>
        <h1 ref={this.headline} className="topic quattrocento_normal">
          {this.headlines[this.props.current]}
        </h1>
      </div>
    );
  }
}

// if(!initial) {
//   var headlineTL = new TimelineLite();
//   const headlineTL2 = new TimelineLite({ onComplete: handleComplete, paused: true });

//   headlineTL
//     .fromTo(headline, headlineDuration,
//       { yPercent: 0 },
//       { yPercent , ease: 'zwanzig-grad' })
//     .set(headline, { text: headlineArr[window.APP.nextSection], onComplete: () => {
//       headlineTL2.play();

//       headlineTL2.fromTo(headline, headlineDuration,
//         { yPercent: -yPercent },
//         { yPercent: 0, ease: 'zwanzig-grad' });
//     }
//   })
// } else {
//   var headlineTL = new TimelineLite({ onComplete: handleComplete });

//   headlineTL
//     .set(headline, { text: headlineArr[window.APP.nextSection] })
//     .fromTo(headline, headlineDuration + 0.5,
//       { yPercent }, { yPercent: 0, ease: 'zwanzig-grad' });
// }
// }
