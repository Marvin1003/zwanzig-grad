import { RouterContext } from '../../Context/Router';

import Link from '../../Utility/Link';
import style from '../../../styles/components/common/header';
import { Menu } from '../../../../static/svg/svg';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.nav = React.createRef();
    this.background = React.createRef();
    this.menuIcon = React.createRef();

    this.scrollTop = 0;
    this.prevScrollTop = 0;
    this.tweening = false;
    this.device = undefined;
  }

  static defaultProps = {
    header: ''
  }
  
  componentDidMount() {
    // REMEMBER POSSIBLE EDGE CASE - BUTTON TRIGGER WHILE FADING OUT NAV
    this.tween = TweenLite.to(this.nav.current, 0.5, { alpha: 0, display: 'none', ease: 'zwanzig-grad', onStart: () => this.tweening = true, onReverseComplete: () => this.tweening = false, paused: true });

    this.navHeight = this.nav.current.clientHeight;

    this.setAlternativeElem();

    window.addEventListener('resize', this.setScrollHeight);
    window.addEventListener('resize', this.setAlternativeElem);

    document.body.addEventListener("scroll", this.animateHeader);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setScrollHeight);
    window.removeEventListener('resize', this.setAlternativeElem);
    
    document.body.removeEventListener("scroll", this.animateHeader)
    try {
      this.alternativeElem.removeEventListener("scroll", this.animateHeader)
    } catch(e) {}
  }

  setAlternativeElem = () => {
    if(window.innerWidth > 1025) {
      this.alternativeElem = document.querySelector('.parallax') || document.querySelector('.root') || document.querySelector('.layout_wrapper');
    } else {
      this.alternativeElem = document.querySelector('.root') || document.querySelector('.layout_wrapper');
    }

    if(this.device !== this.props.device) {
      this.alternativeElem.removeEventListener("scroll", this.animateHeader);
      this.alternativeElem.addEventListener("scroll", this.animateHeader);
    }
    this.device = this.props.device;
  }

  getScrollTop() {
    return parseInt(Math.max(window.pageYOffset, window.scrollY, document.documentElement.scrollTop, document.body.scrollTop, document.scrollingElement.scrollTop, this.alternativeElem.scrollTop, -(this.alternativeElem.getBoundingClientRect().top), 0));
  }

  setScrollHeight = () => {
    this.scrollHeight = Math.max(document.body.scrollHeight, this.alternativeElem.scrollHeight) - window.innerHeight;

    (this.scrollHeight === 0) && this.tween.reverse();
  }

  animateHeader = () => {
    // LAZY FIX - INITIAL SCROLL HEIGHT SOMETIMES DOESNT MATCH SO I MOVED IT FROM COMPONENT DID MOUNT HERE
    this.setScrollHeight();
    this.scrollTop = this.getScrollTop();

    if(!window.APP.menu) {
      if(this.scrollTop > this.prevScrollTop && this.scrollTop >= 0 && this.prevScrollTop >= 0) 
        this.tween.play();
      else if(this.scrollTop < this.scrollHeight - 5)
        this.tween.reverse();
    }

    this.prevScrollTop = this.getScrollTop();
  }

  onClick = () => {
    if(!this.props.menu && !this.tweening) {
      this.props.toggleMenu('button');
    }
  }

  render() {
    return (
      <nav ref={this.nav} className={`standard_nav ${this.props.header}`} >
        <style jsx>{style}</style>
        <Link className="logo header_item pointer" href="">
          <img src="../static/images/logo/logo-256x256.png" alt="20° Logo" />
        </Link>
        <div ref={this.menuIcon} className="menuicon header_item pointer" onClick={this.onClick}>
          <Menu />
        </div>
      </nav>
    );
  }
}

export default (props) => (
  <RouterContext.Consumer>
    {(nextRoute) => <Header {...props} {...nextRoute} />}
  </RouterContext.Consumer>
);