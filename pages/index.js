import dynamic from "next/dynamic";

import { PureComponent } from 'react';
import App from '../frontend/components/App';

import { RouterContext } from '../frontend/components/Context/Router';
import { WebPContext } from '../frontend/components/Context/WebP';
import { DeviceContext } from '../frontend/components/Context/Device';

import Link from '../frontend/components/Utility/Link';

// ANIMATION
const SnakeNSwitch = dynamic(import('../frontend/animation/components/SnakeNSwitch'), { loading: () => null });
import SVGCircle from '../frontend/animation/components/hover/SVGCircle';

// FUNCTIONS
import autoScroll from '../frontend/functions/autoScroll';
import nextTopic from '../frontend/animation/nextTopic';
import runOnce from '../frontend/functions/runOnce';

import images from '../static/json/homeImages.json';

import style from '../frontend/styles/pages/index';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentLink: null }
    // REFS
    this.container = React.createRef();
    this.current = React.createRef();
    this.amount = React.createRef();
    this.headlineWrapper = React.createRef();
    this.subTextWrapper = React.createRef();

    this.headlines = [];
    this.colors = [];

    for(const key in images.source) {
      this.colors.push(images.source[key].color);
      this.headlines.push(key);
    }

    this.initialTextAnimation = runOnce(this.initialTextAnimation);
    this.autoScroll = runOnce(autoScroll);
    
    this.pointer = null;
  }

  componentDidMount() {
    this.setState({ currentLink: this.headlines[window.APP.nextSection] });
    
    window.APP.sectionAmount = Object.keys(images.source).length;
    window.APP.nextTopic = nextTopic.bind(this, this.headlines, this.colors);

    // FIX SOME CASES
    if(window.APP.menu) 
      window.APP.menu = false;

    // INITIAL
    this.current.current.innerText = `0${window.APP.nextSection + 1}`;
    this.amount.current.innerText = `0${window.APP.sectionAmount}`;
  }

  componentDidUpdate(prevProps) {
    if(this.props.mime && !this.props.loader) {
      this.autoScroll();
      this.cursorPreperation();
    }
      
    // UPDATE CURRENT LINK
    if((prevProps.menu !== this.props.menu) || (prevProps.device !== this.props.device) && this.props.mime) {
      this.toggleCursor();
    }
  }

  componentWillUnmount() {
    TweenLite.set('*', {clearProps: 'cursor' });
    if(this.props.device === 'desktop') {
      window.removeEventListener('mousedown', this.play);
      window.removeEventListener('mouseup', this.reverse);
      window.removeEventListener('contextmenu', this.reverse);
      window.removeEventListener('mousemove', this.moveCursor);
    }
  }

  cursorPreperation = () => {
    if(this.props.device === 'desktop') {
      this.cursor = document.getElementsByClassName('cursor_home')[0];
      this.circle = this.cursor.querySelector('circle');

      TweenLite.set('*:not(.pointer)', { cursor: 'none' });
      window.addEventListener('mousemove', this.moveCursor);

      const handleComplete = () => {
        if(!this.props.menu && !this.pointer) {
          window.removeEventListener('mouseup', this.reverse);
          this.props.nextRoute(this.state.currentLink);
        }
        else {
          this.reverse();
        }
      }
  
      this.tween = TweenLite.fromTo(this.circle, 1.5, { alpha: 1 },
        { strokeDashoffset: 0, ease: Power0.easeNone, paused: true, onComplete: handleComplete });
      window.addEventListener('mousedown', this.play);
      window.addEventListener('mouseup', this.reverse);
      window.addEventListener('contextmenu', this.reverse);
    }
  }

  play = () => {
    !window.APP.autoScrolling && !this.pointer && this.animateCircle('play');
  }

  reverse = () => {
     !window.APP.autoScrolling && this.animateCircle('reverse');
  }

  animateCircle = (type) => {
    if(this.props.device === 'desktop') {
      if(type === 'play')
        this.tween.play()
      else
        this.tween.reverse();
    }
  }

  toggleCursor = () => {
    if(window.APP.menu || this.props.device === 'mobile') {
      try {
        TweenLite.set('*', { clearProps: 'cursor' });
        TweenLite.set(this.cursor, { display: 'none' });
      } catch(e) { }
      window.removeEventListener('mousemove', this.moveCursor);
    } else {
      try {
        TweenLite.set('*:not(.pointer)', { cursor: 'none' });
        TweenLite.set(this.cursor, { display: 'initial' });
      } catch(e) { }
      window.addEventListener('mousemove', this.moveCursor);
    }
  }

  moveCursor = (e) => {
    if(this.cursor) {
      this.pointer = e.target.classList.contains('pointer');
      TweenLite.set(this.cursor, 
        { display: 'initial', x: e.clientX, y: e.clientY, xPercent: -50, yPercent: -50 });

      this.pointer
        ? TweenLite.set(this.cursor, { visibility: 'hidden' })
        : TweenLite.set(this.cursor, { visibility: 'visible' });
      }
  }

  updateCurrentLink = () => {
    this.setState((prevState) => (
      prevState.currentLink !== this.headlines[window.APP.nextSection]
        ? { currentLink: this.headlines[window.APP.nextSection] }
        : null
    ));
  }
  
  routeHandler = () => {
    if(window.innerWidth <= 1024) {
      this.props.nextRoute(this.state.currentLink);
    } 
  }

  renderComponent(device) {
    if(device === 'desktop') {
      return (
        <>
          <SVGCircle hover={false} currentLink={this.state.currentLink} className="cursor_home" />
          <div ref={this.container} className="snake_container">
            <SnakeNSwitch currentLink={this.state.currentLink} wrapper={this.container} images={images.source} sets={images.sizes} loader={this.props.loader} />
          </div>
        </>
      );
    }
    return null;
  }

  render() {
    return (
      <App title="Home" header="header_home" className='layout_wrapper'>      
        <style jsx>{style}</style>
        <div className="layout futura_normal">
          <div className="topic_container" onClick={this.routeHandler}><h1 className="topic quattrocento_normal" /></div>
          <div className="current_section side">
            <span ref={this.current} className="sec_current" />
            /
            <span ref={this.amount} className="sec_amount" />
          </div>
          <div className="home_buttons side">
            <SVGCircle hover={true} className="prev svg_hover pointer" />
            <SVGCircle hover={true} className="next svg_hover pointer" />
          </div>
          {/* <Link className="left links" href="">werte</Link> */}
          <a className="left links pointer font_medium">team</a>
          <Link className="right links pointer font_medium" href="kontakt">kontakt</Link>
        </div>
        <div className="home_container">
          <Background content={this.headlines} mime={this.props.mime} />
        </div>
        {this.renderComponent(this.props.device)}
      </App>
    );
  }
}

const Background = ({ content, mime }) => {
  if(mime) {
    return (
      content.map((image, i) => (
        <section className="section_background_wrapper" key={image} style={{ overflow: "hidden", visibility: 'hidden' }}>
          <section className="background_center section_background" 
            style={{ backgroundImage: `url(../../static/images/${image}/5${mime})` }} />
        </section>
      ))
    );
  } return null;
}

export default (props) => (
  <RouterContext.Consumer> 
    {(nextRoute) => (
      <WebPContext.Consumer>
        {(mime) => (
          <DeviceContext.Consumer>
            {(target) => <Home {...props} {...nextRoute} {...mime} {...target} /> }
          </DeviceContext.Consumer>
        )}
      </WebPContext.Consumer>
    )}
  </RouterContext.Consumer>
);