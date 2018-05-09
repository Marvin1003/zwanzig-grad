import { PureComponent } from 'react';
import { Consumer } from '../../components/Context';

import Lazy from '../../components/Utility/LazyLoading';


class AutoSlider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      domPreperation: null,
      type: this.props.type
    };

    this.durations = [
      [this.props.animationDuration, this.props.animationDuration],
      this.props.delay, 
      this.props.showDuration
    ];

    // this.images = Array.from(this.props.images, () => false);

    this.checks = {
      checkHover: false,
      check: false,
      moduloFix: false,
      started: false,
      hoverSlider: false,
      timelineOneComp: false
    };

    this.var = {
      currentImage: null,
      safeNextImage: null,
      nextImage: -1,
      currentIndex: 0,
      timeout: null,
      listener: null
    };

    this.style = {
      imgOuter: {
        position: 'absolute',
        width: 0,
        height: '100%',
        zIndex: 1
      },
      imgInner: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        userSelect: 'none',
      }
    };

    this.startAtFalse = true;
    this.startAutoslider = this.startAutoslider.bind(this);
    this.started = false;
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  startAutoslider(images) {
    if(!this.started) {
      this.images = images;
      this.autoSlider();
      this.started = true;
      
      this.props.hover && this.hoverControl();
    }
  }

  hoverControl() {
    this.links = [...document.getElementsByClassName(this.props.links)];
    for (let i = 0; i < this.links.length; i++) {
      this.links[i].addEventListener('mouseenter', () => this.stopSlider(i));
      this.links[i].addEventListener('mouseleave', (e) => this.resumeSlider(e));
    }
  }

  stopSlider(i) {
    clearTimeout(this.var.timeout);
    this.durations[1] = 0.2;
    this.checks.hoverSlider = true;
    this.var.nextImage = i;
    this.var.currentIndex = this.var.nextImage;

    if (this.checks.timelineOneComp)
      this.timelineIn.play();
  }

  resumeSlider(e) {
    this.checks.hoverSlider = false;

    if (this.checks.timelineOneComp)
      this.handleComplete();
  }

  autoSlider() {
    this.var.currentImage = this.images[this.var.currentIndex].parentNode;

    this.timelineIn = new TimelineLite({
      onComplete: this.handleComplete.bind(this),
      onStart: () => this.checks.timelineOneComp = false
    });

    this.timelineIn
      .to(this.var.currentImage, this.durations[0][0], 
      { width: '100%', ease: 'zwanzig-grad', delay: this.durations[1] })
      .set(this.var.currentImage, { right: 0, left: 'initial' });

    this.timelineOut = new TimelineLite({
      onStart: this.handleNextImage.bind(this),
      paused: true
    });

    this.timelineOut
      .to(this.var.currentImage, this.durations[0][1],
      { width: 0, ease: 'zwanzig-grad' })
      .set(this.var.currentImage, { right: 'initial' });

    this.var.safeNextImage = this.var.currentIndex;
  }

  handleComplete() {
    this.checks.timelineOneComp = true;

    if (!this.checks.hoverSlider)
      this.var.timeout = setTimeout(() => this.timelineOut.play(), this.durations[2] * 1000);
    else if (this.var.nextImage != this.var.safeNextImage)
      this.timelineOut.play();
    else if (this.var.nextImage == this.var.safeNextImage)
      this.timelineOut.pause();
  }

  handleNextImage() {
    if (!this.checks.hoverSlider) {
      this.durations = [[this.props.animationDuration, this.props.animationDuration], this.props.delay, this.props.showDuration];
      this.var.currentIndex = ++this.var.currentIndex % this.images.length;
    }
    this.autoSlider();
  }

  render() {
    if (this.props.lazy)
      return (
        <Lazy
          type={1}
          master={this.props.images}
          imgType="parkett"
          cookie={[]}
          alt={[]}
          imgTag={false}
          style={{position: "absolute"}}
          outerStyle={this.style.imgOuter}
          innerStyle={this.style.imgInner}
          group={true}
          autoSlider={true}
          start={this.startAutoslider}
          class="auto_slider"
          parallaxFix={this.props.scaleFix}
        />
      );
    return (
      <div className="auto_slider">
        {this.state.domPreperation}
      </div>
    );
  }
}

export default (props) => (
  <Consumer>
    {(context) => (
      <AutoSlider {...props} mime={context.mime} />
    )}
  </Consumer>
);
