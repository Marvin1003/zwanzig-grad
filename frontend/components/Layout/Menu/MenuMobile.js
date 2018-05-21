import style from '../../../styles/components/mobile/menuMobile';
import Link from '../../Utility/Link';

export default class extends React.Component {
  menuItems = ['Parkett', 'Treppe', 'Moebel', 'Innenausbau'].map(elem => (
    <li key={elem} className="mobile_menu_headline quattrocento_normal" 
      onClick={() => this.props.routeHandling(elem.toLowerCase())}>
      <a>{elem}</a>
    </li>
  ));

  constructor(props) {
    super(props);

    this.backgroundAnimation = React.createRef();

    this.tl = new TimelineLite({ onReverseComplete: () => this.props.toggleMenu('button') });
  }

  componentDidMount() {
    this.tl
      .fromTo('.background_animation_mobile', 0.75, 
        { scaleY: 0 }, { scaleY: 1, ease: 'zwanzig-grad' })
      .staggerFromTo('.mobile_menu_headline', 0.75, 
        { alpha: 0, y: 100 }, { alpha: 1, y: 0, ease: Power4.easeOut }, 0.075, 0.5)
      .staggerFromTo('.stagger_item', 0.5, { alpha: 0, y: 100 }, { alpha: 1, y: 0, ease: Power4.easeOut }, 0.075, 0.9)
      .fromTo('.stroke', 0.5, { scaleX: 0 }, { scaleX: 1, ease: 'zwanzig-grad' }, 1);
  }

  toggleAnimation = (prevProps) => {
    if(prevProps.reverse !== this.props.reverse) {
      this.props.reverse
        ? this.tl.reverse()
        : this.tl.play();
    }
  }

  componentDidUpdate(prevProps) {
    this.toggleAnimation(prevProps)
  }

  render() {
    const Close = this.props.svg;
    return (
      <>
        <nav className="menuMobile futura_normal">
          <style jsx>{style}</style> 
          <div className="wrapper">
            <ul>
              {this.menuItems}
            </ul>
            <hr className="stroke" />
            <div className="info_container">
              <div className="adresse info_menu stagger_item">
                <h3 className="didonesque_normal">Adresse</h3>
                <span>Wertherstraße 310</span>
                <span>33639 Bielefeld</span>
                <span>Germany</span>
              </div>
              <div className="kontakt info_menu stagger_item">
                <h3 className="didonesque_normal">Kontakt</h3>
                <span><a href="tel:+49 171 64 30 96 2">+49 171 64 30 96 2</a></span>
                <span><a href="tel:+49 521 52 14 00 2">+49 521 52 14 00 2</a></span>
                <span><a href="mailto:info@zwanzig-grad.de">info@zwanzig-grad.de</a></span>
              </div>
            </div>
          </div>
          <a onClick={() => this.props.routeHandling('impressum')} className="corner_buttons impressum stagger_item">Impressum</a>
        </nav>
      </>
    );
  }
}
