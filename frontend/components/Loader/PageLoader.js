
import { Fragment, PureComponent } from 'react';

import fakeBar from '../../animation/fakeBar';
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
  }

  componentDidMount() {
    fakeBar.call(this, this.loader.current);
    this.props.loadComponent();

    // TO PREVENT OVERSCROLLING ON IOS
    window.addEventListener('touchmove', this.preventTouch, { passive: false });
  }

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.preventTouch, { passive: false });
  }

  preventTouch = (e) => {
    e.preventDefault();
  }

  componentDidUpdate() {
    this.componentReady();
  }

  componentReady = () => {
    if(this.props.pageMounted) {
      toSpan(this.textZwanzig.current, 'animate_text_zwanzig');
      toSpan(this.textCookie.current, 'animate_text_cookie');

      TweenLite.set('.cookie_message', { opacity: 1 });

      this.firstTL = new TimelineLite({ onComplete: this.checkCookie });
      this.secondTL = new TimelineLite({ paused: true });
      
      this.firstTL
        .to(this.loader.current, 1, { scaleX: 1, ease: 'zwanzig-grad' })
        .to(this.loader.current, 1, { scaleY: 1, ease: 'zwanzig-grad'})
        .staggerFromTo('.animate_text_zwanzig', this.cookieMessageDuration, { opacity: 0, x: 150 }, { opacity: 1, x: 0, ease: 'zwanzig-grad' }, this.cookieMessageStaggerDelay)
        .set(this.loader.current.parentNode, { backgroundColor: '#132B51' });
        
      this.secondTL
        .staggerTo('.animate_text_zwanzig', this.cookieMessageDuration, { opacity: 0, x: -150, delay: 0.5 }, this.cookieMessageStaggerDelay)
        .staggerFromTo('.animate_text_cookie', this.cookieMessageDuration, { opacity: 0, x: 150 }, { opacity: 1, x: 0, ease: 'zwanzig-grad' }, this.cookieMessageStaggerDelay)
        .to('.button', 1, { y: -150, ease: 'zwanzig-grad' });
    }
  }
  
  checkCookie = () => {
    document.cookie.includes('loader')
      ? setTimeout(() => this.fadeOut(false), 500)
      : this.secondTL.play();
  }

  fadeOut = (cookieText) => {
    if(cookieText) {
      var target = '.animate_text_cookie';
      var delay = 1.25;
      var duration = 0.5;
    } else {
      var target = '.animate_text_zwanzig';
      var delay = 0.5;
      var duration = 0.75;
    }

    const targetSection = document.querySelectorAll('.home_container > section');
    
    const lastTL = new TimelineLite();

    lastTL
      .to(this.buttonAnimation.current, 0.5, { scaleX: 1 })
      .staggerTo(target, duration, { opacity: 0, x: -150 }, this.cookieMessageStaggerDelay, 0)
      .to(this.loader.current, 1.5, { xPercent: -100, ease: 'zwanzig-grad'}, delay)
      .to(this.loader.current.parentNode, 1.5, { xPercent: -100, onComplete: this.props.removeMe, ease: 'zwanzig-grad' }, delay + 0.1);

    if(targetSection.length > 0) {
      lastTL.fromTo(targetSection[window.APP.nextSection], 1.5, { alpha: 1, xPercent: 50 }, {
          xPercent: 0,
          ease: 'zwanzig-grad'
        }, delay + 0.1);
    }
  }
  
  render() {
    return (
      <Fragment>
        <style jsx>{style}</style>
        <div className="wrapper">
          <div ref={this.loader} className="loader didonesque_normal">
            <div ref={this.textZwanzig} className="cookie_message">zwanzig-grad</div>
            <div ref={this.textCookie} className="cookie_message">Wir nutzen Cookies um Ihnen das angenehmste Erlebnis bieten zu können.</div>
            <button onClick={this.fadeOut} className="button">
              Akzeptieren
              <div ref={this.buttonAnimation} className="buttonAnimation" />
            </button>
            </div>
        </div>
      </Fragment>
    )
  }
}