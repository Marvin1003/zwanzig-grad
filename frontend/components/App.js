import { PureComponent, Fragment } from "react";

import Loader from "./Loader/PageLoader";

import dynamic from "next/dynamic";

import "./imports";
import Head from "./Head";

import { Consumer } from './Context';
/* eslint-disable */

const Components = {
  index: dynamic(import("../pages/index"), { loading: () => null }),
  parkett: dynamic(import("../pages/parkett"), { loading: () => null }),
  treppe: dynamic(import("../pages/treppe"), { loading: () => null }),
  moebel: dynamic(import("../pages/moebel"), { loading: () => null }),
  innenausbau: dynamic(import("../pages/innenausbau"), { loading: () => null }),
  kontakt: dynamic(import("../pages/kontakt"), { loading: () => null }),
  impressum: dynamic(import("../pages/impressum"), { loading: () => null })
};

class App extends PureComponent {
  constructor(props) {
    super(props);

    //STATE
    this.state = {
      showLoader: false,
      loadComplete: false
    }
  }

  componentDidMount() {
    if(!window.APP) {
      // this.registerSW();
      window.APP = {
        nextSection: 0,
        prevSection: 0,
        sectionAmount: null,
        autoScrolling: false,
        menu: false,
        updateCurrent: null,
        updateImages: null,
      }

      this.setState({ showLoader: true });
    } else 
      this.loadComponent();
  }

  // registerSW() {
  //   // REGISTER SERVICE - WORKER
  //   if ('serviceWorker' in navigator) {
  //     // Use the window load event to keep the page load performant
  //     window.addEventListener('load', () => {
  //       navigator.serviceWorker.register('/sw.js');
  //     });
  //   }
  // }

  loadComponent = () => {
    // LOAD MAIN PAGE
    this.setState({ loadComponent: true })
  }

  removeLoader = () => {
    // REMOVE LOADER
    document.cookie = "loader=true";
    this.props.context.acceptCookies();
    this.setState({ showLoader: false })
  }

  render() {
    const Page = Components[this.props.component];
    return (
      <Fragment>
        <Head title={this.props.context.title} />
        {this.state.showLoader
          ? <Loader 
              removeMe={this.removeLoader} 
              loadComponent={this.loadComponent} 
              pageMounted={this.props.context.pageMounted} 
            />
          : null
        }
        {this.state.loadComponent
          ? <Page />
          : null
        }
      </Fragment>
    );
  }
}

export default (props) => (
  <Consumer>
    {(context) => <App {...props} context={{...context}} /> }
  </Consumer>
)