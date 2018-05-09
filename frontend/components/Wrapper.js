import { PureComponent, Fragment } from 'react';

import Menu from './Layout/Menu/MenuWrapper';
import Header from './Layout/Header/Header';
import SecOne from './Sections/SecOne';
import SecNext from './Sections/SecNext';

import { Consumer } from './Context';

const Topic = (props) => (
  <div className="parallax">
    <SecOne title={props.title} />
    {props.component}
    <SecNext links={props.links} />
  </div>
);

class Main extends PureComponent {
  componentDidMount() {
    this.props.context.setMountState(true);
    this.props.context.updateTitle(this.props.title);

    (this.props.title !== 'Home') && TweenLite.set(document.body, { clearProps: 'transform' });
  }

  render() {
    return (
      <Fragment>
        <Header {...this.props} toggleMenu={this.props.context.toggleMenu} />
        {this.props.context.menu 
          ? <Menu /> 
          : null
        }
        {this.props.type === 'topic' 
          ? <Topic {...this.props} component={this.props.children} />
          : this.props.children
        }
      </Fragment>
    );
  }
}

export default (props) => (
  <Consumer>
    {(context) => <Main {...props} context={context} /> }
  </Consumer>
)