import { Consumer } from '../Context';

const Link = (props) => (
  <a className={props.className} onClick={() => props.nextRoute(props.href)}>{props.children}</a>
);

export default (props) => (
  <Consumer>
    {({nextRoute}) => <Link {...props} nextRoute={nextRoute} />}
  </Consumer>
);