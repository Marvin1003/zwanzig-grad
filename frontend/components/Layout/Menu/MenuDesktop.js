import { PureComponent, Fragment } from 'react';
import Drag from '../../../functions/Drag';
import TextHover from '../../../animation/components/hover/TextHover';
import style from '../../../styles/components/desktop/menuDesktop';

export default class extends PureComponent {
  componentDidMount() {
    // NO NEED TO BE OO - JUST USE FUNCTIONAL PROGRAMMING THERE
    new Drag('.dragger', 'Expo.easeOut', '.gilroy', 1000, 2);
    document.getElementsByClassName("dragger")[0].click();
  }

  componentWillUnmount() {
    // REMOVE DRAGER EVENT HANDLER
    window.onmouseup = null;
    window.onmousedown = null;
    window.onmousemove = null;
    window.onwheel = null;
    window.oncontextmenu = null;
  }

  generateMenu() {
    const menuItems = ['Parkett', 'Treppe', 'Moebel', 'Innenausbau'];
    return menuItems.map(elem => {
      const link = elem.toLowerCase();
      return (
        <li key={elem} onClick={() => this.props.toggleMenu(link)}>
          <a className="topic_link_menu">
            <img src={`static/images/${link}/5${this.props.mime}`} alt={`${link} Bild`} />
            <h1 className="geomanist geomanist_normal">{elem}</h1>
          </a>
        </li>
      );
    });
  }

  render() {
    const Close = this.props.svg;
    return (
      <Fragment>
        <style jsx>{style}</style>
        <nav className="wrapper dragger">
          <ul>
            {this.generateMenu()}
          </ul>
        </nav>
        <div className="bottom_header">
          <div onClick={() => this.props.toggleMenu('button')} className="closemenu">
            <Close />
          </div>
          <TextHover
            onClick={this.props.toggleMenu}
            name="Impressum"
            link="impressum"
            duration={0.5}
            bgColor="#F3F4F7"
            color="#C1C12B"
          />
        </div>
      </Fragment>
    );
  }
}