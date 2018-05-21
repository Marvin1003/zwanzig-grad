import { RouterContext } from './Context/Router';

import Head from "./Head";
import Menu from './Layout/Menu/MenuWrapper';
import Header from './Layout/Header/Header';
import SecOne from './Sections/SecOne';
import SecNext from './Sections/SecNext';

import style from '../styles/global/common';

const Topic = (props) => (
  <div className="parallax">
    <SecOne title={props.title} />
    {props.component}
    <SecNext next={props.next} />
  </div>
);

class App extends React.Component {
  static defaultProps = {
    className: 'default'
  }
  
  componentDidMount() {
    if(!window.APP) {
      window.APP = {
        nextSection: 0,
        prevSection: 0,
        sectionAmount: null,
        autoScrolling: false,
        menu: false,
        updateCurrent: null,
        updateImages: null,
      }
    }

    this.props.setMountState(true);

    (this.props.title !== 'Home') && TweenLite.set(document.body, { clearProps: 'transform' });
  }

  render() {
    return (
      <div className={this.props.className}>
        <Head title={this.props.title} /> 
        <Header {...this.props} dynamicHeader={this.props.dynamicHeader} />
        {this.props.menu
          ? <Menu /> 
          : null
        }
        {this.props.type === 'topic' 
        ? <Topic {...this.props} component={this.props.children} />
        : this.props.children
        }
      </div>
    );
  }
}

export default (props) => (
  <RouterContext.Consumer>
    {(nextRoute) => <App {...props} {...nextRoute} /> }
  </RouterContext.Consumer>
);