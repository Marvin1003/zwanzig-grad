import { RouterContext } from "components/Context/Router";

import Head from "components/Head/Head";
import Menu from "components/Menu/Menu";
import Header from "components/Header/Header";
import SecOne from "components/SecOne/SecOne";
import SecNext from "components/SecNext/SecNext";
import mobileHeight from "helper/mobileHeight";

const Topic = props => (
  <div className="parallax">
    <SecOne title={props.title} />
    {props.component}
    <SecNext next={props.next} />
  </div>
);

class App extends React.Component {
  static defaultProps = {
    className: "default"
  };

  componentDidMount() {
    mobileHeight();
    if (!window.APP) {
      window.APP = {
        nextSection: 0,
        prevSection: 0,
        sectionAmount: null,
        autoScrolling: false,
        menu: false,
        updateCurrent: null,
        updateImages: null
      };
    }

    this.props.setMountState(true);

    this.props.title !== "Home" &&
      TweenLite.set(document.body, { clearProps: "transform" });
  }

  render() {
    return (
      <>
        <Header {...this.props} dynamicHeader={this.props.dynamicHeader} />
        <div className={`root ${this.props.className}`}>
          <Head title={this.props.title} />
          {this.props.menu ? <Menu /> : null}
          {this.props.type === "topic" ? (
            <Topic {...this.props} component={this.props.children} />
          ) : (
            this.props.children
          )}
        </div>
      </>
    );
  }
}

export default props => (
  <RouterContext.Consumer>
    {nextRoute => <App {...props} {...nextRoute} />}
  </RouterContext.Consumer>
);
