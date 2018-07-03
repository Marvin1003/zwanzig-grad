import toSpan from '../../functions/toSpan';

export default class extends React.Component {
  constructor(props) {
    super(props);
    
    // REF
    this.loader = React.createRef();
    this.textZwanzig = React.createRef();    
    this.textCookie = React.createRef();
    this.buttonAnimation = React.createRef();
    
    this.animationDone = false; 

    this.duration =  [0.75, 1];
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
    TweenLite.set('.zwanzig-grad', { visibility: 'visible' })
  
    toSpan(this.textZwanzig.current, 'animate_text_zwanzig');

    this.firstTL = new TimelineLite({ onComplete: this.fadeOut });
    this.secondTL = new TimelineLite({ paused: true });
    
    this.firstTL
      .staggerFromTo('.animate_text_zwanzig', this.duration[0], 
        { alpha: 0, x: this.distance }, 
        { alpha: 1, x: 0, ease: Power4.easeOut }, this.cookieMessageStaggerDelay);
  }

  fadeOut = () => {
    const target = '.animate_text_zwanzig';

    const targetSection = document.querySelectorAll('.home_container > section')[0];
    
    const lastTL = new TimelineLite({ onComplete: this.props.removeMe, force3d: true });
    lastTL
      .staggerTo(target, this.duration[0], { opacity: 0, x: -this.distance }, this.cookieMessageStaggerDelay)
      .to(this.loader.current,  this.duration[1], { scaleX: 0, ease: 'zwanzig-grad'}, this.duration[0])
      .to(this.loader.current.parentNode, this.duration[1], { scaleX: 0, onComplete: this.props.removeMe, ease: 'zwanzig-grad' }, this.duration[0] + 0.1)
      
    if(targetSection) {
      lastTL
        .fromTo(targetSection, this.duration[1], 
        { alpha: 1, xPercent: 50, visibility: 'visible' }, 
        { xPercent: 0, ease: 'zwanzig-grad' }, this.duration[0] + 0.1);
    }
  }
  
  render() {
    return (
      <div className="page_transition_wrapper page_transition_initial">
        <div ref={this.loader} className="page_transition didonesque_normal">
          <div ref={this.textZwanzig} className="zwanzig-grad">zwanzig grad</div>
        </div>
      </div>
    );
  }
}