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
  }

  static defaultProps = {
    header: ''
  }
  
  componentDidMount() {
    // REMEMBER POSSIBLE EDGE CASE - BUTTON TRIGGER WHILE FADING OUT NAV
    this.tween = TweenLite.to(this.nav.current, 0.5, { alpha: 0, display: 'none', ease: 'zwanzig-grad', onStart: () => this.tweening = true, onReverseComplete: () => this.tweening = false, paused: true });

    this.navHeight = this.nav.current.clientHeight;

    this.alternativeElem = document.querySelector('.parallax') || document.querySelector('.container') || document.querySelector('.layout_wrapper');

    window.addEventListener('resize', this.setScrollHeight);
    document.body.addEventListener("scroll", this.animateHeader)
    try {
      this.alternativeElem.addEventListener("scroll", this.animateHeader)
    } catch(e) { console.log(e) }
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.setScrollHeight);
    window.removeEventListener("resize", this.setMaxY);
    document.body.removeEventListener("scroll", this.animateHeader)
    try {
      this.alternativeElem.removeEventListener("scroll", this.animateHeader)
    } catch(e) {}
  }

  getScrollTop() {
    return parseInt(Math.max(window.pageYOffset, window.scrollY, document.documentElement.scrollTop, document.body.scrollTop, document.scrollingElement.scrollTop, this.alternativeElem.scrollTop, -(this.alternativeElem.getBoundingClientRect().top), 0));
  }

  setScrollHeight = () => {
    this.scrollHeight = Math.max(document.body.scrollHeight, this.alternativeElem.scrollHeight) - window.innerHeight;
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
          <img src="../static/images/Logo.png" alt="20° Logo" />
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

// <div
//             className="menu_icon"
//             onClick={this.onClick}
//             onMouseEnter={() => this.tl.play()}
//             onMouseLeave={() => this.tl.reverse()}
//             >
//             <div>
//               <div />
//               <div />
//             </div>
//             <div>
//               <div />
//               <div />
//             </div>
//             <div>
//               <div />
//               <div />
//             </div>
          // </div>
// OBSOLETE HAMBURGER

  // const tl = new TimelineLite({ paused: true });
  // CURRYING TO PREVENT RECREATING FUNCTION
  // const menuIconHover = (bool) => (e) => {
  //   tl.staggerTo('.menu_icon > div', 0.75, { x: 10, ease: 'zwanzig-grad' }, 0.1);
  //   bool ?
  //     tl.play() :
  //     tl.reverse();
  // };
