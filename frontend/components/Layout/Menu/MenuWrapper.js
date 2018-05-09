import { PureComponent } from 'react';
import { Consumer } from '../../Context';

import Desktop from './MenuDesktop';
import Mobile from './MenuMobile';

import { Close } from '../../../../static/svg/svg';


class Menu extends PureComponent {
  componentDidMount() {
    window.onkeydown = this.onEscape;
  }

  componentWillUnmount() {
    window.onkeydown = null;
  }

  // CLOSE MENU ON ESC
  onEscape = (e) => {
   (e.keyCode === 27) && this.props.context.toggleMenu('button');
  }

  renderContent() {
    if(this.props.context.device === 'desktop')
      return <Desktop svg={Close} {...this.props.context} />;
    else if(this.props.context.device === 'mobile') 
      return <Mobile svg={Close} {...this.props.context} />;
    return null;
  }

  render() {
    return (
      <div className="menu">
        <style jsx>{`
          .menu {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            z-index: 1000;
          }
        `}</style>
          {this.renderContent()}
      </div>
    );
  }
}

export default (props) => (
  <Consumer>
    {(context) => <Menu {...props} context={context} />}
  </Consumer>
)