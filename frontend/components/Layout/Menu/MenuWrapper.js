import { RouterContext } from '../../Context/Router';
import { DeviceContext } from '../../Context/Device';

import dynamic from 'next/dynamic';

const Desktop = dynamic(import('./MenuDesktop'), { loading: () => null });
const Mobile = dynamic(import('./MenuMobile'), { loading: () => null });

class Menu extends React.Component {
  state = {
    reverse: false
  }
  duration = 0.75;
  menuItems = ['Parkett', 'Treppe', 'Möbel', 'Innenausbau'];

  componentDidMount() {
    window.onkeydown = this.onEscape;
    this.menuIcon = document.querySelectorAll('.menuicon')[0];

    this.strokes = this.menuIcon.querySelectorAll('line');
    this.animateMenuIcon('open');
    this.menuIcon.addEventListener("click", this.toggleMenu);
  }

  componentWillUnmount() {
    this.menuIcon.removeEventListener("click", this.toggleMenu);
    window.onkeydown = null;
  }

  toggleMenu = () => {
    if(this.state.reverse)
      this.animateMenuIcon('open');
    if(!this.state.reverse)
      this.animateMenuIcon('close');
      
    this.setState((prevState) => ({ reverse: !prevState.reverse }));
  }

  animateMenuIcon(type) {
    if(type === 'open') {
      var rotation = 45;
      var y = 4.25;
      var color = 'black';
    }
    else {
      var rotation = 0;
      var y = 0;
      if(location.pathname !== '/')
        var color = 'black';
      else 
        var color = 'white';
    }

    TweenLite.to(this.menuIcon, this.duration, { color, ease: Power4.easeOut });
  
    TweenLite.fromTo(this.strokes[0], this.duration, { transformOrigin: '50% 0%'}, { rotation, y, ease: Power4.easeOut });
    TweenLite.fromTo(this.strokes[1], this.duration, { transformOrigin: '50% 0%'}, { rotation: -rotation, y: -y, ease: Power4.easeOut });
  }

  routeHandling = (req) => {
    if(req === location.pathname.slice(1).replace(/oe/, 'ö')) {
      this.setState((prevState) => {
        if(!prevState.reverse) {
          this.animateMenuIcon('close');
          return { reverse: true };
        }
      })
    } else 
      this.props.context.toggleMenu(req);
  }

  // CLOSE MENU ON ESC
  onEscape = (e) => {
   (e.keyCode === 27) && this.toggleMenu();
  }

  renderContent() {
    if(this.props.context.device === 'desktop')
      return <Desktop 
        routeHandling={this.routeHandling} 
        reverse={this.state.reverse} 
        menuItems={this.menuItems}
        {...this.props.context} 
      />;
    else if(this.props.context.device === 'mobile') 
      return <Mobile 
        routeHandling={this.routeHandling} 
        reverse={this.state.reverse} 
        menuItems={this.menuItems}
        {...this.props.context}  
      />;
    return null;
  }

  render() {
    return (
      <div className="menu">
        <div className="background_animation_mobile" />
        <style jsx>{`
          .menu {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            z-index: 100;
          }
        `}</style>
          {this.renderContent()}
      </div>
    );
  }
}

export default (props) => (
  <RouterContext.Consumer>
    {(nextRoute) => (
      <DeviceContext>
        {(target) => <Menu {...props} context={Object.assign({}, nextRoute, target)} /> }
      </DeviceContext>
    )}
  </RouterContext.Consumer>
)