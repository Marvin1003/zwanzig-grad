
import { PureComponent } from 'react';
import toSpan from '../../functions/helper/toSpan';
import style from '../../styles/components/common/pageLoader';

export default class extends PureComponent {
  constructor(props) {
    super(props);
    
    // REF
    this.loader = React.createRef();
    this.textZwanzig = React.createRef();    
    this.textCookie = React.createRef();
    this.buttonAnimation = React.createRef();
    
    this.animationDone = false; 

    this.cookieMessageDuration =  0.75;
    this.cookieMessageStaggerDelay = 0.04;
    this.distance = 200;
  }

  componentDidMount() {
    this.componentReady();

    // TO PREVENT OVERSCROLLING ON IOS
    window.addEventListener('touchmove', this.preventTouch, { passive: false });
  }

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.preventTouch, { passive: false });
  }

  preventTouch = (e) => {
    e.preventDefault();
  }

  componentReady = () => {
    TweenLite.set('.cookie_message', { visibility: 'visible' })
  
    toSpan(this.textZwanzig.current, 'animate_text_zwanzig');

    this.firstTL = new TimelineLite({ onComplete: this.fadeOut });
    this.secondTL = new TimelineLite({ paused: true });
    
    this.firstTL
      .staggerFromTo('.animate_text_zwanzig', this.cookieMessageDuration, 
        { alpha: 0, x: this.distance }, 
        { alpha: 1, x: 0, ease: Power4.easeOut }, this.cookieMessageStaggerDelay);
  }

  fadeOut = () => {
    const target = '.animate_text_zwanzig';
    const duration = 0.75;

    const targetSection = document.querySelectorAll('.home_container > section')[0];
    
    const lastTL = new TimelineLite({ onComplete: this.props.removeMe });

    lastTL
      .to(this.buttonAnimation.current, 0.5, { scaleX: 1 })
      .staggerTo(target, duration, { opacity: 0, x: -this.distance }, this.cookieMessageStaggerDelay)
      .to(this.loader.current, 1.5, { xPercent: -100, ease: 'zwanzig-grad'}, "-=0.5")
      .to(this.loader.current.parentNode, 1.5, { xPercent: -100, onComplete: this.props.removeMe, ease: 'zwanzig-grad' }, "-=1.4");

    if(targetSection) {
      lastTL.fromTo(targetSection, 1.5, 
        { alpha: 1, xPercent: 50, visibility: 'visible' }, 
        { xPercent: 0, ease: 'zwanzig-grad' }, 1.2);
    }
  }
  
  render() {
    return (
      <div className="wrapper">
        <style jsx>{style}</style>
        <div ref={this.loader} className="loader didonesque_normal">
          <div ref={this.textZwanzig} className="cookie_message">zwanzig-grad</div>
          <button onClick={this.fadeOut} className="button">
            <span className="button_text">Akzeptieren</span>
            <div ref={this.buttonAnimation} className="buttonAnimation" />
          </button>
          </div>
      </div>
    );
  }
}