import { WebPContext } from '../../Context/WebP';

import Drag from '../../../functions/Drag';
import TextHover from '../../../animation/components/hover/TextHover';
import style from '../../../styles/components/desktop/menuDesktop';

class Menu extends React.Component {
  constructor(props) { 
    super(props);

    this.list = React.createRef();

    this.tl = new TimelineLite({ onComplete: this.startDragger, onReverseComplete: () => this.props.toggleMenu('button')});
  }

  componentDidMount() {
    // NO NEED TO BE OO - JUST USE FUNCTIONAL PROGRAMMING THERE
    document.getElementsByClassName("dragger")[0].click();
    this.tl
      .fromTo('.background_animation_mobile', 0.75, 
        { scaleY: 0 }, { scaleY: 1, ease: 'zwanzig-grad' })
      .staggerFromTo(this.list.current.childNodes, 1,
        { alpha: 0, y: 200 }, { alpha: 1, y: 0, ease: Power4.easeOut }, 0.2, 0.5)
      .staggerFromTo('.stagger_item', 0.5, { yPercent: 100 }, { yPercent: 0 }, 0.15, 0.8);
  }

  componentWillUnmount() {
    TweenLite.set('*', { clearProps: 'cursor' });
    // REMOVE DRAGER EVENT HANDLER
    window.onmouseup = null;
    window.onmousedown = null;
    window.onmousemove = null;
    window.onwheel = null;
    window.oncontextmenu = null;
  }

  componentDidUpdate(prevProps) {
    this.toggleAnimation(prevProps)
  }

  toggleAnimation = (prevProps) => {
    if(prevProps.reverse !== this.props.reverse) {
      if(this.props.reverse)
        this.tl.reverse();
      else 
        this.tl.play();
    }
  }

  startDragger = () => {
    new Drag('.dragger', 'Power4.easeOut', '.gilroy', 1000, 2);
  }

  generateMenu() {
    const menuItems = ['Parkett', 'Treppe', 'Moebel', 'Innenausbau'];
    return menuItems.map(elem => {
      const link = elem.toLowerCase();
      return (
        <li key={elem} onClick={() => this.props.routeHandling(link)}>
          <a className="topic_link_menu">
            <img src={`static/images/${link}/5${this.props.mime}`} alt={`${link} Bild`} />
            <div className="quattrocento quattrocento_normal"><h1 className="stagger_item">{elem}</h1></div>
          </a>
        </li>
      );
    });
  }

  render() {
    const Close = this.props.svg;
    return (
      <>
        <nav className="wrapper dragger">
          <style jsx>{style}</style>
          <ul ref={this.list}>
            {this.generateMenu()}
          </ul>
        </nav>
        <div className="impressum_wrapper">
          <TextHover
            onClick={this.props.routeHandling}
            name="impressum"
            link="impressum"
            duration={0.5}
            bgColor="white"
            color="#C1C12B"
            className="stagger_item"
          />
        </div>
      </>
    );
  }
}

export default (props) => (
  <WebPContext.Consumer>
    {(mime) => <Menu {...props} {...mime} />}
  </WebPContext.Consumer>
);