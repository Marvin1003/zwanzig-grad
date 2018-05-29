import { RouterContext } from '../Context/Router';

import Lazy from '../Utility/LazyLoading';

import nextData from '../../../static/json/nextTransitionData.json';
import style from '../../styles/components/common/secNext';

class SecNext extends React.Component {
  constructor(props) {
    super(props);
    this.duration = 0.75;
    this.hovering = false;
    this.clicked = false;
    this.ready = true;
    this.next = this.props.next.toLowerCase();
  }

  componentDidMount() {
    this.alternativeElem = document.getElementsByClassName('parallax')[0];
    this.tween = TweenLite.to('.sec_next_wrapper', this.duration, { height: '50%', top: '50%', ease: 'zwanzig-grad', paused: true, onComplete: this.handleCompleteSec });

    this.setHeight();
    window.addEventListener('resize', this.setHeight);
  }

  setHeight() {
    TweenLite.set('.sec_next', { height: window.innerHeight });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  preventEvent(e) {
    e.preventDefault();
  }

  setScrollHeight = () => {
    this.scrollHeight = Math.max(document.body.scrollHeight, this.alternativeElem.scrollHeight) - window.innerHeight;
  }

  removeListener() {
    window.removeEventListener("wheel", this.preventEvent);
    window.removeEventListener('resize', this.setHeight);
    this.alternativeElem.removeEventListener("wheel", this.preventEvent);
    this.alternativeElem.removeEventListener("touchmove", this.preventEvent);
  }

  animate = () => {
    this.setScrollHeight();

    window.addEventListener("wheel", this.preventEvent);
    this.alternativeElem.addEventListener("touchmove", this.preventEvent);
    if(!this.hovering && this.ready) {
      this.ready = false;
      const tl = new TimelineLite({ onComplete: this.handleComplete });

      if(window.innerWidth > 1024) {
        tl.set(this.alternativeElem, { scrollTo: this.scrollHeight, ease: 'zwanzig-grad' })
          .to('.sec_next_topic > h1', this.duration, { yPercent: -110, ease: Power4.easeOut })
          .to('.sec_next_image_background', this.duration, { scaleY: 1, ease: 'zwanzig-grad' }, 0)
          .set('.sec_next_wrapper', { display: 'none' })
          .to('.sec_next_background', this.duration + 0.25, { 
            height: nextData[this.next].height,
            width: nextData[this.next].width, 
            top: nextData[this.next].top, 
            right: nextData[this.next].right, 
            bottom: nextData[this.next].bottom, 
            left: nextData[this.next].left,
            ease: 'zwanzig-grad'
          });
          
      } else {
        tl.set(document.body, { scrollTo: this.scrollHeight, ease: 'zwanzig-grad' })
          .to('.sec_next_topic > h1', this.duration, { yPercent: -110, ease: Power4.easeOut })
          .to('.sec_next_image_background', this.duration, { scaleY: 1, ease: 'zwanzig-grad' }, 0)
          .set('.sec_next_wrapper', { display: 'none' })
          .to('.sec_next_background', this.duration, { transform: 'translateY(50vh)', ease: 'zwanzig-grad' });
      }
      
    } else {
      this.clicked = true
    }
  }

  handleComplete = () => {
    this.ready = true;
    this.props.nextRoute(this.next, true);
    this.removeListener();
  }

  handleCompleteSec = () => {
    this.hovering = false;
    this.clicked && this.animate();
  }  

  onClick = () => {
    this.tween.play();
  }

  hoverPlay = () => {
    if(window.innerWidth > 1024) {
      this.hovering = true;
      this.tween.play();
    }
  }

  hoverReverse = () => {
    if(window.innerWidth > 1024) {
      this.hovering = false;
      if(!this.clicked)
        this.tween.reverse();
    }
  }

  render() {
    return (
      <section className="section sec_next">
        <style jsx>{style}</style>
        <div className="sec_next_wrapper">
          <div onClick={this.animate} onMouseEnter={this.hoverPlay} onMouseLeave={this.hoverReverse}className="sec_next_topic"><h1 className="quattrocento_normal">{this.props.next}</h1></div>
          <div onClick={this.animate} onMouseEnter={this.hoverPlay} onMouseLeave={this.hoverReverse} className="sec_next_image">
            <Lazy
              lazy={false}
              master={5}
              imgType={this.next}
              alt={this.next + 5}
              imgTag={false}
            />
            <div className="sec_next_image_background" />
          </div>
        </div>
        <div className="sec_next_background" />
      </section>
    );
  }
};

export default (props) => (  
  <RouterContext.Consumer>
    {(nextRoute) => <SecNext {...props} {...nextRoute} />}
  </RouterContext.Consumer>
);